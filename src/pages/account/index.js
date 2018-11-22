//src/pages/account/index.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createItem, getItemList, getItem, createState } from '../../redux/high-order-component'
import EditContactInfo from '../contact/dashboard/editContactInfo'


class Account extends Component {


  state = {
    showContact: false,
    reducer: 'ACCOUNT',
    keyLocation: ''
}


  handleEditProfile = (e) => {
    console.log(e.target.name)
  }

  render() {
    return (
      <div>
          <p>Paramettre de l'application</p>
          <p>Edit company</p>
          <p>Edit information personnel</p>
          <p></p>

          <EditContactInfo 
                label="mafia"
                value="name"
                edit={true}
                field="mafia"
                editProfile={this.handleEditProfile}
            />

      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
      isFetching: state.library.account.isFetching,
      isCreating: state.library.account.isCreating,
      isError: state.library.account.isError,
      listaccounts: state.library.account.list,
      receivedAt: state.library.account.receivedAt,
      locale: state.locale.locale,
      newaccount: state.library.account.tmp_state,
      progress: state.library.account.progress
  }
}


export default connect(mapStateToProps, { createItem, getItemList, getItem, createState })(Account);