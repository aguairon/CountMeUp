const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/bbc')

global.Promise = require('bluebird')

const chai = require('chai')
global.expect = chai.expect

const supertest = require('supertest')
const app = require('../index')
global.api = supertest(app)
