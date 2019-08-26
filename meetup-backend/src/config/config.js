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

