const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
  email: {type: String, required: 'Email address is required'},
  candidate: {type: Number, required: 'Candidate number is required'}
}, {
  timestamps: true
})

//Remove __v tag when returning JSON
voteSchema.set('toJSON', {
  transform(doc, json) {
    delete json.__v
    return json
  }
})


module.exports = mongoose.model('Vote', voteSchema)
