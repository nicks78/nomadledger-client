//manager/src/lib/items/actions.js
import axios from 'axios';
import { API_ENDPOINT } from '../../utils/constant'

export function getAutocompleteList(query, field, model){

    return dispatch => {

        // Set withCredentials
        axios.defaults.withCredentials = true;
        axios.get(`${API_ENDPOINT}bookkeeping/${model}/autocomplete?query=${query}&field=${field}`, {
          method: 'GET',
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(receiveItems( res.payload ))  
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(requestFailed( message));
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


function requestFailed( items ) {
    return {
        type: `FAILED_ITEM`,
        isFetching: false,
        isError: true,
    }
}

