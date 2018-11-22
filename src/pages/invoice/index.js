import React, { Component } from 'react'
import Table from './table'

class Invoice extends Component {
  render() {
    return (
      <div>
          <Table title={this.props.title} />
      </div>
    )
  }
}


export default Invoice;