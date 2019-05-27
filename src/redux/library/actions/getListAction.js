//src/redux/library/actions/getListAction.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestData, requestFailed  } from './'
import {setError} from '../../error/actions'

// GET FULL LIST OF ITEM
export function getItemList( actionType, endPoint ){

    return dispatch => {

        dispatch(requestData(actionType))
        axios.defaults.withCredentials = true;

        axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) {
            return response.data
        })
        .then( res => {
            dispatch(setTotal(actionType, res))
            dispatch(receiveItems(actionType, res.payload ))
        })
        .catch(function (error) {
          dispatch(setError(error));
          dispatch(requestFailed(actionType));
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
