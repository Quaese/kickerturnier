const expressJwt = require('express-jwt');
const { secret } = require('../config/config');

// const tools = require('../_tools/tools');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'Admin')
    // or an array of roles (e.g. [Role.User, Role.Admin] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({secret}),

        // authorize based on user role
        (req, res, next) => {
            // const token = req.headers.authorization.replace(/^Bearer /, "");
            // const payload = tools.parseJwt(token);
            // if (token && roles.length && !roles.includes(payload.role)) {

            // if role exists and is included in the role array
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({message: 'Unauthorized'});
            }

            // authentication and authorization successful
            next();
        }
    ];
}
