// manager/src/redux/HOC/getListAction.js


import axios from 'axios';
import { API_ENDPOINT, apiCall } from '../../utils/constant'
import { requestData, requestFailed  } from './'



// GET FULL LIST OF ITEM
export function getItemList( actionType, query = "" ){

    return dispatch => {

        dispatch(requestData(actionType))
        axios.defaults.withCredentials = true;

        axios.get(`${API_ENDPOINT}${apiCall(actionType).endPoints.get}${query}`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
          if(res.success){
                dispatch(receiveItems(actionType, res.payload ))  
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

// GET FULL LIST OF ITEM
export function getTotal( actionType ){

  return dispatch => {

      dispatch(requestData(actionType))
      axios.defaults.withCredentials = true;

      axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/count`, {
        method: 'GET',
        mode: 'cors'
      })
      .then(function (response) { 
          return response.data
      }) 
      .then( res => {
          dispatch(setTotal(actionType, res))
      })
      .catch(function (error) {
        // handle error
        var message = error.response ? error.response.data.message : 'error_500'
        dispatch(requestFailed(actionType, message));
      })             
  }
}


function receiveItems(actionType, items) {
  return {
    type: `RECEIVE`,
    subtype: actionType,
    isFetching: false,
    payload: items,
    receivedAt: Date.now()
  }
}


function setTotal(actionType, res) {
  
  return {
    type: `TOTAL`,
    subtype: actionType,
    isFetching: false,
    total: res.total,
    rowsPerPageOptions: res.rowsPerPageOptions 
  }
}