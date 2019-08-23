const express = require('express');
const api = express.Router();
const auth = require('./auth');

api.use('/auth', require('./auth'));

module.exports = api;