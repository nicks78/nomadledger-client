//src/redux/account/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'



// GET A SINGLE ITEM
/**
 * @param actionType 
 * 
 */
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
        dispatch(setAccount( actionType, res.payload ))  
    })
    .catch(function (error) {
      // handle error
      var message = error.response ? error.response.data.message : 'error_500'
      dispatch(requestFailed(actionType, message));
    })          
  }
}

// UPDATE DOCUMENT
/**
 * @param actionType 
 * 
 */
export function updateDocument(actionType){

    return (dispatch, getState) => {
  
      var data = getState().account[actionType.toLowerCase()].tmp_state;

        if(Object.keys(data).length > 0 ){
        
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
        }else{
            return null
        }       
    }
}

// PUSH - PULL  DOCUMENT
/**
 * @param actionType 
 * 
 */
export function pushToDocument(actionType, data, endPoint ){

    return (dispatch) => {
        if(Object.keys(data).length > 0 ){
        
            axios.post(`${API_ENDPOINT}${endPoint}${actionType.toLowerCase()}`, {
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
        }else{
            return null
        }       
    }
}


// UPLOAD IMAGE/DOCS TO SERVER
/**
 * 
 * @param actionType // model name
 * @param file  // file to be uploaded 
 * @param id // id of the document if 'null', company_id is the default
 * @param field // name of the field in the document
 * @param oldFile // old file name to be delete
 */
export const uploadFileToServer = ( actionType, file, id, field, oldFile ) => {

  return (dispatch) => {

      dispatch(uploading(actionType))

      var oldfile = '';
      if(oldFile){
          oldfile = oldFile.path
      }
      // Set action name
      var url_path = actionType.toLowerCase() + '/upload?id=' +id+ '&field=' + field +'&oldfile='+ oldfile

      const formData = new FormData();

      // Set file
      formData.append("files", file);

      axios.post(`${API_ENDPOINT}${url_path}`,
          formData,   
          { 
            headers: {
              'content-type': 'application/form-data'
          },
          onUploadProgress: progressEvent => { // Check progression for upload
              var p =  ( progressEvent.loaded / progressEvent.total ) * 100
              dispatch(progress(actionType, parseInt(p, 10)))
          }
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


// UPDATE PASSWORD
/**
 * @param password 
 * 
 */
export const updatePassword = ( password ) => {

    return (dispatch) => {
  
        dispatch(requestData("USER"))
  
        axios.post(`${API_ENDPOINT}account/change-password`,
        {data: password},
        { headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setAccount( 'USER', res.payload ))  
        })
        .catch(function (error) {
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed('USER', message));
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

export function uploading ( actionType ){
  return {
    type: `UPLOADING`,
    subtype: actionType,
    isUploading: true,
  }
}
  

function requestData(actionType) {
    return {
        type: `REQUEST`,
        subtype: actionType,
        isFetching: true,
    }
}


export function setAccount( actionType, item) {

    return {
        type: `GET`,
        isFetching: false,
        subtype: actionType,
        isUploading: false, 
        item: item,
        receivedAt: Date.now()
    }
}

function requestFailed(actionType, message = "") {
    return {
        type: `FAILED`,
        isFetching: false,
        subtype: actionType,
        isUploading: false, 
        isError: true,
        message: message
    }
}

export const progress = (actionType, value) =>  {
  return {
      type: `PROGRESS`,
      subtype: actionType,
      value
  }
}