//src/redux/library/actions/getAction.js

import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestData, requestFailed  } from './'
import {setNotification} from '../../notification/actions'


// GET A SINGLE ITEM
export function getItem( actionType, id ){

  return dispatch => {

    dispatch(requestData(actionType))
  
    axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${id}`, {
      method: 'GET',
      mode: 'cors',
    })
    .then(function (response) { 
        return response.data
    }) 
    .then( res => {
        dispatch(setItem(actionType, res.payload ))  
    })
    .catch(function (error) {
      // handle error
      var message = error.response ? error.response.data.message : 'error_500'
      dispatch(setNotification(message, "error"))
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