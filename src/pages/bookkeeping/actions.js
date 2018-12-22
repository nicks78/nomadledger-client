//manager/src/pages/bookkeeping/action.js

import axios from 'axios';
import { API_ENDPOINT } from '../../utils/constant'
// import {history} from '../../routes/history'

// GET FULL LIST OF ITEM
export function getBookList( actionType, query = "" ){

    return dispatch => {

        dispatch(requestData(actionType))

        axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/list${query}`, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(receiveContacts(actionType, res.payload ))  
        })
        .catch(function (error) {
          // handle error
          var message = error.response ? error.response.data.message : 'error_500'
          dispatch(requestFailed(actionType, message));
        })             
    }
}



function requestData( actionType ) {
    return {
        type: `REQUEST`,
        subtype: actionType,
        isFetching: false,
        isError: true
    }
}


function requestFailed( actionType, message ) {
    return {
        type: `FAILED`,
        subtype: actionType,
        isFetching: false,
        isError: true,
        message: message
    }
}

function receiveContacts( actionType, items ) {
    return {
        type: `RECEIVE`,
        subtype: actionType,
        isFetching: false,
        isError: true,
        payload: items
    }
}

export function createState ( actionType, fieldName, value ){
    return {
      type: `STATE`,
      subtype: actionType,
      payload: {fieldName, value}
    }
}

export function setListItem( actionType, name, item ) {

    // Convert to currency
    var from_currency = item.currency.en
    var tmp = {
        quantity: 1,
        discount: 0.00,
        total_ht: convertToCurrency(from_currency, item.price, "GBP"),
        total: convertToCurrency(from_currency, item.price, "GBP"),
        _id: item._id,
        tmp: item
    }
    return {
        type: `STATE_ITEM`,
        subtype: actionType,
        isFetching: false,
        isError: false,
        name: name,
        payload:  tmp
    }
}

export function addRemoveQuantity ( actionType, id, move ){
    return  {
      type: `UP_DOWN_QUANTITY`,
      subtype: actionType,
      move: move,
      id: id,
    }
}

export function discountPrice ( actionType, id, fieldName, value ){
    
    return  {
        type: `DISCOUNT`,
        subtype: actionType,
        _id: id,
        payload: {fieldName, value},
    }
}

export function removeItem ( actionType, item ){
    return  {
      type: `REMOVE_ITEM`,
      subtype: actionType,
      payload: item,
    }
}


function convertToCurrency(from, price, to) {

    var result = price * 1.14;
    var b = result.toString().substring(0, result.toString().indexOf(".") + 3)

    return parseFloat(b);

}