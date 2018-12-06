const expressJwt = require('express-jwt');                  // see: https://www.npmjs.com/package/express-jwt
const config = require('../config/config.json');
const userService = require('../users/users.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;

    // configure express-jwt module
    // more see: https://www.npmjs.com/package/express-jwt
    return expressJwt({secret, isRevoked}).unless({
        path: [
            // public routes don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

// Function decides if token cannot be used any longer
async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}
