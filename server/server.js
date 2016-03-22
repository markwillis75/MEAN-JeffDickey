var express = require('express')
var bodyparser = require('body-parser')

var app = express()
app.use(bodyparser.json())

var Post = require('./models/post')

app.get('/api/posts', function(req, res, next){
	Post.find()
	.sort('-date')
	.exec(function(err, posts){
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

//Serve layout/posts.html as the landing page
//The book uses sendfile instead of sendFile.  sendfile is deprecated
//When using sendFile, we need to use an absolute path or specify root
app.get('/', function(req, res){
	res.sendFile('layouts/posts.html', {"root": __dirname})
})

app.listen(3000, function(){
	console.log('Server listening on ', 3000)
})