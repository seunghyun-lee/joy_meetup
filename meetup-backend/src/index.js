const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.listen(port, err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`App started with port: ${port}`);
    }
});