import React, { Component } from 'react'

const ShowClient = (props) => {

    return (
      <div>
          {props.client.company.name}
      </div>
    )
}

export default ShowClient;