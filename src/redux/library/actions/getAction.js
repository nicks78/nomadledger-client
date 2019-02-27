//src/redux/library/actions/getAction.js

import axios from 'axios';
import { API_ENDPOINT, apiCall } from '../../constant'
import { requestData, requestFailed  } from './'


// GET A SINGLE ITEM
export function getItem( actionType, id ){

  return dispatch => {

    dispatch(requestData(actionType))
  
    axios.get(`${API_ENDPOINT}${apiCall(actionType).endPoints.get_one}/${id}`, {
      method: 'GET',
      mode: 'cors',
    })
    .then(function (response) { 
        return response.data
    }) 
    .then( res => {
        if(res.success){
          dispatch(setItem(actionType, res.payload ))  
        }else{
          dispatch(requestFailed(actionType))
        }
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