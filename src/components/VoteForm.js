import React from 'react'
import axios from 'axios'

class VoteForm extends React.Component {
  constructor(){
    super()
    this.state = {
      data: {
        email: '',
        candidate: ''
      },
      errors: {}
    }
    this.handleChange  = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value }
    // reset the errors so when user types it does not see no longer relevant error code
    this.setState({ data , errors: {}})
  }

  postVote() {
    axios
      .post('/api/vote',
        this.state.data)
      .then(this.setState({data: {'candidate': '', 'email': ''}}))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleSubmit(e) {
    e.preventDefault()

    axios
      //search the db for the email on the form
      .get(`/api/vote/${this.state.data.email}`)
      .then(res => {
        //let this email vote again if it has less than 3 votes
        if (res.data.length < 3) {
          this.postVote()
        } else {
          // if not reset form and give error message
          this.setState({errors: { valid: 'This email has already votes 3 times'}, data: {'candidate': '', 'email': ''}})
        }
      })
  }

  render() {
    const {data: {email, candidate},  errors: {email: errEmail, candidate: errCandidate, valid}} = this.state
    return(
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Email address"
                  name="email"
                  value={email }
                  onChange={this.handleChange}>
                </input>
                {errEmail && <p className="error">{errEmail.message}</p>}
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Candidate Number"
                  name="candidate"
                  value={candidate}
                  onChange={this.handleChange}>
                </input>
                {errCandidate && <p className="error">{errCandidate.message}</p>}
              </div>
            </div>
            {valid && <p className="error">{valid}</p>}
            <button  className='button is-primary'>Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default VoteForm
