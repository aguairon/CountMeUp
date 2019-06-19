const mongoose = require('mongoose')
const Vote = require('../models/vote')

mongoose.connect('mongodb://localhost/bbc', (err, db) => {
  //Delete all database data
  db.dropDatabase()
    .then(() => Vote.create(
      [{
        email: 'begona@example.com',
        candidate: 1
      }, {
        email: 'begona@example.com',
        candidate: 2
      }, {
        email: 'begona@example.com',
        candidate: 3
      }, {
        email: 'begona2@example.com',
        candidate: 1
      }, {
        email: 'begona2@example.com',
        candidate: 4
      }, {
        email: 'begona2@example.com',
        candidate: 5
      }, {
        email: 'begona3@example.com',
        candidate: 1
      }, {
        email: 'begona3@example.com',
        candidate: 2
      }, {
        email: 'begona3@example.com',
        candidate: 3
      }]
    ))
    .then(() => console.log('Database successfully seeded'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
