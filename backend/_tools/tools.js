const atob = require('atob');

module.exports = {
    parseJwt
}

/*
 * Parses the payload section of a JWT and return the values as JSON object
 */
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(atob(base64));
}
