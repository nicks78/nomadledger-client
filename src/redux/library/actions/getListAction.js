//src/redux/library/actions/getListAction.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestData, requestFailed } from './'
import { setError } from '../../error/actions'

// GET FULL LIST OF ITEM
export function getItemList(actionType, endPoint) {
  if (cancel !== undefined) {
    cancel();
  }
  return dispatch => {

    dispatch(requestData(actionType))
    axios.defaults.withCredentials = true;

    axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`, {
      method: 'GET',
      mode: 'cors',
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
    })
      .then(function (response) {
        return response.data
      })
      .then(res => {
        dispatch(setTotal(actionType, res))
        dispatch(receiveItems(actionType, res.payload))
      })
      .catch(function (error) {
        if (!error.message) {
          console.log("canceled request")
        } else {
          dispatch(setError(error));
          dispatch(requestFailed(actionType));
        }
      })
  }
}

var CancelToken = axios.CancelToken;
var cancel;

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
