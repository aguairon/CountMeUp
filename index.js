const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./config/routes')

const app = express()
mongoose.connect('mongodb://localhost/bbc')

app.use(bodyParser.json())
app.use('/api', routes)
// app.use('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`))
app.listen(4000, () => console.log('listening in port 4000'))

module.exports = app
