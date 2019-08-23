const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config/config');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const userSchema = mongoose.Schema({
    profile: {
        username: String,
        thumbnail: { type: String, default: '' }
    },
    email: { type: String },
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        },
    },
    password: String,
    thoughtCount: { type: Number, default: 0 },
    createAt: { type: Date, default: Date.now }
});

userSchema.statics.findByUsername = function(username) {
    return this.findOne({'profile.username': username}).exec();
};

userSchema.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

userSchema.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        $or: [
            { 'profile.username': username },
            { email }
        ]
    }).exec();
};

userSchema.statics.localRegister = function({ username, email, password }) {
    // when you're creating new account, heve to use 'new this'
    const account = new this({
        profile: {
            username
            // thumbnail is default
        },
        email,
        password: hash(password)
    });
    return account.save();
};

userSchema.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.password === hashed;
};

//  create new user document
userSchema.statics.create = function(username, password) {
    const encrypted = bcrypt.hashSync(password, bcrypt.genSaltSync(9));

    const user = new this({
        username,
        password: encrypted
    });
    // return the Promise
    return user.save();
}

//  find one user by using username
userSchema.statics.findOneByUsername = function(username) {
    return this.local.findone({
        username
    });    
}

// 

module.exports = mongoose.model('User', userSchema);