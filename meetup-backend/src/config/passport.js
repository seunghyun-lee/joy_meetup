const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JWTStrategy = passportJWT.Strategy;
const User = require('../modules/users/model');

module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({'local.username':email}, function(err, user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, false, req.flash('signupMessage', 'That email already taken'));
                }else{
                    var newUser = new User();
                    newUser.local.username = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                }
            })
        })
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({ 'local.username': email }, function(err, user){
                if(err){
                    return done(err);
                }
                if(!user) {
                    return done(null, false, req.flash('loginMessage', 'No User Found'));
                }
                if(!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'invalid password'));
                }
                return done(null, user);
            });
        });
    }));
    
    passport.use(new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeader('Authorization'),
            secretOrKey: process.env.JWT_TOKEN
        },
        function(jwtPayload, done) {
            // find the user in db if needed
            try {
                const user = await User.findById(jwtPayload.id);
                if(user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch(err) {
                return done(err);
            }
        }
    ));

    passport.use(new FacebookStrategy({
        clientID: process.env.FB_clientID,
        clientSecret: process.env.FB_clientSecret,
        callbackURL: process.env.FB_callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            User.findOne({'facebook.id': profile.id}, function(err, user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.save(function(err){
                        if(err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                    console.log(profile);
                }
            });
        });
    })); 
};
