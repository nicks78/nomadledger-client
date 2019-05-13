//src/redux/download/actions.js


import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {setError} from '../error/actions'



/**
 * // DOWNLOAD DOCUMENT
 * @param  actionType
 * @param  id
 */
export function downloadFile( actionType, endPoint, query = "" ){

    return dispatch => {

        dispatch(requestDownload())

        axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) {
            return response.data
        })
        .then( res => {

            dispatch(getDownload())
            window.open(res, "_blank");
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        })
    }
}

function requestDownload(){
    return {
        type: "REQUEST_DOWNLOAD",
        isFetching: true,
        isError: false
    }
}
function requestFailed(){
    return {
        type: "FAILED_DOWNLOAD",
        isFetching: false,
        isError: true
    }
}
function getDownload(){
    return {
        type: "GET_DOWNLOAD",
        isFetching: false,
        isError: false
    }
}
