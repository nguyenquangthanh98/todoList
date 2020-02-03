var jwt = require('jsonwebtoken');

function UserMiddleware(req, res, next) {
    let token = req.cookies
        // console.log(token);
    if (token) {
        var jwtDecode = jwt.verify(token, 'nqt')
        res.locals = jwtDecode;
        next()
    } else {
        // res.json("khong co ma token")
        res.redirect('/')
    }
}

function checkAdmin(req, res, next) {
    let token = req.cookies.token
        // try {
        //     var jwtDecode = jwt.verify(token, 'nqt')
        //     if (jwtDecode.data.type === 1) {
        //         next()
        //     } else {
        //         res.redirect('/')
        //             // res.json("Trang web chỉ admin được truy cập")
        //     }
        // } catch (err) {
        //     if (err.message === "invalid token") {
        //         res.redirect("/")
        //     }
        // }
    if (token) {
        var jwtDecode = jwt.verify(token, 'nqt')
        if (jwtDecode.data.type === 1) {
            next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect(
            '/'
        )
    }
}

function checkNguoidung(req, res, next) {
    let token = req.body.token;
    var jwtDecode = jwt.verify(token, 'nqt')
    if (jwtDecode.data.type === 2) {
        next()
    } else {
        res.json("khong phai nguoi dung")
    }
}

module.exports = { UserMiddleware, checkAdmin, checkNguoidung };