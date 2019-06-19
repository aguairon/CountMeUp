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

  getCorrectCount(i) {
    let count = 0
    this.state.vote.forEach(v => {
      if (v._id === i + 1) {
        console.log('yes', v.total, v._id, i + 1)
        count = v.total
      }
    })

    return count
  }

  createColumns() {
    const columns = []
    for(let i = 0; i < 5; i++) {
      columns.push(
        <div className="columns"key={i}>
          <div className="column is-5">
            Candidate {i + 1}
          </div>
          <div className="column is-5">
            {this.getCorrectCount(i)}
          </div>
        </div>
      )
    }
    return columns
  }


  render(){
    if(!this.state.vote) return <h1>Loading...</h1>
    return(
      <main>
        <h1 className="title is-1">Count Me Up</h1>
        <VoteForm />
        <section className="section">
          <div className="container">
            {this.createColumns()}
          </div>
        </section>
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
