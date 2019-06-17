const Vote = require('../models/vote')

function indexRoute(req, res) {
  Vote
    .find()
    .then(votes => res.status(200).json(votes))
}

function createRoute(req, res, next) {
  //Add current user to the body
  req.body.user = req.currentUser
  Vote
    //Add a new project to database
    .create(req.body)
    //Return the new project
    .then(vote => res.status(201).json(vote))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute
}
