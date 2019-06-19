import React from 'react'
import axios from 'axios'

class Graph extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    //get totals for candidates
    axios.get('/api/vote/')
      .then( res =>{
        this.setState({ vote: res.data})
      })
      .catch(err =>this.setState({error: err.message}))
  }

  getCorrectCount(i) {
    let count = 0
    //instead of returning 0, if there is a total for that candidate return that
    this.state.vote.forEach(v => {
      if (v._id === i + 1) {
        count = v.total
      }
    })

    return count
  }
  // create 5 sections of columns with a candidate column and a count column
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

  render() {
    if(!this.state.vote) return <h1>No votes yet...</h1>
    return(
      <div>
        <h3 className="title is-3">Candidates votes so far</h3>
        <section className="section graph">
          <div className="container">
            {this.createColumns()}
          </div>
        </section>
      </div>
    )
  }
}

export default Graph
