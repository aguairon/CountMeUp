/* global api, describe, it, expect, beforeEach */

const voteData = require('./mock_data')
const Vote = require('../models/vote')

describe('POST /vote', () => {
  beforeEach(done => {
    Promise.all([
      Vote.deleteMany({})
    ])
      .then(() => done())
  })

  it('should return a 201 response when correct data is sent', done => {
    api
      .post('/api/vote')
      .send([voteData[0]])
      .expect(201, done)
  })

  it('should return a 422 response when incorrect data is sent', done => {
    api
      .post('/api/vote')
      .send({email: 'hhh', candidate: 1})
      .expect(422, done)
  })

  it('should return the created vote', done => {
    api
      .post('/api/vote')
      .send(voteData[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.include.keys([
          'email',
          'candidate'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .post('/api/vote')
      .send(voteData[0])
      .end((err, res) => {
        expect(res.body.email).to.eq(voteData[0].email)
        expect(res.body.candidate).to.eq(voteData[0].candidate)
        done()
      })
  })
})
