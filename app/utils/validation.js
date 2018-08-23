'use strict';

const   errorCodes = require('../errors/error_codes.json'),
        errorBuilder = require('../errors/error_builder');

/**
 * Validate data input
 * @param   {array} inputs
 * @param   {object} dataToValidate
 * @returns {array} statusCode,errorObject
 */
const areInputsValid = ((inputs, data) => {
    let errorsMissing = [],
        errorsInvalid = [];

    inputs.forEach((input) => {
        // check for required and missing
        if (input.required && !data[input.key]) {
            errorsMissing.push(errorCodes.MISSING[input.key.toUpperCase()]);
        }

        // check for invalid
        if (input.key === 'email' && data.email) {
            if (!isValidEmail(data.email)) errorsInvalid.push(errorCodes.INVALID.EMAIL);
        }
        if (input.key === 'password' && data.password) {
            if (!isValidPassword(data.password)) errorsInvalid.push(errorCodes.INVALID.PASSWORD);
        }
    });
    
    // return appropriate error obect
    if (errorsMissing.length) return errorBuilder.buildErrorObject(400, errorsMissing);
    if (errorsInvalid.length) return errorBuilder.buildErrorObject(400, errorsInvalid);
    return new Object;
});

const isValidEmail = ((email = '') => {    
    // W3C recommended regex
    let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(regex);
});

/**
 * Determine if password is valid
 * @param {string} pass 
 */
const isValidPassword = ((pass = '') => {
    return (
        (pass.length >= 6) &&
        (pass.match(/[0-9]/g))
    );
});

module.exports = {
    areInputsValid: areInputsValid,
    isValidEmail: isValidEmail,
    isValidPassword: isValidPassword
}
