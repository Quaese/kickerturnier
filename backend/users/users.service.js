const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // see: https://www.npmjs.com/package/bcrypt

const tools = require('../_tools/tools');
const db = require('../_tools/db');
const User = db.User;
const Role = require('./users.roles');

// export on top (better to read)
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
}


// asynchronous function to authenticate a user
// @params: username, passwort from req.body object
async function authenticate({username, password}) {
    const user = await User.findOne({username});

    // if an user exists and the password hash is correct
    if (user && bcrypt.compareSync(password, user.hash)) {
        // user.toObject() returns a object representing the user: {_id, username, hash, firstName, lastName, createdDate}
        // after destructering hash contains the user.hash value
        // and userWithoutHash the remaining properties {_id, username, firstName, lastName, createdDate}
        const { hash, ...userWithoutHash } = user.toObject();

        // JWT token structure:
        // header.payload.signature
        // e.g. eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJ2YWwiLCJpYXQiOjE0MjI2MDU0NDV9.eUiabuiKv-8PYk2AkGY4Fb5KMZeorYBLw261JPQD5lM
        //
        // {sub: user.id, role: user.role} is written to payload when .sign is executed
        const token = jwt.sign({sub: user.id, role: user.role}, config.secret);

        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    // return all users without ('-hash') hash value
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({username: userParam.username})) {
        throw 'Username "' + userParam.username + '" is already taken.';
    }

    // create new user using the mongoose User model from user.model.js
    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam, userSign) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found.';

    // if user has no Admin role and want to update another user
    if (user.id !== userSign.sub && userSign.role !== Role.Admin) throw 'Unauthorized';

    if (user.username !== userParam.username && User.findOne({username: userParam.username})) {
        throw 'Username "' + userParam.username + '" is already taken.';
    }

    // hash password if entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id, userParam, userSign) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found.';

    // if user has no Admin role and want to update another user
    if (user.id !== userSign.sub && userSign.role !== Role.Admin) throw 'Unauthorized';

    await User.findByIdAndDelete(id);
}
