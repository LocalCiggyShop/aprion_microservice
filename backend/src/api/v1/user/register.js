
/**
 * 
 * /routers/api/user/register.js
 * 
 * @description:: File used for registering the end user.
 * 
 */
import express from 'express';
const MainRegister = express.Router();
import argon2 from "argon2";
import functions from "../utils/functions.js";
import userService from '../services/userService.js';
//import os from "os";
//const cluster = require("cluster");

MainRegister.post("/", async(req, res) => {
    // if(!functions.checkInvalid(req, res)) return false;
    //const cpus = os.cpus;
    //const numCPUS = cpus().length;
    
    //console.log(numCPUS)

    try {
        console.time("Pinged");
        const params = req.body || req.params;
        const Username = params.username
        if(!Username) return res.status(201).send({ msg: 'Please enter an username.'});

        const Password = params.password
        if(!Password) return res.status(201).send({ msg: 'Please enter an password.'})

        const Email = params.email
        if(!Email) return res.status(201).send({ msg: 'Please enter an email.'});

        if(Username && Password && Email) {
            if(Username.length > 50 || Password.length > 120 || Email.length > 80) return res.status(201).send({ msg: 'Username, password or email has exceeded the limit.'})
            //if(Username.length <= 3 || Password.length <= 10) return res.status(201).send({ msg: 'Username or password is under the limit.'})

            if(!functions.escapeHtml(Username) || !functions.escapeHtml(Password) || !functions.escapeHtml(Email))
                return res.status(201).send({ msg: "Only Alphanumeric letters are allowed."});

            if(!functions.checkIfValidEmail(Email))
                return res.status(201).send({ msg: "Entered email is invalid, include any provider like 'gmail' with '.com' at the end."});

            if(!functions.checkIfAlphanumericString(Username) || !functions.checkIfAlphanumericString(Password))
                return res.status(201).send({ msg: "Only Alphanumeric letters are allowed."});

            if(functions.hasWhiteSpace(Username) || functions.hasWhiteSpace(Password) || functions.hasWhiteSpace(Email))
                return res.status(201).send({ msg: "Dont have white spaces."});

            await userService.getByEmail(Username, Email)
            .then(async data => {
                // Success
                if(data) {
                    if(data.name === Username)
                    {
                        console.timeEnd("Pinged");
                        return res.status(201).send({ msg: "Username already exists." })
                    } 
                    if(data.email === Email) {
                        console.timeEnd("Pinged");
                        return res.status(201).send({ msg: "Email already exists." })
                    }
                }
                else {
                    const hashedPassword = await argon2.hash(Password, 
                        {type: argon2.argon2id}
                    );
                    
                    await userService.createUser(Username, Email, hashedPassword)
                    .then(_ => {
                        console.timeEnd("Pinged");

                        // Success
                        return res.status(201).send({ msg: 'Successfully registered!'})
                    })
                    .catch((e) => {
                        console.log(e)
                        return res.status(201).send({ msg: 'Something went wrong :/'})
                        // try {
                        //     if(e instanceof Prisma.PrismaClientKnownRequestError) {
                        //     if (e.code === 'P2002') {
                        //             console.log(e)
                        //         return res.status(201).send({ msg: "Email already exists." })
                        //         }
                        //     }
                        // } catch(err) {
                        //     return console.log(err)
                        // }
                    })
                    // .Catch is handled.
                }
            })
            .catch(e => {
                // Error
                console.log(e)
                return res.status(201).send({ msg: 'Something went wrong :/'})
                //throw new Error(err);
            });
        } else return res.status(201).send({ msg: 'Only username, password and email is allowed.'})
    } catch(_) {
        return false
    }
});

export default MainRegister;