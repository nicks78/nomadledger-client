//src/redux/task/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {setNotification} from '../notification/actions'
import {setError} from '../error/actions'


// GET AUTHENTICATED
export function getAllTask(endPoint, fieldName){

    return dispatch => {
  
      dispatch(requestTask());
      
      axios.get(`${API_ENDPOINT}task/${endPoint}`)
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(receiveTask(res.payload, fieldName))
        }) 
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
        })          
    }
}

// CREATE NEW ITEM
export const createTask = () => {

    return (dispatch, getState) => {

        dispatch(requestTask());

        // Get current state
        var state = getState().task.item;
        

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
            dispatch(getAllTask( `list?day=${new Date().getTime()}`, "taskList" ))
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
        })  
    }
}

// UPDATE TASK
export const updateTask = () => {

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
            dispatch(setNotification("success_update", "success"))
            dispatch(getAllTask( `list?day=${new Date().getTime()}`, "taskList" ))  
        }) 
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
        })    
    }
}

// UPDATE STATUS OF TASK
export const updateStatus = (task, fieldName) => {

    return (dispatch, getState) => {

        var list = getState().task[fieldName] || []

        axios.put(`${API_ENDPOINT}task/update`,
            {data: task},
            { headers: {
                    'Content-Type': 'application/json',
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            var items = {};
            if(list.tasks){
                items.tasks = list.tasks.filter((x) => { return x._id !== task._id });
                items.tasks.push(res.item);
            }
            dispatch(receiveTask(items, fieldName))
            dispatch(setNotification("success_update", "success"))
            
        }) 
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
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

export function receiveTask(items, fieldName){
    return {
        type: "RECEIVE_TASK",
        isFetching: false,
        payload: items,
        fieldName
    }
}

export function setTask(item){
    return {
        type: "GET_TASK",
        isFetching: false,
        isError: false,
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

export function resetTask (){
    return {
      type: `RESET_TASK`
    }
}