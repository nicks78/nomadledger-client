//src/redux/helper/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {setError} from '../error/actions'

// GET FULL LIST OF ITEM
export function getHelpers( ){

    return dispatch => {

        dispatch(requestHelpers());
        axios.get(`${API_ENDPOINT}public/initial-data`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setHelpers(res.payload ))  
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(failedHelpers());
        })             
    }
}

function setHelpers(items) {
    return {
        type: "GET_HELPERS",
        items
    }
}

function requestHelpers() {
    return {
        type: "REQUEST_HELPERS",
        isFetching: true,
        isError: false
    }
}

function failedHelpers() {
    return {
        type: "FAILED_HELPERS",
        isFetching: false,
        isError: true
    }
}