const mongoose = require('mongoose')

const validateEmail = function(email) {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const validateCandidate = function(number) {
  const re = /[1-5]/
  return re.test(number)
}

const voteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email address is required',
    lowercase: true,
    trim: true,
    //make sure user inputs a valid email address
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  candidate: {
    type: Number,
    required: 'Candidate number is required',
    //make sure user inputs a valid email address
    validate: [validateCandidate, 'Please choose candidates 1 to 5']
  }
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
