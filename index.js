const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./config/routes')

const app = express()
mongoose.connect('mongodb://localhost/bbc')

app.use(bodyParser.json())
app.use(routes)
app.listen(8000, () => console.log('listening in port 8000'))
