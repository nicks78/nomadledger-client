//src/redux/helper/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'


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
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(failedHelpers(message));
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

function failedHelpers(message) {
    return {
        type: "FAILED_HELPERS",
        isFetching: false,
        isError: true,
        message
    }
}