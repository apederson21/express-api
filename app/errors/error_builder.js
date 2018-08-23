'use strict';

/**
 * Build a user-friendly error object
 * @param {number} code 
 * @param {array} errors
 * @returns {object}
 */
const buildErrorObject = ((code, errors) => {
    let returnObj = {
        error: {
            code: code || 500,
            errors: [],
            message: ''
        }
    }
    
    // return service error if no errors array
    if (!errors.length) {
        returnObj.message = 'Service Error'
        return returnObj;
    }

    // add unique error codes and build message output
    let message = '',
        uniqueCodes = [];

    errors.forEach((err) => {
        let needSpace = message.length ? ' ' : ''
        message = `${message}${needSpace}${err.message}`;

        if (uniqueCodes.indexOf(err.code) === -1) uniqueCodes.push(err.code);
    });
    
    returnObj.error.message = message;
    returnObj.error.errors = uniqueCodes;

    return returnObj;
});

module.exports = {
    buildErrorObject: buildErrorObject
}
