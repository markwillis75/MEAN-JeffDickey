var router = require('express').Router()
var User   = require('../../models/user')
var config = require('../../config')

router.get('/', function(req, res, next) {

    User.find(function(err, users) {
        if (err) {
            return next(err)
        }

        res.json(users)
    })
})

router.delete('/', function(req, res, next){
	User.findOne(req.body.userid, function(err, user){
		if (err){
			return next(err)
		}

		user.remove()

		res.json(user)
	})
})

module.exports = router