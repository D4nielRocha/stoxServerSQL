const validator = require('validator');
const Stox = require('../models/stox');




let stoxValidation = (stox) => {

let validatedStox;
let stoxId = 0;
// console.log('this is the stox at the validator', stox);


if(stox.hasOwnProperty('_id')){
    stoxId = stox._id;
}

if(stox === null){
    console.log("The parameter is null === stoxValidation");
}

if( validator.isNumeric(stoxId + '', {no_symbols: true, allow_negative: false}) &&
    validator.isDecimal(stox.asset1_closing + '', {no_symbols: true, allow_negation: false}) && 
    validator.isDecimal(stox.asset2_closing + '', {no_symbols: true, allow_negation: false}) &&
    validator.isDate(stox._date) && 
    stox.author != null) {
        validatedStox =  new Stox(
            stoxId,
            stox.asset1_name,
            stox.asset1_invested,
            stox.asset1_amount,
            stox.asset1_price,
            stox.asset1_shares,
            stox.asset1_closing,
            stox.asset2_name,
            stox.asset2_invested,
            stox.asset2_amount,
            stox.asset2_price,
            stox.asset2_shares,
            stox.asset2_closing,
            stox.comment,
            stox._date,
            stox.author);
   } else {
       console.log("Error validating new stox")
   }
//    console.log(validatedStox);
   return validatedStox;
}




let updateValidation = (stox) => {

    let validatedStox;

    if(stox === null){
        console.log("The parameter is null === stoxValidation");
    }

    if( validator.isNumeric(stox._id + '', {no_symbols: true, allow_negative: false}) &&
    validator.isDecimal(stox.asset1_closing + '', {no_symbols: true, allow_negation: false}) && 
    validator.isDecimal(stox.asset2_closing + '', {no_symbols: true, allow_negation: false}) &&
    validator.isDate(stox._date) && 
    stox.author != null) {
        validatedStox =  new Stox(
            stox._id,
            stox.asset1_amount,
            stox.asset1_price,
            stox.asset1_shares,
            stox.asset1_closing,
            stox.asset2_amount,
            stox.asset2_price,
            stox.asset2_shares,
            stox.asset2_closing,
            stox.comment,
            stox._date,
            stox.author);
   } else {
       console.log("Error validating new stox")
   }
//    console.log(validatedStox);
   return validatedStox;
}



module.exports = {
    stoxValidation, updateValidation
}