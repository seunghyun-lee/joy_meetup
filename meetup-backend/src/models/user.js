const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const config = require('../config/config');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const userSchema = mongoose.Schema({
    local: {
        username: String,
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        username: String
    },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword =function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

// from this move to another file.

userSchema.statics.findByUsername = function(username) {
    return this.findOne({username}).exec();
};

userSchema.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

userSchema.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        $or: [
            { username },
            { email }
        ]
    }).exec();
};

userSchema.statics.localRegister = function({ username, email, password }) {
    // when you're creating new account, heve to use 'new this'
    const account = new this({
        username,
        email,
        password
    });

    return account.save();
};

userSchema.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.password === hashed;
};

module.exports = mongoose.model('User', userSchema);