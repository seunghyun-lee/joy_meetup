const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

// database
mongoose.connect(process.env.DB_URL, {useNewUrlParser:true}, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('mongodb is running!');
    }
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());        // persistent login sessions
app.use(flash());           // use connect-flash for flash messages stored in session

app.get('/',(req,res) => {
    res.send('home');
});

// app route
app.use('/api',require('./api'));
// require('./api/index')(app, passport);

app.listen(port, err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`App started with port: ${port}`);
    }
});