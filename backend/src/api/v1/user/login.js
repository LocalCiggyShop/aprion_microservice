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

        if(Username.length > 50 || Password.length > 120) return res.status(401).send({ msg: 'Username or password has exceeded the limit.'})
        //if(Username.length <= 3 || Password.length <= 10) return res.status(401).send({ msg: 'Username or password is under the limit.'})
        if(Username && Password) {
            userService.getByUser(Username)
            .then(async data => {
                // Success
                if(data) {
                    if(data.name === Username) {
                        hashedPassword = await argon2.hash(Password, {type: argon2.argon2id});

                        argon2
                        .verify(Username, Password)
                        .then(argon2 => {
                            if(argon2) {
                                return res.status(201).send({ msg: 'You have logged in.'})
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            return false;
                        })
                    }
                }
                else {
                    return res.status(201).send({ msg: 'Email or password is incorrect.'})
                }
            })
            .catch(err => {
                // Error
                return console.log(err)
                //throw new Error(err);
            });
        }
    } catch(_) {
        console.log(_)
        return false
    }
});

export default MainRegister;