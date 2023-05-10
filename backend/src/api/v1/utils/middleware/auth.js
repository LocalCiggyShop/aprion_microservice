// const { ValidateSignature } = require('../../utils');

function isAuthorised(req,res,next) {
    // const isAuthorized = await ValidateSignature(req);
    const isAuthorized = true; 
    if(isAuthorized) {
        return next();
    }
    return res.status(403).json({message: 'Not Authorized'});
}

export default {
    isAuthorised
}