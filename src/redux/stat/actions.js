//src/redux/stat/actions.js

import axios from 'axios'
import {API_ENDPOINT} from '../constant'


export const getData = (fieldName, endPoint) => {

    return (dispatch,  getState) => {

        axios({
            method: "GET",
            url: `${API_ENDPOINT}stat/${endPoint}`,
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setData( res.datasets, fieldName ))  
        }) 
        .catch(function (error) {
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed( message ));
        })    
    }
}


function setData(data, fieldName) {
    return {
        type: "GET_DATA",
        fieldName,
        data
    }
}

function requestFailed(message) {
    return {
        type: "FAILED_STAT",
        message,
        isError: true,
    }
}