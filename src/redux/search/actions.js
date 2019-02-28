//src/redux/search/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'

export function getAutocompleteList(query, field, model){

    return dispatch => {

        // Set withCredentials
        axios.defaults.withCredentials = true;
        var stock = '';
        if(model === 'contact' || model === 'service'){
            stock = '&stock=0'
        }
        axios.get(`${API_ENDPOINT}bookkeeping/${model}/autocomplete?query=${query}&field=${field}${stock}`, {
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

