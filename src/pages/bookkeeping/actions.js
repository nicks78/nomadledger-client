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

export function createDocument (actionType) {
    return (dispatch, getState) => {

        var data = getState().book[actionType.toLowerCase()].tmp_state;
        data.list_items = getState().book[actionType.toLowerCase()].list_items

        data.contact_id = data.company_name._id;

        dispatch(requestData(actionType));
        // Set withCredentials
        axios.defaults.withCredentials = true;

        axios.post(`${API_ENDPOINT}bookkeeping/${actionType.toLowerCase()}/create`,
            { 
                data: data,
                mode: 'cors'
            },   
            { headers: {
                    'Content-Type': 'application/json'
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            console.log(res)
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
        isError: false
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
        isError: false,
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

/**
 * Called when add new item in store
 * @param actionType 
 * @param name // database field name
 * @param item 
 */
export function getListItem( actionType, name, item ) {
    return (dispatch, getState) => {

        var currency = getState().book[actionType.toLowerCase()].item.currency;
        var convertedPrice = Promise.resolve(currencyConvertorApi( item.currency.en, item.price, currency.en ));

        convertedPrice.then( (unit_price) => {
            var tmp = {
                    quantity: 1,
                    type: item.type,
                    desc: item.name, 
                    discount: 0,
                    currency: currency.en || item.currency.en,
                    unit_price: unit_price,
                    total: unit_price,
                    item_id: item._id,
                    tmp: item
                }
            dispatch(setListItem(actionType, name, tmp))
        })
        .catch(function (error) {
            // handle error
            dispatch(requestFailed(actionType, "error_500"));
        })        
    }
}

// Add item to list (service/products)
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

/**
 * Update all item in the list
 * Called when user change currency dropdown
 * 
 * @param actionType 
 * @param currency 
 * 
 */
export function convertToCurrency( actionType, currency, item ) {

    return (dispatch) => {
        var convertedPrice = Promise.resolve(currencyConvertorApi( item.currency.en, item.unit_price, currency.en ));

        convertedPrice.then( (value) => {
            item.total = parseFloat((value * item.quantity).toFixed(2));
            item.unit_price = value;
            item.base_currency = currency.en;
            
        })
        .then(() => {
            dispatch(createState(actionType, 'list_items', item))
        })
        .catch(function (error) {
            // handle error
            dispatch(requestFailed(actionType, "error_500"));
        })   
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
        isError: false,
        _id: id,
        payload: {fieldName, value},
    }
}

export function editItem ( actionType, item, fieldName, value ){
    
    return  {
        type: `EDIT_SINGLE_ITEM`,
        subtype: actionType,
        isError: false,
        item: item,
        payload: {fieldName, value},
    }
}

export function removeItem ( actionType, item ){
    return  {
      type: `REMOVE_ITEM`,
      subtype: actionType,
      isError: false,
      payload: item,
    }
}

/**
 * 
 * @param  from 
 * @param  price 
 * @param  to 
 */
async function currencyConvertorApi(from, price, to){

    // Set real time currency convertor
    axios.defaults.withCredentials = false;
    let json = await axios.get('https://reqres.in/api/users');

    var result = parseFloat( (price + 0.05 ).toFixed(2) ) 

    return result;
}