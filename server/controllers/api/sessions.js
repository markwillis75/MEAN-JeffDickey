var router = require('express').Router()
var User   = require('../../models/user')
var bcrypt = require('bcryptjs')
var jwt    = require('jwt-simple')
var config = require('../../config')

router.post('/', function(req, res, next) {
    User.findOne({ username: req.body.username })
        .select('password').select('username')
        .exec(function(err, user) {
            if (err) {
                return next(err)
            }

            if (!user) {
                console.log("user not found")
                return res.sendStatus(401)
            }

            console.log(req.body.password)
            console.log(user.password)

            bcrypt.compare(req.body.password, user.password, function(err, valid) {
                if (err) {
                    return next(err)
                }

                if (!valid) {
                    return res.sendStatus(401)
                }

                var token = jwt.encode({ username: user.username }, config.secret)
                res.send(token)
            })
        })
})

module.exports = router
