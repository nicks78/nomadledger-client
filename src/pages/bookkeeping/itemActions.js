//manager/src/pages/bookkeeping/initActions.js

import axios from 'axios';
import {requestFailed, createState} from './actions'

/**
 * Called when add new item in store
 * @param actionType 
 * @param name // database field name
 * @param item 
 */
export function getListItem( actionType, name, item ) {
    return (dispatch, getState) => {
console.log(item)
        var currency = getState().book[actionType.toLowerCase()].item.currency;
        var convertedPrice = Promise.resolve(currencyConvertorApi( item.currency.en, item.price, currency.en ));

        convertedPrice.then( (unit_price) => {
            var tmp = {
                    quantity: 1,
                    ref: item.ref,
                    onModel: item.onModel,
                    desc: item.name, 
                    discount: 0,
                    currency: currency.en || item.currency.en,
                    unit_price: unit_price,
                    total: unit_price,
                    item_id: item
                }
            dispatch(setListItem(actionType, name, tmp))
        })
        .catch(function (error) {
            // handle error
            console.log("ERRORRRRR", error)
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




/**
 * 
 * @param  from 
 * @param  price 
 * @param  to 
 */
async function currencyConvertorApi(from, price, to){
    console.log(price)
    // Set real time currency convertor
    axios.defaults.withCredentials = false;
    // let json = await axios.get('https://reqres.in/api/users');

    var result = parseFloat( (price + 0.05 ).toFixed(2) ) 

    return result;
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