import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import './scss/style.scss'
import axios from 'axios'


class App extends React.Component {
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

  componentDidMount(){
    axios.get('/api/vote/')
      .then( res =>{
        this.setState({ vote: res.data})
      })
      .catch(err =>this.setState({error: err.message}))
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value }
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

  render(){
    if(!this.state) return <h1>Loading...</h1>
    const {data: {email, candidate},  errors} = this.state

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
                {errors && errors.email && <p className="error">{errors.email.message}</p>}
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
                {errors && errors.candidate && <p className="error">{errors.candidate.message}</p>}
              </div>
            </div>
            {errors && errors.valid && <p className="error">{errors.valid}</p>}
            <button  className='button is-primary'>Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
