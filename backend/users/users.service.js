const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // see: https://www.npmjs.com/package/bcrypt
const db = require('../_tools/db');
const User = db.User;

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
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({sub: user.id}, config.secret);

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

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found.';

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

async function _delete(id) {
    await User.findByIdAndDelete(id);
}
