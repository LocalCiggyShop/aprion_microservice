import express from 'express';
const MainRegister = express.Router();
import argon2 from "argon2";
import functions from "../utils/functions.js";
import userService from '../services/userService.js';
//import os from "os";
//const cluster = require("cluster");

MainRegister.post("/", async(req, res) => {
    if(!functions.checkInvalid(req, res)) return false;
    
    //const cpus = os.cpus;
    //const numCPUS = cpus().length;
    
    //console.log(numCPUS)

    try {
        console.time("Pinged: ");
        const params = req.body || req.params;
        const Username = params.username;
        if(!Username) return res.status(201).send({ msg: 'Please enter a username'});

        const Password = params.password
        if(!Password) return res.status(201).send({ msg: 'Please enter a password'})

        if(Username.length > 50
            || Username.length <= 0
            || Password.length <= 0
            || Password.length > 120) return res.status(201).send({ msg: 'Username or password has exceeded the limit.'})
        if(Username && Password) {
            try {
                const dataRetrieved = await userService.getByName(Username)

                if(dataRetrieved) {
                    if(dataRetrieved.name === Username) {
                        try {
                            const argonHashSuccess = await argon2.verify(dataRetrieved.password, Password)
                            if(argonHashSuccess) 
                                return res.status(201).send({ msg: 'You have logged in.'})
                            
                            return res.status(201).send({ msg: 'Email or password is incorrect.'})
                        } catch (err) {
                            console.log(err);
                            return res.status(201).send({ msg: 'An Error has occured.'})
                        }
                        // .then(argonHashSuccess => {
                        //     if(argonHashSuccess) {
                        //         return res.status(201).send({ msg: 'You have logged in.'})
                        //     } else {
                        //         return res.status(201).send({ msg: 'Email or password is incorrect.'})
                        //     }
                        // })
                        // .catch(err => {
                            // console.log(err);
                            // return res.status(201).send({ msg: 'An Error Occured.'})
                        // })
                    }
                }

                return res.status(201).send({ msg: 'Email or password is incorrect.'})
            } catch (error) {
                console.log(error)
                return res.status(201).send({ msg: 'Email or password is incorrect.'})
            }

            // .then(async data => {
            //     // Success
            //     if(data) {
            //         if(data.name === Username) {
            //             await argon2
            //             .verify(data.password, Password)
            //             .then(argonHashSuccess => {
            //                 if(argonHashSuccess) {
            //                     return res.status(201).send({ msg: 'You have logged in.'})
            //                 } else {
            //                     return res.status(201).send({ msg: 'Email or password is incorrect.'})
            //                 }
            //             })
            //             .catch(err => {
            //                 console.log(err);
            //                 return res.status(201).send({ msg: 'An Error Occured.'})
            //             })
            //         }
            //     } else {
            //         return res.status(201).send({ msg: 'Email or password is incorrect.'})
            //     }
            // })
            // .catch(err => {
            //     // Error
            //     console.log(err)
            //     return res.status(201).send({ msg: 'An Error Occured.'})
            //     //throw new Error(err);
            // });
        }
    } catch(err) {
        console.log(err)
        return res.status(201).send({ msg: 'An Error Occured.'})
    }
});

export default MainRegister;