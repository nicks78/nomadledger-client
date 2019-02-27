//src/redux/book/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {history} from '../../routes/history'


/**
 * // GET FULL LIST OF DOCUMENT
 * @param actionType 
 * @param query  (optional)
 */
export function getBookList( actionType, query = "" ){

    return dispatch => {

        dispatch(requestData(actionType))

        axios.get(`${API_ENDPOINT}bookkeeping/${actionType.toLowerCase()}/list${query}`, {
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
          dispatch(requestFailed(actionType, message));
        })             
    }
}

// Receive all documents list ( invoice || quote || payback )
function receiveDocuments( actionType, items ) {
    return {
        type: `RECEIVE`,
        subtype: actionType,
        updated: false,
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

        axios.post(`${API_ENDPOINT}bookkeeping/${actionType.toLowerCase()}/create`,
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
            dispatch( setCreatedUpdatedItem(actionType, res.item) )
            history.push(`/bookkeeping/${ actionType.toLowerCase() }`)
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
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

        dispatch(requestData(actionType));
        // Set withCredentials
        axios.defaults.withCredentials = true;

        axios.post(`${API_ENDPOINT}bookkeeping/${actionType.toLowerCase()}/update`,
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
            dispatch( setCreatedUpdatedItem(actionType, res.item) )
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(requestFailed(actionType, message));
        })             
    }
}

/**
 * // UPDATE DOCUMENT
 * @param  actionType 
 * @param  data to be update
 * @param  id of document
 */
export function updateField (actionType, data, id) {
    
    return dispatch => {

        // Set withCredentials
        axios.defaults.withCredentials = true;

        axios.post(`${API_ENDPOINT}bookkeeping/${actionType.toLowerCase()}/update/field/${id}`,
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
            dispatch( setCreatedUpdatedItem(actionType, res.item) )
        })
        .catch(function (error) {
            console.log(error)
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(requestFailed(actionType, message));
        })             
    }
}

// Set created/updated item
function setCreatedUpdatedItem( actionType, item ) {
    return {
        type: `CREATED`,
        subtype: actionType,
        isFetching: false,
        updated: true,
        isError: false,
        payload: item
    }
}


export function requestData( actionType ) {
    return {
        type: `REQUEST`,
        subtype: actionType,
        updated: false,
        isFetching: true,
        isError: false
    }
}


export function requestFailed( actionType, message ) {
    return {
        type: `FAILED`,
        subtype: actionType,
        updated: false,
        isFetching: false,
        isError: true,
        receivedAt: null,
        message: message
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

        axios.get(`${API_ENDPOINT}bookkeeping/${actionType.toLowerCase()}/document/${id}`, {
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

export function resetState ( actionType ){
    return {
      type: `RESET_STATE`,
      subtype: actionType,
    }
}
