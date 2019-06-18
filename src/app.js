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
      }
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
    this.setState({ data })
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
          this.setState({errors: 'This email has already votes 3 times', data: {'candidate': '', 'email': ''}})
        }
      })

  }

  render(){
    if(!this.state) return <h1>Loading...</h1>
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
                  value={this.state.data.email }
                  onChange={this.handleChange}>
                </input>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Candidate Number"
                  name="candidate"
                  value={this.state.data.candidate}
                  onChange={this.handleChange}>
                </input>
              </div>
            </div>
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
