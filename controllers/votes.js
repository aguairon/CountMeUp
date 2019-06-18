const Vote = require('../models/vote')

function indexRoute(req, res) {
  Vote
    .find()
    .then(votes => res.status(200).json(votes))
}

function createRoute(req, res) {
  Vote
    //Add a new vote to database
    .create(req.body)
    //Return the new vote
    .then(vote => res.status(201).json(vote))
    // Error handling when submitting an invalid email or candidate
    .catch(function(err) {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err)
        res.status(422).json(err)
      } else {
        console.error(err)
        res.status(500).json(err)
      }
    })
}

module.exports = {
  index: indexRoute,
  create: createRoute
}
