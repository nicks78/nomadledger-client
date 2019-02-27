//src/redux/library/actions/deleteAction.js

import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import {requestFailed  } from './'


// GET A SINGLE ITEM
export function removeImageFromArray( actionType, endPoint ){

  return dispatch => {
  
    axios(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`, {
      method: 'DELETE',
      withCredentials: true,
    })
    .then(function (response) { 
        return response.data
    }) 
    .then( res => {
        dispatch(setItem(actionType, res.item ))  
    })
    .catch(function (error) {
      // handle error
      var message = error.response ? error.response.data.message : 'error_500'
      dispatch(requestFailed(actionType, message));
    })          
  }
}


function setItem(actionType, item) {
  return {
    type: `GET`,
    subtype: actionType,
    isFetching: false,
    item: item
  }
}