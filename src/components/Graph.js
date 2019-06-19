import React from 'react'
import axios from 'axios'

class Graph extends React.Component {
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

  render() {
    if(!this.state.vote) return <h1>Loading...</h1>
    return(
      <section className="section">
        <div className="container">
          {this.createColumns()}
        </div>
      </section>
    )
  }
}

export default Graph
