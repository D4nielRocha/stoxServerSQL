const validator = require('validator');
// const repository = require('../repositories');
const stoxValidator = require('../validator/stoxValidator');
const userRepository = require('../repositories/userRepository');
const User = require('../models/user');


let createNewUser = async (user) => {

    let newUser = new User(
            user.nickname,
            user.email
        )
    
    let result = await userRepository.saveNewUser(newUser);
    return result;
}

let updateUser = async (user) => {

    let updatedUser = new User(
            user.username,
            user.email,
            user.firstName,
            user.lastName,
            user.phone
        )
    
    let result = await userRepository.updateUser(updatedUser);
    return result;
}


let getSingleUser = async (username) => {

    let result = await userRepository.getSingleUser(username);

    return result;

};


let getUsers = async () => {

    let result = await userRepository.getUsers();

    return result;

};



module.exports = {
    createNewUser, getUsers, getSingleUser, updateUser
}