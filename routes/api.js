var express = require('express');
var router = express.Router();
var db = require('../config/dbJob.js');
var dbUser = require('../config/dbUser.js');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var UserMiddleware = require('../middleware/userMiddleware');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(bodyParser.urlencoded({ extended: false }));


/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.sendFile(path.join(__dirname, "../views/home.html"))
// });

router.get('/pages', function(req, res) {
    var page = parseInt(req.query.page)
    console.log(page);
    db.find()
        .skip((page - 1) * 3)
        .limit(3)
        .exec()
        .then(function(data) {
            res.json(data)
        })
})

router.get('/count', function(req, res) {
    db.estimatedDocumentCount(function(err, count) {
        res.json(count)
        console.log(count);
    })
});

router.post('/postAdd', function(req, res) {
    db.create({ title: req.body.listname, Content: req.body.datepicker })
        .then(function(data) {
            res.json({
                status: 200,
                message: "thêm thành công",
                data: data
            })
        })
})

router.put('/edit/:id', function(req, res) {
    db.findByIdAndUpdate({ _id: req.params.id }, { $set: { title: req.body.editName, Content: req.body.editDatepicker } }, { new: true })
        .then(function(value) {
            db.find({ _id: req.params.id })
                .then(function(data) {
                    console.log(data);
                    res.json({
                        status: 200,
                        message: "Cập nhật thành công!",
                        data: data
                    })
                })

        })
})

router.delete('/delete/:id', async function(req, res) {
    var findID = await db.findOneAndRemove({ _id: req.params.id })
        // .then(function() {
    res.json('thanh cong')
        // })
})

router.get('/details/:id', function(req, res) {
        db.findById({ _id: req.params.id, title: req.body.detailsName, Content: req.body.detailsDatepicker })
    })
    //đăng kí
router.post('/sign-up', function(req, res, next) {
    let gmail = req.body.gmail;
    let password = req.body.password;
    // if (gmail.length <= 0 && password.length <= 0) {
    //     res.json('Bạn cần nhập tài khoản')
    // }
    bcrypt.hash(password, saltRounds, function(err, hash) {
        dbUser.create({ gmail, password: hash }).then(function(data) {
            // console.log(data);
            res.json('bạn đã đăng kí thành công tài khoản')
                // res.redirect("/home")
        })
    });
})

//login
router.post('/sign-in', function(req, res, next) {
        dbUser.find({ gmail: req.body.gmail })
            .then(function(data) {
                if (!data.length) {
                    res.json("đăng nhập không thành công")
                }
                console.log(data);
                bcrypt.compare(req.body.password, data[0].password, function(err, value) {
                    if (err) {
                        console.log(err);
                    } else if (value) {
                        let token = jwt.sign({ data: data[0] }, 'nqt', { expiresIn: "2d" })
                            // res.json('dung taif khoan')
                        return res.json(token)
                    } else {
                        res.json('sai mk')
                    }

                });

            })
    })
    //gọi app -> router -> middleware -> sevice(function)-> gọi đến DB
router.get('/middleware', UserMiddleware.UserMiddleware, function(req, res, next) {
    res.json("check thành công")
})


router.get('/checkApi', UserMiddleware.checkAdmin, function(req, res, next) {
    res.json('day la admin')
})

router.get('/checkNguoidung', UserMiddleware.checkNguoidung, function(req, res, next) {
    res.json('day la nguoi dung')
})
module.exports = router;