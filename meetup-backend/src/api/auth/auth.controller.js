const Joi = require('joi');
const User = require('../../models/user');

// register user
exports.localRegister = async(ctx) => {
    ctx.body = 'register';
};

// local login
exports.localLogin = async(ctx) => {
    ctx.body = 'login';
};

// check exist email or id
exports.exists = async(ctx) => {
    ctx.body = 'exists';
};

// logout
exports.logout = async(ctx) => {
    ctx.body = 'logout';
};