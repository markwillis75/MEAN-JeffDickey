var express = require('express')
var router = express.Router()
router.use(express.static(__dirname + '/../assets'))
router.use('/templates/', express.static(__dirname + '/../templates'))

//Serve layout/posts.html as the landing page
//The book uses sendfile instead of sendFile.  sendfile is deprecated
//When using sendFile, we need to use an absolute path or specify root

var options = {
	root: __dirname + './../layouts'
}
router.get('/', function(req, res){
	res.sendFile('/app.html', options)
})

module.exports = router