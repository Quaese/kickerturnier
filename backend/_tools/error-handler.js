module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof err === 'string') {
        // custom application error
        return res.status(400).json({message: err});
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({message: err.message});
    }

    if (err.name === 'UnauthorizedError') {
        // mongoose validation error
        return res.status(401).json({message: 'Invalid Token'});
    }

    return res.status(500).json({message: err.message});
}
