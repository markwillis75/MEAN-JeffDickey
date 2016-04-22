var Post = require('../../models/post')
var router = require('express').Router()

// get all posts
router.get('/', function(req, res, next){
	Post.find()
	.sort('-date')
	.exec(function(err, posts){
		if (err){
			return next(err)
		}
		res.json(posts)
	})
})

// post a new post
router.post('/', function(req, res, next){
	var post = new Post({body: req.body.body})
	post.username = req.auth.username
	
	post.save(function(err, post){
		if (err){
			return next(err)
		}
		res.status(201).json(post)
	})
})

module.exports = router