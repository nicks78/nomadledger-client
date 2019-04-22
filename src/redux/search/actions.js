//src/redux/search/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {setError} from '../error/actions'

export function getAutocompleteList(endpoint){

    return dispatch => {

        // Set withCredentials
        axios.defaults.withCredentials = true;
        axios.get(`${API_ENDPOINT}${endpoint}`, {
          method: 'GET',
        })
        .then(function (response) {
            return response.data
        })
        .then( res => {
            dispatch(receiveItems( res.payload ))
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
        })
    }
}

export function receiveItems(items ) {
    return {
        type: `RECEIVE_ITEM`,
        isFetching: false,
        isError: true,
        payload: items
    }
}


function requestFailed() {
    return {
        type: `FAILED_ITEM`,
        isFetching: false,
        isError: true,
    }
}
