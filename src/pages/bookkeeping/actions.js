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
            dispatch(receiveDocuments(actionType, res.payload ))  
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

// Receive all documents list ( invoice || quote || payback )
function receiveDocuments( actionType, items ) {
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

// Set a list of items (service/products)
export function setListItem( actionType, name, item ) {

    return {
        type: `STATE_ITEM`,
        subtype: actionType,
        isFetching: false,
        isError: false,
        name: name,
        payload:  item
    }

    
}

export function getListItem( actionType, name, item ) {
    console.log("GETITEMS", name)
    return (dispatch, getState) => {

        var currency = getState().book[actionType.toLowerCase()].item.currency;

        var tmp = {
            quantity: 1,
            type: item.type,
            discount: 0.00,
            currency: currency.en || item.currency.en,
            unit_price: currencyCovertorApi( item.currency.en, item.price, currency.en ),
            total: currencyCovertorApi( item.currency.en, item.price, currency.en ),
            _id: item._id,
            tmp: item
        }
        
        dispatch(setListItem(actionType, name, tmp))
    }
}

// Convert each item into the selected currency
export function convertToCurrency(actionType, currency) {

    return (dispatch, getState) => {

        var listItems = getState().book[actionType.toLowerCase()].list_items;
        
        for(var i = 0; i < listItems.length; i++){
            var item = listItems[i]
            item.total = currencyCovertorApi(item.base_currency, item.total, currency.en);
            item.unit_price = currencyCovertorApi( item.currency.en, item.unit_price, currency.en );
            item.base_currency =  currency.en;
        }

        dispatch(createState(actionType, "list_items", listItems))
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

// Add CURRENCY CONVERTOR API
export function currencyCovertorApi(from, price, to) {
    // var result = parseFloat((price * 1.35).toFixed(2));
    return price;
}
