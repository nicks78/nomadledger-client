//src/redux/library/actions/getAction.js

import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestData, requestFailed  } from './'
import {setError} from '../../error/actions'

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
      dispatch(setError(error));
      dispatch(requestFailed(actionType));
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