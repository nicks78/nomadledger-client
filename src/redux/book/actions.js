//src/redux/book/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {history} from '../../routes/history'
import {updateArrayOfObject} from '../../utils/help_function'
import {setNotification} from '../notification/actions'
import {setError} from '../error/actions'

/**
 * GET FULL LIST OF DOCUMENT
 * @param actionType
 * @param query  (optional)
 */
export function getBookList( actionType, endPoint ){

    return async dispatch => {

        dispatch(requestData(actionType));

        try{
            const request = await axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`);
            const res = request.data
            dispatch(setTotal(actionType, res))
            dispatch(receiveDocuments(actionType, res.payload ))
        }catch(error){
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        }
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
        actionLoading: false,
        isError: false,
        payload: items
    }
}

/**
 * CREATE A NEW DOCUMENT
 * @param  actionType
 */
export function createDocument (actionType) {
    return async (dispatch, getState) => {

        let data = getState().book[actionType.toLowerCase()].item;

        dispatch(requestData(actionType));
        // Set withCredentials
        axios.defaults.withCredentials = true;

        try{
            await axios.post(`${API_ENDPOINT}/${actionType.toLowerCase()}/create`, {data})

            dispatch(setNotification("success_create", "success"))
            dispatch(resetState(actionType));

            history.push(`/${ actionType.toLowerCase() }`)
        }catch(error){
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        }
    }
}

/**
 * UPDATE DOCUMENT
 * @param  actionType
 */
export function updateDocument (actionType) {

    return async (dispatch, getState) => {

        let data = getState().book[actionType.toLowerCase()].item;

        dispatch(requestUpdate(actionType));
        // Set withCredentials
        axios.defaults.withCredentials = true;

        try{
            const request = await axios.put(`${API_ENDPOINT}/${actionType.toLowerCase()}/update`, {data})
            const res = request.data;
            dispatch(setNotification("success_update", "success"))
            dispatch( setDocument(actionType, res.item) )
        }catch(error){
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        }
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
 * UPDATE SINGLE FIELD IN DOCUMENT
 * @param  actionType
 * @param  data Object
 * @param  endPoint String
 */
export function updateField (actionType, data, endpoint) {

    return async (dispatch, getState) => {

        // Set withCredentials
        axios.defaults.withCredentials = true;

        dispatch(requestAction(actionType));

        var list = getState().library[actionType.toLowerCase()].list;

        try{
            const request = await axios.put(`${API_ENDPOINT}${actionType.toLowerCase()}/${endpoint}`, {data});
            const res = request.data;


            var newList = updateArrayOfObject(list, res.item);
            dispatch(receiveDocuments(actionType, newList )) ;
            dispatch(setNotification("success_update", "success"))

        }catch(error){
          dispatch(setError(error));
          dispatch(requestFailed(actionType))
        }
    }
}

/**
 * UPDATE SINGLE FIELD IN DOCUMENT
 * @param  actionType
 * @param  data Object
 * @param  endPoint String
 */
export function updateSingle (actionType, data, endpoint) {

    return async (dispatch, getState) => {

        // Set withCredentials
        axios.defaults.withCredentials = true;

        try{
            const request = await axios.put(`${API_ENDPOINT}${endpoint}`, {data});
            const res = request.data;

            dispatch(setNotification("success_update", "success"))

        }catch(error){
          dispatch(setError(error));
          dispatch(requestFailed(actionType))
        }
    }
}


/**
 * GET SINGLE DOCUMENT
 * @param  actionType
 * @param  id
 */
export function getDocument( actionType, id ){

    return async dispatch => {

        dispatch(requestData(actionType))

        try{
            const request = await axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${id}`);
            const res = request.data;

            dispatch(setDocument(actionType, res.payload ))

        }catch(error){
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        }
    }
}

/**
 * CREATE DOCUMENT BASE ON ANOTHER ONE
 * @param  actionType
 * @param  id
 * @param  newType
 */
export function convertToOtherDocument( actionType, id, newType ){

    return async (dispatch, getState) => {

        dispatch(requestData(actionType));
        const locale = getState().locale.locale

        try{
            const request = await axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${id}`);
            const res = request.data;

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

        }catch(error){
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        }
    }
}

/**
* SEND EMAIL WITH PDF
* @param actionType String
* @param endPoint String
* @param data Object
**/
export function sendEmailWithPdf( actionType, endPoint, data){

  return async (dispatch, getState) => {

      dispatch(requestAction(actionType));

      var list = getState().library[actionType.toLowerCase()].list;

      try{
          const request = await axios.post(`${API_ENDPOINT}/${actionType.toLowerCase()}/${endPoint}`, {data})
          const res = request.data;

          dispatch(setNotification("success_sent", "success"));

          var newList = updateArrayOfObject(list, res.item);
          dispatch(receiveDocuments(actionType, newList )) ;

      }catch(error){
          dispatch(requestFailed(actionType));
          dispatch(setError(error));
      }
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
 * GET SUM OF DOCUMENT
 * @param  actionType
 * @param  id
 */
export function getBookTotal( actionType, endPoint ){

    return async dispatch => {

        dispatch(requestData(actionType))

        try{
          const request = await axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`);
          const res = request.data;

          dispatch(setTotal(actionType, res ))

        }catch(error){
          dispatch(setError(error));
          dispatch(requestFailed(actionType));
        }
    }
}

export function setTotal ( actionType, res ){
    return {
      type: `SET_TOTAL`,
      subtype: actionType,
      total: res.total,
      rowsPerPageOptions: res.rowsPerPageOptions
    }
}


/**
 * DOWNLOAD PDF
 * @param  actionType
 * @param  id
 */
export function downloadPdf( actionType, id ){

    return async dispatch => {

        try{
          const request = await axios.get(`${API_ENDPOINT}common/create-pdf/${id}?model=${actionType.toLowerCase()}`);
          const res = request.data;

          window.open(res, "_blank");

        }catch(error){
          dispatch(setError(error));
          dispatch(requestFailed(actionType));
        }
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



export function requestAction( actionType ) {
    return {
        type: `REQUEST_ACTION`,
        subtype: actionType,
        actionLoading: true,
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
        receivedAt: null,
        actionLoading: false,
    }
}
