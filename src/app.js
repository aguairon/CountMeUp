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
    if(!this.state.vote) return <h1>Loading...</h1>
    return(
      <main>
        <h1 className="title is-1">Count Me Up</h1>
        <VoteForm />
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
