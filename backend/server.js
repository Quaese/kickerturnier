require('rootpath');

// npm modules
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// own modules
const errorHandler = require('./_tools/error-handler');

console.clear();

/* START: Middleware */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// api routes
// requires: user.service and db (mongoose.connection)
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);
/* END: Middleware */


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 64719;
const server = app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
