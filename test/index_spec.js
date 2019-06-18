/* global api, describe, it, expect, beforeEach, after */

describe('GET /vote', () => {
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
            'email',
            'candidate'
          ])
        })
        done()
      })
  })
})
