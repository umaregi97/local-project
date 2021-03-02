const express = require('express')
let routes = require('./routes.js')
const bodyParser = require('body-parser')

require('./config/mongoose')

let app = express()
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended : true }))
app.use('/v1',routes)
app.listen('3000', () => {
    console.log("server running successfully")
})

module.exports = app