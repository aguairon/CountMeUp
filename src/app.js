import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import './scss/style.scss'
import axios from 'axios'

import VoteForm from './components/VoteForm'


class App extends React.Component {
  constructor(){
    super()
    this.state = {

    }

  }

  componentDidMount(){
    //get all the votes in existance
    axios.get('/api/vote/')
      .then( res =>{
        this.setState({ vote: res.data})
      })
      .catch(err =>this.setState({error: err.message}))
  }

  render(){
    if(!this.state) return <h1>Loading...</h1>
    // extracting all the variables to make it more readable

    return(
      <VoteForm />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
