'use strict';

const   bodyParser = require('body-parser'),
        helmet = require('helmet');

module.exports = {
    setupMiddleware: setupMiddleware
}

/**
 * Configure middleware options
 * @param {express} app 
 */
function setupMiddleware(app) {
    app.use(helmet());
    
    // json encode post bodies
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}
