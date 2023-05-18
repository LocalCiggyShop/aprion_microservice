import userService from '../services/userService.js';

export const login_handler = async (name, password) => {
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

export const create_token = async (userID) => {
    
}