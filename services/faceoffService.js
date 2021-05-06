const validator = require('validator');
const repository = require('../repositories/faceoffRepository');
const stoxValidator = require('../validator/stoxValidator');

let displayFaceoff = async () => {

    let result = await repository.getAllStox();
    
    return result;

}


let showComparison = async (authorId) => {

    if(!validator.isAscii(authorId)){
        console.log('Invalid Parameter');
        return `Invalid Parameter`;
    }

    let result = await repository.getStox(authorId);

    return result;

}


let showComparisonByDate = async (authorId, date) => {

    if(!validator.isAlpha(authorId)){
        console.log('Invalid Parameter');
        return `Invalid Parameter`;
    }

    if(!validator.isDate(date)){
        console.log('Invalid Parameter');
        return `Invalid Parameter`;
    }

    let result = await repository.getStoxByDate(authorId, date);

    return result;

}

let createStox = async (stox) => {

    let newStox;

    let validatedStox = stoxValidator.stoxValidation(stox);
    // console.log("this is the validated stox");
//     console.log(validatedStox);
    if(validatedStox != null){
        newStox = await repository.createNewFaceoff(validatedStox);
    }else {
        console.log("Error at createStox Services Layer");
    }

    return newStox;

}

module.exports = {

    displayFaceoff, showComparison, showComparisonByDate, createStox
}