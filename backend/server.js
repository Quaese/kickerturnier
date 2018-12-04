import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import User from './models/User';


const app = express();
const router = express.Router();


/* ** Middleware ** */
// allow cors (Cross Origin Resource Sharing)
app.use(cors());
app.use(bodyParser.json());


/* ** MongoDB ** */
// mongodb wrapper
mongoose.connect('mongodb://localhost:27017/Kickertournament');                                                        // localhost
// mongoose.connect(`mongodb://${config.mongodb.user}:${config.mongodb.pw}@localhost:30759/Issues?authSource=admin`);  // uberspace

// connection handle
const connection = mongoose.connection;

// establish connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});


// START: Routes
router.route('/users').get((req, res) => {
    User.find((err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
});
// END:   Routes


app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));
