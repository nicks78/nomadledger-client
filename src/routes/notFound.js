//src/routes/notFound.js

import React, { Component } from 'react'
import Spinner from '../components/common/spinner'


class NotFound extends Component {

  state = {
    timeout: false,
  }

  componentDidMount() {
      // Remember the timer handle
     this.timerHandle = setTimeout(() => {
       this.setState({ timeout: true })
     }, 3000);
  }

  componentWillUnmount() {
      clearTimeout(this.timerHandle);
  }

  render() {

    const {timeout} = this.state

    return (
      <div style={{textAlign: 'center', marginTop: "20%"}}>
        {
          !timeout ?
            <div><Spinner />BIM</div>
          : <h2>"404 - Page not found !"</h2>
        }

      </div>
    )
  }
}


export default NotFound;
