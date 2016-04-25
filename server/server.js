var express = require('express')
var bodyparser = require('body-parser')

var app = express()
app.use(bodyparser.json())
app.use(require('./auth'))
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/api/users', require('./controllers/api/users'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/adminusers', require('./controllers/api/adminusers'))
app.use('/', require('./controllers/static'))

app.listen(3000, function(){
	console.log('Server listening on ', 3000)
})