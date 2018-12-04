import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
        id: {
            type: Number
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        password: {
            type: String
        },
        username: {
            type: String
        },
        token: {
            type: String
        }
    });

export default mongoose.model('User', User);
