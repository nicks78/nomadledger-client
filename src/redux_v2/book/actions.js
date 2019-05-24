//src/redux_v2/book/actions.js
import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {history} from '../../routes/history'
import {updateArrayOfObject} from '../../utils/help_function'
import {setNotification} from '../notification/actions'
import {setError} from '../error/actions'

/**
* GET FULL LIST OF DOCUMENTS
*
* @param actionType String
* @param endPoint String
* @param stateName String
*
*/
export function getListBooks(actionType, endPoint) {
    return async (dispatch, getState) => {
      try{
        const request = await axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`);
        const res = request.data
        dispatch(receiveDocuments(actionType, res ))
      }catch(err){
        dispatch(setNotification(message, 'error'))
      }
    }
}

// Receive all documents list ( invoice || quote || payback )
function receiveDocuments( actionType, res, stateName ) {
    return {
        type: `RECEIVE`,
        subtype: actionType,
        isUpdating: false,
        isError: false,
        isFetching: false,
        receivedAt: Date.now(),
        payload: res.payload,
        total: res.total,
        rowsPerPageOptions: res.rowsPerPageOptions
    }
}



/**
* CREATE A DOC
*
* @param actionType String
* @param endPoint String
* @param stateName String
*
*/
export function createDocument (actionType, endPoint, stateName) {
    return async (dispatch, getState) => {
        // Get item state
        let data = getState().book[actionType.toLowerCase()].item;

        dispatch(requestUpdate(actionType));
        // Set withCredentials
        axios.defaults.withCredentials = true;

        try{
            await axios.post(`${API_ENDPOINT}/${actionType.toLowerCase()}/${endPoint}`, {data})

            dispatch(setNotification("success_create", "success"))

            // Redirect to global list
            history.push(`/${actionType.toLowerCase()}`)

        }catch(error){
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        }
    }
}



/**
* UPDATE A DOC
*
* @param actionType String
* @param endPoint String
* @param stateName String
*
*/
export function updateDocument (actionType, endPoint, stateName) {
    return async (dispatch, getState) => {
        // Get item state
        let data = getState().book[actionType.toLowerCase()].item;

        dispatch(requestUpdate(actionType));
        // Set withCredentials
        axios.defaults.withCredentials = true;

        try{
            const request = await axios.put(`${API_ENDPOINT}/${actionType.toLowerCase()}/${endPoint}`, {data})
            const res = request.data
            dispatch(setNotification(res.message, "success"))

            // Update global document list
            dispatch(updateListDocument(res.item))
        }catch(error){
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        }
    }
}

// Receive all documents list ( invoice || quote || payback )
function updateListDocument( actionType, res ) {
    return {
        type: `UPDATE_LIST`,
        subtype: actionType,
        isUpdating: false,
        isError: false,
        isFetching: false,
        receivedAt: Date.now(),
        payload: res
    }
}


/********************************************************************************************************************************
 *
 * COMMON FUNCTION INIT
 *
 ***********************************************************************************************************************************/


export function resetState ( actionType ){
    return {
      type: `RESET`,
      subtype: actionType,
    }
}



export function requestUpdate( actionType ) {
    return {
        type: `UPDATING`,
        subtype: actionType,
        isUpdating: true,
        isError: false,
    }
}


export function requestData( actionType ) {
    return {
        type: `REQUEST`,
        subtype: actionType,
        isUpdating: false,
        isFetching: true,
        isError: false
    }
}


export function requestFailed( actionType ) {
    return {
        type: `FAILED`,
        subtype: actionType,
        isUpdating: false,
        isFetching: false,
        isError: true,
        receivedAt: null
    }
}
