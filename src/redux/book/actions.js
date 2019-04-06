//src/redux/book/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {history} from '../../routes/history'
import {updateArrayOfObject} from '../../utils/help_function'
import {setNotification} from '../notification/actions'


/**
 * // GET FULL LIST OF DOCUMENT
 * @param actionType 
 * @param query  (optional)
 */
export function getBookList( actionType, endPoint ){

    return dispatch => {

        dispatch(requestData(actionType))

        axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(receiveDocuments(actionType, res.payload ))  
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(setNotification(message, "error"))
          dispatch(requestFailed(actionType, message));
        })             
    }
}

// Receive all documents list ( invoice || quote || payback )
function receiveDocuments( actionType, items ) {
    return {
        type: `RECEIVE`,
        subtype: actionType,
        isUpdating: false,
        receivedAt: Date.now(),
        isFetching: false,
        isError: false,
        payload: items
    }
}

/**
 * // CREATE A NEW DOCUMENT
 * @param  actionType 
 */
export function createDocument (actionType) {
    return (dispatch, getState) => {

        let data = getState().book[actionType.toLowerCase()].item;

        dispatch(requestData(actionType));
        // Set withCredentials
        axios.defaults.withCredentials = true;

        axios.post(`${API_ENDPOINT}/${actionType.toLowerCase()}/create`,
            { 
                data,
                mode: 'cors'
            },   
            { headers: {
                    'Content-Type': 'application/json'
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setNotification("success_create", "success"))
            dispatch(resetState(actionType));
            history.push(`/${ actionType.toLowerCase() }`)
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(setNotification(message, "error"))
          dispatch(requestFailed(actionType, message));
        })             
    }
}

/**
 * // UPDATE DOCUMENT
 * @param  actionType 
 */
export function updateDocument (actionType) {
    return (dispatch, getState) => {

        let data = getState().book[actionType.toLowerCase()].item;

        dispatch(requestUpdate(actionType));
        // Set withCredentials
        axios.defaults.withCredentials = true;

        axios.put(`${API_ENDPOINT}${actionType.toLowerCase()}/update`,
            { 
                data,
                mode: 'cors'
            },   
            { headers: {
                    'Content-Type': 'application/json'
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setNotification("success_update", "success"))
            dispatch( setDocument(actionType, res.item) )
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(setNotification(message, "error"))
          dispatch(requestFailed(actionType, message));
        })             
    }
}

export function requestUpdate( actionType ) {
    return {
        type: `UPDATING`,
        subtype: actionType,
        isUpdating: true,
        isError: false
    }
}

/**
 * // UPDATE SINGLE FIELD IN DOCUMENT
 * @param  actionType 
 * @param  data to be update
 * @param  id of document
 */
export function updateField (actionType, data, id) {
    
    return (dispatch, getState) => {

        // Set withCredentials
        axios.defaults.withCredentials = true;
        var list = getState().library[actionType.toLowerCase()].list;

        axios.put(`${API_ENDPOINT}common/update-field/${actionType.toLowerCase()}/${id}`,
            { 
                data,
                mode: 'cors'
            },   
            { headers: {
                    'Content-Type': 'application/json'
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setNotification("success_update", "success"))
            var newList = updateArrayOfObject(list, res.item);
            dispatch(receiveDocuments(actionType, newList )) 
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(setNotification(message, "error"))
          dispatch(requestFailed(actionType, message));
        })             
    }
}


/**
 * // GET SINGLE DOCUMENT
 * @param  actionType 
 * @param  id 
 */
export function getDocument( actionType, id ){

    return dispatch => {

        dispatch(requestData(actionType))

        axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${id}`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setDocument(actionType, res.payload ))  
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(setNotification(message, "error"))
          dispatch(requestFailed(actionType, message));
        })             
    }
}

/**
 * // GET SINGLE DOCUMENT
 * @param  actionType 
 * @param  id 
 */
export function convertToOtherDocument( actionType, id, newType ){

    return (dispatch, getState) => {

        dispatch(requestData(actionType));
        const locale = getState().locale.locale

        axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${id}`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            var item = {
                list_items: res.payload.list_items,
                infos:  res.payload.infos,
                terms: res.payload.terms,
                vat: res.payload.vat,
                currency: res.payload.currency,
                contact_id: res.payload.contact_id,
                [actionType.toLowerCase() + "_id"]: res.payload._id,
                onRef: locale.wording[actionType.toLowerCase()] +"-"+res.payload.ref
            }

            dispatch(setDocument(newType, item ))  
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(setNotification(message, "error"))
          dispatch(requestFailed(actionType, message));
        })             
    }
}

// Receive all documents list ( invoice || quote || payback )
export function setDocument( actionType, item ) {

    return {
        type: `GET`,
        subtype: actionType,
        isFetching: false,
        isError: false,
        isUpdating: false,
        item: item
    }
}

export function createState ( actionType, fieldName, value ){
    return {
      type: `STATE`,
      subtype: actionType,
      payload: {fieldName, value}
    }
}


/**
 * // GET SUM OF DOCUMENT
 * @param  actionType 
 * @param  id 
 */
export function getBookTotal( actionType, endPoint ){

    return dispatch => {

        dispatch(requestData(actionType))

        axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setTotal(actionType, res.total ))  
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(setNotification(message, "error"))
          dispatch(requestFailed(actionType, message));
        })             
    }
}

export function setTotal ( actionType, total ){
    return {
      type: `SET_TOTAL`,
      subtype: actionType,
      total
    }
}


/**
 * // GET SINGLE DOCUMENT
 * @param  actionType 
 * @param  id 
 */
export function downloadPdf( actionType, id ){

    return dispatch => {

        axios.get(`${API_ENDPOINT}common/create-pdf/${id}?model=${actionType.toLowerCase()}`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            window.open(res, "_blank");
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(requestFailed(actionType, message));
        })             
    }
}


/********************************************************************************************************************************
 * 
 * COMMON FUNCTION INIT
 * 
 ***********************************************************************************************************************************/


export function resetState ( actionType ){
    return {
      type: `RESET_STATE`,
      subtype: actionType,
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


export function requestFailed( actionType, message ) {
    return {
        type: `FAILED`,
        subtype: actionType,
        isUpdating: false,
        isFetching: false,
        isError: true,
        receivedAt: null,
        message: message
    }
}