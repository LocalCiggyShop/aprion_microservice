// import JwtService from "../../services/jwtService.js";
import jwt from 'jsonwebtoken';

function isAuthorised(req,res,next) {
    try {
        const authHeader = req?.headers?.['authorization'] ?
        (req?.headers?.authorization).split("Bearer ")[1]
        : "";

        if(!authHeader) return next(res.status(401).send('Unauthorized'))

        jwt.verify(authHeader, 'secret');

        // JwtService.generate("")
        if(authHeader) {
            return next();
        }
        return res.status(401).send('Not Authorized');
    } catch(err) {
        console.log(err)
        return res.status(401).send("An Error occured.");
    }
}

export default {
    isAuthorised
}