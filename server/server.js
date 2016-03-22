var express = require('express')
var bodyparser = require('body-parser')

var app = express()
app.use(bodyparser.json())

var Post = require('./models/post')

app.get('/api/posts', function(req, res, next){
	Post.find(function(err, posts){
		if (err){
			return next(err)
		}
		res.json(posts)
	})
})

app.post('/api/posts', function(req, res, next){
	var post = new Post({
		username: req.body.username,
		body: req.body.body
	})
	
	post.save(function(err, post){
		if (err){
			return next(err)
		}
		res.status(201).json(post)
	})
})

app.listen(3000, function(){
	console.log('Server listening on ', 3000)
})