//src/routes/notFound.js

import React, { Component } from 'react'
import Spinner from '../components/common/spinner'


export default class NotFount extends Component {

  state = {
    timeout: false,
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({timeout: true})
    }, 3000)
  }


  render() {

    const {timeout} = this.state

    return (
      <div style={{textAlign: 'center', marginTop: "20%"}}>
      {
        !timeout ? 
            <Spinner />
        : <h2>PAGE NOT FOUND</h2> 
      }
          
      </div>
    )
  }
}
