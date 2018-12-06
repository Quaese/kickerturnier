const config = require('../config/config.json');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/${config.mongodb.db}`, { useNewUrlParser: true });
// mongoose.connect(`mongodb://${config.mongodb.user}:${config.mongodb.pw}@localhost:30759/${config.mongodb.db}?authSource=admin`, { useNewUrlParser: true });

// establish database connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection estabilshed successfully');
});

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/users.model')
};
