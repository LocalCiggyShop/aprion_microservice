import express from 'express';
import userService from '../services/userService.js';
import functions from '../utils/functions.js';
import isAuthorised from '../utils/middleware/auth.js';
const MainAll = express.Router();

MainAll.get("/:name/:method?", isAuthorised.isAuthorised, (req, res) => {
    try {       
        const params = req.params;
        //const allParams = params.name || params.method
        if(!functions.checkInvalid(req, res/*, ["_", "("]*/)) return false;

        switch (params.method) {
            case "all":
                userService.getAll()
                .then(data => {
                    // Success
                    return res.status(201).send(data)
                })
                .catch(_ => {
                    // Error
                    console.log(_)
                    return res.status(201).send("An Error occured.");
                    //return false;
                    //throw new Error(err);
                });
            break;
            
            case "specific":
                userService.getByUser(params.name)
                .then(data => {
                    // Success
                    return res.status(201).send(data)
                })
                .catch(_ => {
                    // Error
                    console.log(_)
                    return res.status(201).send("An Error occured.");
                    //return false;
                    //throw new Error(err);
                });
                break;
                
                default:
                    userService.getByUser(params.name)
                    .then(data => {
                        // Success
                        return res.status(201).send(data)
                    })
                    .catch(_ => {
                        // Error

                        console.log(_)
                        return res.status(201).send("An Error occured.");
                        //return false;
                    });
        }
    } catch(_) {
        console.log(_)
        return res.status(201).send("An Error occured.");
    }
});

export default MainAll;

// case isNaN(1):
//     console.log(allParams)
//     userService.getById(allParams)
//     .then(data => {
//         // Success
//         return res.status(201).send(data)
//     })
//     .catch(_ => {
//         // Error
//         return console.log(_)
//         //return false;
//         //throw new Error(err);
//     });
// break;
//throw new Error(err);