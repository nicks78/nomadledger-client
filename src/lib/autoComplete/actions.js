//manager/src/lib/items/actions.js
import axios from 'axios';
import { API_ENDPOINT } from '../../utils/constant'

// GET FULL LIST OF ITEM
export function getItemList(){

    return dispatch => {

        dispatch(requestData())
        axios.defaults.withCredentials = true;

        axios.get(`${API_ENDPOINT}bookkeeping/item-list`, {
          method: 'GET',
          mode: 'cors'
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

export function getAutocompleteList(query, field, model){

    return dispatch => {

        // dispatch(requestData())
        axios.defaults.withCredentials = true;

        axios.get(`${API_ENDPOINT}bookkeeping/autocomplete/${model}?query=${query}&field=${field}`, {
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

function requestData( items ) {
    return {
        type: `REQUEST_ITEM`,
        isFetching: true,
        isError: true,
    }
}

function requestFailed( items ) {
    return {
        type: `FAILED_ITEM`,
        isFetching: false,
        isError: true,
    }
}

