//manager/src/pages/account/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../../utils/constant'



// GET A SINGLE ITEM
export function getAccount(actionType){

  return dispatch => {

    dispatch(requestData(actionType))
  
    axios.get(`${API_ENDPOINT}account/infos-${actionType.toLowerCase()}`, {
      method: 'GET',
      mode: 'cors',
    })
    .then(function (response) { 
        return response.data
    }) 
    .then( res => {
        if(res.success){
          dispatch(setAccount( actionType, res.payload ))  
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

// UPDATE DOCUMENT
export function updateDocument(actionType){

    return (dispatch, getState) => {
  
      dispatch(requestData())

      var data = getState().account[actionType.toLowerCase()].tmp_state;
        
      axios.post(`${API_ENDPOINT}account/update/infos/${actionType.toLowerCase()}`, {
            data: data
      })
      .then(function (response) { 
          return response.data
      }) 
      .then( res => {
            dispatch(setAccount( actionType, res.payload ))  
      })
      .catch(function (error) {
        // handle error
        var message = error.response ? error.response.data.message : 'error_500'
        dispatch(requestFailed(actionType, message));
      })          
    }
}

export function createState ( actionType, fieldName, value ){
    return {
      type: `STATE`,
      subtype: actionType,
      payload: {fieldName, value}
    }
}

export function resetState ( actionType ){
  return {
    type: `RESET_STATE`,
    subtype: actionType
  }
}
  



function requestData(actionType) {
    return {
        type: `REQUEST`,
        subtype: actionType,
        isFetching: true,
    }
}


function setAccount( actionType, item) {

    return {
        type: `GET`,
        isFetching: false,
        subtype: actionType,
        item: item,
        receivedAt: Date.now()
    }
}

function requestFailed(actionType, message = "") {
    return {
        type: `FAILED`,
        isFetching: false,
        subtype: actionType,
        isError: true,
        message: message
    }
}