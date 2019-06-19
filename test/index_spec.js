/* global api, describe, it, expect, beforeEach */

const voteData = require('./mock_data')
const Vote = require('../models/vote')
console.log(voteData)

describe('GET /vote', () => {
  beforeEach(done => {
    Promise.all([
      Vote.deleteMany({})
    ])
      .then(() => Vote.create(voteData))
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get('/api/vote')
      .expect(200, done)
  })

  it('should return an array of projects', done => {
    api
      .get('/api/vote')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        res.body.forEach(_vote => {
          expect(_vote).to.include.keys([
            '_id',
            'total'
          ])
        })
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get('/api/vote')
      .end((err, res) => {
        res.body.forEach((_vote, i) => {
          expect(_vote._id).to.eq(voteData[i].candidate)
          expect(_vote.total).to.eq(1)
        })
        done()
      })
  })
})
