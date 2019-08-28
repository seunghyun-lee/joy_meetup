// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

/*
    POST /api/auth/register
    {
        username,
        email,
        password
    }
*/

// exports.localRegister = (req, res, done) => {
 
//     var { username, email, password } = req.body;
//     console.log(username);
//     process.nextTick(function(){
//         User.findOne({'local.username':username}, function(err, user) {
//             if(err) {
//                 return done(err);
//             }
//             if(user){                
//                 return done(null,false,req.flash('signupMessage','that email already taken'));
//             } else {
//                 var newUser = new User();
//                 newUser.local.username = username;
//                 newUser.local.email = email;
//                 newUser.local.password = newUser.generateHash(password);
//                 console.log(newUser);
//                 newUser.save(function(err){
//                     if(err)
//                         throw err;
//                     return done(null, newUser);
//                 })
//             }
//         })
//     })
// };

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