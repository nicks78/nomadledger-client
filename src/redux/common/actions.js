//src/redux/common/actions.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestData, requestFailed  } from './'
import {setError} from '../../error/actions'

// GET FULL LIST OF ITEM
export function getItemList( actionType, endPoint, stateName ){

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
            dispatch(receiveItems(actionType, res.payload ))
        })
        .catch(function (error) {
          dispatch(setError(error));
          dispatch(requestFailed(actionType));
        })
    }
}
