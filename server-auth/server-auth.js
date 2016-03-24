var express = require('express')
var jwt     = require('jwt-simple')
var lodash  = require('lodash')
var bcrypt  = require('bcryptjs') // using bcryptjs instead of bcrypt as the latter has python and openssl dependencies on Windows

var app     = express()

app.use(require('body-parser').json())

/* The password (literal string "pass" was hashed outside of the app using bcryptjs.
   In reality it wouls be hashed on-the-fly inside the app */
var users     = [{username: 'dickeyxxx', password: '$2a$10$ShG7medas2RMOOYIo0pqDe0cQTuG1p6LPvrskZryarX/dQ2vJooSS'}]
var secretKey = 'supersecretkey'

function findUserByUsername(username){
	return lodash.find(users, {username:username})
}

function validateUser(user, password, callback){
	bcrypt.compare(password, user.password, callback)
}

app.post('/session', function(req, res){
	var user = findUserByUsername(req.body.username)

    // use an asynchronous callback to prevent bcrypt blocking the thread
	validateUser(user, req.body.password, function(err, valid){
		if (err || !valid){
			return res.send(401) //not authorized
		}

		var token = jwt.encode({username: user.username}, secretKey)
	    res.json(token)

	})
})

app.get('/user', function(req, res){
	var token = req.headers['x-auth']
	var user  = jwt.decode(token, secretKey)

    //TODO pull user from database

    res.json(user)
})

app.listen(3000)