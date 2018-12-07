const express = require('express');
const router = express.Router();

const userService = require('./users.service');
const authorize = require('../_tools/authorize');
const Role = require('./users.roles');

// START: routes
// public routes (without authentication)
router.post('/authenticate', authenticate);
router.post('/register', register);

// secure routes (with authentication)
router.get('/', authorize(Role.Admin), getAll);             // only Role.Admin can access
router.get('/current', authorize(), getCurrent);            // all authenticated user can access
router.get('/:id', authorize(Role.Admin), getById);         // only Role.Admin can access
router.put('/:id', authorize(), update);                    // all authenticated user can access
router.delete('/:id', authorize(Role.Admin), _delete);      // only Role.Admin can access

module.exports = router;


// START: router middleware
function authenticate(req, res, next) {
    // req.body is an object containing username and password and other properties
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({message: 'Unauthorized (by id)'});
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body, req.user)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id, req.body, req.user)
        .then(() => res.json({}))
        .catch(err => next(err));
}
