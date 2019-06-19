import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import './scss/style.scss'

import VoteForm from './components/VoteForm'
import Graph from './components/Graph'


class App extends React.Component {

  render(){
    return(
      <main>
        <h1 className="title is-1">Count Me Up</h1>
        <VoteForm />
        <Graph />
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
