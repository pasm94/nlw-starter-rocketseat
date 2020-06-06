const express = require('express') // use express
const server = express() // execute express. It's a server object to do something, like start the server

// config public folder
server.use(express.static('public'))

// using template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})


// config application ways
// starter page
// req: request
// res: response
server.get('/', (req, res) => { // '/' by way of get will response an application
    return res.render('index.html', { title: 'Um título'})
})

server.get('/create-point', (req, res) => {
    return res.render('create-point.html')
})

server.get('/search', (req, res) => {
    return res.render('search-results.html')
})

// server start
server.listen(3000)