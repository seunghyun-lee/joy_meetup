const router = require('express').Router();
const authCtrl = require('./auth.controller');

router.post('/register/local', authCtrl.localRegister);
router.post('/login/local', authCtrl.localLogin);
router.get('/exists/:key(email|username)/:value', authCtrl.exists);
router.post('/logout', authCtrl.logout);

module.exports = router;