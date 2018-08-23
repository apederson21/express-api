'use strict';

/**
 * Safely return a value from object prop if exists
 * @param {object} obj 
 * @param {array} path
 * @returns {any}
 */
const get = ((obj = {}, path) => {
    return path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : undefined, obj);
});

module.exports = {
    get: get
}