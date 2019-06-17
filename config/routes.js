const router = require('express').Router()

const votesController = require('../controllers/votes')

router.route('/vote')
  .get(votesController.index)
  .post(votesController.create)


module.exports = router
