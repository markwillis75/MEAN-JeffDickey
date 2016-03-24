var express = require('express')
var jwt     = require('jwt-simple')
var bcrypt  = require('bcryptjs') // using bcryptjs instead of bcrypt as the latter has python and openssl dependencies on Windows
var User    = require('./models/user')

var app     = express()

app.use(require('body-parser').json())

var secretKey = 'supersecretkey'

// creating a new user
app.post('/user', function(req, res, next){
	var user = new User({username: req.body.username})
	bcrypt.hash(req.body.password, 10, function(err, hash){
		user.password = hash
		user.save(function(err, user){
			if (err){
				throw next(err)
			}
			res.sendStatus(201)
		})
	})
})

// logging a user in, return jwt token or 401
app.post('/session', function(req, res, next){
	User.findOne({username: req.body.username}, function(err, user){
		if (err){
			return next(err)
		}

		if (!user){
			return res.sendStatus(401)
		}

		// use an asynchronous callback to prevent bcrypt blocking the thread
	    bcrypt.compare(req.body.password, user.password, function(err, valid){
		    if (err){
		    	return next (err)
		    }

		    if(!valid){
			    return res.sendStatus(401) //not authorized
		    }

		    var token = jwt.encode({username: user.username}, secretKey)
	        res.json(token)
	    })
	})
})

// retrieve user for a given jwt token
app.get('/user', function(req, res){
	var token = req.headers['x-auth']
	var auth  = jwt.decode(token, secretKey)

    User.findOne({username: auth.username}, function(err, user){
    	res.json(user)
    })
})

app.listen(3000)