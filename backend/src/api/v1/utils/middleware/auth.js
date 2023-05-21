// import JwtService from "../../services/jwtService.js";
// import jwt from 'jsonwebtoken';
import auth_handlers from '../../handlers/auth_handlers.js';

async function isAuthorised(req,res,next) {
    try {
        const authHeader = req?.headers?.['authorization'] ?
        (req?.headers?.authorization).split("Bearer ")[1]
        : "";
        
        const authSignature = req?.headers?.["x-access-signature"]
        // console.log("authHeader: ",JSON.stringify(authHeader))
        
        if(!authHeader || !authSignature) return next(res.status(401).send('Unauthorized'))
        
        // console.log("authHeader: ", authHeader, " typeof: ", typeof(authHeader))
        // let auth = await auth_handlers.verify_token(authHeader, authSignature);
        auth_handlers.verify_token(authHeader, authSignature)
        .then((data) => {
            // Here is returning undefiend if the user is sigend in
            if(data)
                return next();
            else {
                return res.status(401).send('Not Authorized');
            }
            
        })
        .catch((err) => {
            if(err.expiredAt < new Date())
                return res.status(402).send('Not Authorized'); // Status code 402 tells the client to logout.
            else
                return res.status(401).send('Not Authorized');
        })
        // if(auth) {
        //     return next();
        // }
        // jwt.verify(authHeader, 'secret');

        // JwtService.generate("")
        // return res.status(401).send('Not Authorized');
    } catch(err) {
        console.log(err)
        return res.status(501).send("An Error occured.");
    }
}

function isAdministrator(req,res,next) {
    try {
        return next(res.status(401).send('Unauthorized'))
    } catch(err) {
        console.log(err)
        return res.status(501).send("An Error has occured.");
    }
}

export default {
    isAuthorised,
    isAdministrator
}