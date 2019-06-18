const router = require('express').Router()

const votesController = require('../controllers/votes')

router.route('/vote')
  .get(votesController.index)
  .post(votesController.create)

// in order to search if user has voted 
router.route('/vote/:search')
  .get(votesController.search)

module.exports = router
