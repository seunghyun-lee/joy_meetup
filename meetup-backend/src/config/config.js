module.exports = {
    'secret': process.env.JWT_TOKEN,
    'mongodbUri': process.env.DB_URL,
    'facebookAuth': {
        'clientID': '884566865215683',
        'clientSecret': '9aa4156870a948cbddf4c275b5f0c85c',
        'callbackURL': '/'  
    },
    'googleAuth': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': ''
    }
}

// DB_URL = mongodb+srv://kerberos4667:capcom1234@cluster0-j2dqx.mongodb.net/test?retryWrites=true&w=majority
// SECRET_KEY = MySecretKey1$1$234
// JWT_TOKEN = "abcdefghil1234567890"
// FB_clientID = "884566865215683"
// FB_clientSecret = "9aa4156870a948cbddf4c275b5f0c85c"
// FB_callbackURL = "/"