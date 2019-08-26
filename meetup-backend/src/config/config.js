module.exports = {
    'secret': process.env.JWT_TOKEN,
    'mongodbUri': process.env.DB_URL,
    'facebookAuth': {
        'clientID': process.env.FB_clientID,
        'clientSecret': process.env.FB_clientSecret,
        'callbackURL': '/'  
    },
    'googleAuth': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': ''
    }
}

