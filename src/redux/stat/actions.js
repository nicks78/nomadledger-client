//src/redux/stat/actions.js

import axios from 'axios'
import {API_ENDPOINT} from '../constant'
import {setError} from '../error/actions'

export const getData = (fieldName, endPoint) => {

    return (dispatch,  getState) => {
        dispatch(requestStat());
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
            dispatch(setError(error));
            dispatch(requestFailed());
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

function requestStat( fieldName) {
    return {
        type: "REQUEST_STAT",
        isFetching: true,
        isError: true,
    }
}

function requestFailed() {
    return {
        type: "FAILED_STAT",
        isError: true,
    }
}
