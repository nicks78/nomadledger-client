//src/redux/task/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'

// GET AUTHENTICATED
export function getAllTask(endPoint){

    return dispatch => {
  
    //   dispatch(requestTask());
      
      axios.get(`${API_ENDPOINT}task/${endPoint}`)
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(receiveTask(res.payload))
        }) 
        .catch(function (error) {
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed(message));
        })          
    }
}

// CREATE NEW ITEM
export const createTask = () => {

    return (dispatch, getState) => {

        // Get current state
        var state = getState().task.item

        const formData = new FormData();
        // Set file
        if(state.doc)
        for (var x = 0; x < state.doc.length; x++) {
            formData.append("files", state.doc[x]);
        }
        // Set input 
        formData.append('state', JSON.stringify(state));

        axios.post(`${API_ENDPOINT}task/create`,
            formData,   
            { 
              headers: {
                'content-type': 'application/form-data'
            },
            onUploadProgress: progressEvent => { // Check progression for upload
                // var p =  ( progressEvent.loaded / progressEvent.total ) * 100
                // dispatch(progress(actionType, parseInt(p, 10)))
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(getAllTask( `grouped-task` ))
        })
        .catch(function (error) {
            // dispatch(progress( 100))
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed( message));
        })  
    }
}

// CREATE NEW ITEM
export const updateTask = (  ) => {

    return (dispatch, getState) => {

        dispatch(requestTask());

        // Get current state
        var state = getState().task.item;

        axios.put(`${API_ENDPOINT}task/update`,
            {data: state},
            { headers: {
                    'Content-Type': 'application/json',
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(getAllTask( `grouped-task` ))  
        }) 
        .catch(function (error) {
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed( message));
        })    
    }
}

export function setCreatedItem(item) {
    return {
        type: "CREATED_TASK",
        isCreating: false,
        payload: item
    }
}

export function requestTask(){
    return {
        type: "REQUEST_TASK",
        isFetching: true,
        isError: false,
        message: "",
    }
}

export function receiveTask(items){
    return {
        type: "RECEIVE_TASK",
        isFetching: false,
        payload: items
    }
}

export function setTask(item){
    return {
        type: "GET_TASK",
        isFetching: false,
        isError: false,
        message: "",
        payload: item
    }
}


export function requestFailed(message){
    return {
        type: "FAILED_TASK",
        isError: true,
        message,
        isFetching: false
    }
}

export function createStateTask ( e, fieldName, value ){
    return {
      type: `STATE_TASK`,
      payload: {fieldName, value}
    }
}