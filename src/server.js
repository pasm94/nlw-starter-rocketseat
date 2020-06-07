const express = require('express') // use express
const server = express() // execute express. It's a server object to do something, like start the server

// get database
const db = require("./database/db")

// config public folder
server.use(express.static('public'))

// enable the req.body use in the aplication
server.use(express.urlencoded({ extended: true }))

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
    return res.render('index.html', { title: 'Um título' })
})

server.get('/create-point', (req, res) => {

    // req. query: Query String da nossa url
    // console.log(req.query)

    return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {

    // req.body: the form body
    // console.log(req.body)

    // insert data in database
    const query = `
    INSERT INTO places (
        image,
        name,
        adress,
        adress2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData) // will be executed just after execute all


})


server.get('/search', (req, res) => {

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        return res.render('search-results.html', { total: 0 })

    }

    // get data from database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        // show html page with data from database
        return res.render('search-results.html', { places: rows, total })

    })

})

// server start
server.listen(3000)