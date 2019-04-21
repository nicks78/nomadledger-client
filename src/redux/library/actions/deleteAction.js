//src/redux/library/actions/deleteAction.js

import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import {requestFailed  } from './'
import {setNotification} from '../../notification/actions'
import {setError} from '../../error/actions'

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
        dispatch(setNotification("success_delete", "error"))
        dispatch(updateListItems(actionType, res._id ))
    })
    .catch(function (error) {
      dispatch(setError(error));
      dispatch(requestFailed(actionType));
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

        console.log(res.item)
        dispatch(setNotification("success_delete", "error"))
        dispatch(setItem(actionType, res.item ))
    })
    .catch(function (error) {
      dispatch(setError(error));
      dispatch(requestFailed(actionType));
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
