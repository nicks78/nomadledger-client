//src/redux/library/actions/deleteAction.js

import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import {requestFailed  } from './'


// REMOVE AN ELEMENT
export function deleteElement( actionType, endPoint ){

  return dispatch => {
  
    axios(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`, {
      method: 'DELETE',
      withCredentials: true,
    })
    .then(function (response) { 
        return response.data
    }) 
    .then( res => {
        dispatch(updateListItems(actionType, res._id ))  
    })
    .catch(function (error) {
      // handle error
      var message = error.response ? error.response.data.message : 'error_500'
      dispatch(requestFailed(actionType, message));
    })          
  }
}

// REMOVE IMAGE FROM ARRAY
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

function updateListItems(actionType, id){
  return {
    type: "UPDATE_LIST",
    subtype: actionType,
    id
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