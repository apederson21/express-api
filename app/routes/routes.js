'use strict';

const   fs = require('fs'),
        routePaths = ['get', 'post'];

module.exports = {
    loadRoutes: loadRoutes
}

/**
 * Dynamically load all the routes based on included directories
 * 
 * @param {express} app
 */
function loadRoutes(app) {
    routePaths.forEach((path) => {
        let files = fs.readdirSync(`${__dirname}/${path}`) || [];
        files.forEach((file) => {
            let route = require(`./${path}/${file}`);
            console.log(`setting up ${path}/${file}...`);
            route(app);
        });
    });
}
