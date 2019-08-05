const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // simply, check if the email is exist or not
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    // array of users IDs
    followers: [],
    following: []
});

module.exports = mongoose.model('User', userSchema);