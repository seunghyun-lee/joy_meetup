const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    facebooktoken: String,
    jsonWebToken: String
});

module.exports = mongoose.model('User', userSchema);