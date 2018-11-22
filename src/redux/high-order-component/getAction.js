//Users/nic/Sites/manager/src/redux/HOC/getAction.js

import axios from 'axios';
import { API_ENDPOINT, apiCall } from '../../api/constant'
import { requestData, requestFailed  } from './'


// GET A SINGLE ITEM
export function getItem( actionType, id ){

  return dispatch => {

    dispatch(requestData(actionType))
  
    axios.get(`${API_ENDPOINT}${apiCall(actionType).endPoints.get_one}/${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
          'x-access-token': localStorage.getItem('token')
      }
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