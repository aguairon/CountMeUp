import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import './scss/style.scss'
import axios from 'axios'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
    }

  }

  componentDidMount(){
    axios.get('/api/vote/')
      .then( res =>{
        this.setState({ user: res.data})
      })
      .catch(err =>this.setState({error: err.message}))
  }

  render(){
    return(
      <h1>Hello</h1>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
