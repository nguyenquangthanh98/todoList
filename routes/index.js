var express = require('express');
var router = express.Router();
var path = require('path');
var UserMiddleware = require('../middleware/userMiddleware');
/* GET home page. */
router.get('/', function(req, res, next) {
    // res.sendFile(path.join(__dirname, '../views/home.html'));
    res.sendFile(path.join(__dirname, '../views/dangnhap.html'))
});

router.get('/dangki', function(req, res, next) {
    // res.sendFile(path.join(__dirname, '../views/home.html'));
    res.sendFile(path.join(__dirname, '../views/dangki.html'))
});

router.get('/home', UserMiddleware.checkAdmin, function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/home.html'))
})
router.get('/cookie', UserMiddleware.checkAdmin, function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/textCookie.html'))
})

module.exports = router;