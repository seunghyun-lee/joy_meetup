// const router = require('express').Router();
// const authCtrl = require('./auth.controller');

// router.post('/register/local', authCtrl.localRegister);
// router.post('/login/local', authCtrl.localLogin);
// router.get('/exists/:key(email|username)/:value', authCtrl.exists);
// router.post('/logout', authCtrl.logout);

// module.exports = router;

var router = require('express').Router();
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var Config = require('../../config/config');
var jwtSecret = Config.secret;

router.get('/', function(req,res,next){
    res.send('test test');
});

// Local login
router.post('/login/local', function(req,res,next){
    var localEmail = req.body.email;
    var localPassword = req.body.password;

    var findConditionLocalUser = {
        email: localEmail,
        Password: localPassword
    };
    User.findOne(findConditionLocalUser)
        .exec(function(err,user){
            if(err) {
                res.json({
                    type: false,
                    data: "Error: " + err
                });
            } else if(!user) {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            } else if(user) {
                res.json({
                    type: true,
                    data: user,
                    token: user.jsonWebToken
                });
            }
        });
});

// Local signup
router.post('/signup/local', function(req,res) {
    var localEmail = req.body.email;
    var localPassword = req.body.password;
    console.log(localEmail);
    console.log(localPassword);

    var findConditionLocalUser = {
        email: localEmail,
        Password: localPassword
    };
    User.findOne({email: req.body.email, password: req.body.password}, function(err,user) {
        if(err) {
            res.json({
                type: false,
                data: "Error: " + err
            });
        } else {
            if(user) {
                res.json({
                    type: false,
                    data: "Email already exists"
                });
            } else {
                var user = new User();
                user.email = req.body.email;
                user.password = req.body.password;
                console.log(user);
                user.save(function(err, user){
                    user.jsonWebToken = jwt.sign(user, jwtSecret);
                    user.save(function(err, saveUser) {
                        res.json({
                            type: true,
                            data: saveUser,
                            token: saveUser.jsonWebToken
                        });
                    });
                });                
            }
        }
    });
});

router.get('myinfo', ensureAuthorized, function(req,res,next){
    var findConditionToken = {
        jsonWebToken: req.token
    };
    console.log(req.token);
    User.findOne(findConditionToken, function(err,user){
        if(err) {
            res.json({
                type: false,
                data: "Error: " + err
            });
        } else {
            console.log("me: " + user);
            res.json({
                type: true,
                data: user
            });
        }
    })
});

function ensureAuthorized(req,res,next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    console.log(bearerHeader);
    if(typeof bearerHeader !== "undefined") {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

module.exports = router;