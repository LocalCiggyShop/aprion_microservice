import jwt from 'jsonwebtoken';
import crypto, { scryptSync, createDecipheriv, sign, } from 'node:crypto';
import userService from '../services/userService.js';

const login_handler = async (name, password) => {
    if(!name || !password) return false;

    try {
        userService.getUserByPassword(name, password)
        .then(async data => {
            if(data) {
                // Success
                return true;
            } else {
                // Failure
                throw new Error("User does not exist")
            }
        }).catch((err) => {
            console.log(err);
            throw new Error("Something went wrong :/")
        })
    } catch(err) {
        console.log(err);
        return false;
    }
}

const register_handler = async (name, password) => {
    if(!name || !password) return false;

    try {
        userService.getUserByPassword(name, password)
        .then(async data => {
            if(data) {
                // Success
                return true;
            } else {
                // Failure
                throw new Error("User does not exist")
            }
        }).catch((err) => {
            console.log(err);
            throw new Error("Something went wrong :/")
        })
    } catch(err) {
        console.log(err);
        return false;
    }
}

const create_token = async (user) => {
    // const algorithm = 'aes-192-cbc';
    return new Promise((resolve, reject) => {
        if(!user) return reject("There is no user found, using create_token.")
        const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
            namedCurve: 'sect239k1'
        });
        // generate a signature of the payload
        const sign = crypto.createSign('SHA256');
        sign.write(`${user}`);
        sign.end();
        var signature = sign.sign(privateKey, 'hex');
        
        var token = jwt.sign(user, signature, {
            expiresIn: "15m"
            // expiresIn: 86400 // 24 hours
        });
        // console.log(token)
        // console.log("token: ", token, "\n\nsignature: ",signature)

        // resolve({token, signature})
        resolve({token, signature})
    })
}

const verify_token = async (token, secret) => {
    return new Promise((resolve, reject) => {
        if (!token && !secret) {
            reject(false)
        }
        else {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(err)
                }
    
                // req.userId = decoded.id;
                // return decoded.id
                resolve(decoded)
            });
        }
    })
}

export default {
    create_token,
    verify_token
};