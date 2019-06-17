import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import './scss/style.scss'
// import axios from 'axios'


class App extends React.Component {
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
