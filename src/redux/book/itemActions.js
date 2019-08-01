//manager/src/pages/bookkeeping/initActions.js

import axios from 'axios';
import { requestFailed } from './actions'
import { API_ENDPOINT } from '../constant';
import { setError} from '../error/actions'


/**
 * Called when add new item in store
 * @param actionType
 * @param name // database field name
 * @param item
 */
export function getListItem( actionType, name, item ) {
    return async (dispatch, getState) => {

        var currency = getState().book[actionType.toLowerCase()].item.currency;
        var price = item.onModel === "product" ? item.selling_price : item.price;

        if(!currency){
          var error = {
            response: { status: 422 , data: {message: "error_422_missing_currency"}}
          }
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
            return
        }

        try{
            const unit_price = await currencyConvertorApi( item.currency.en, price, currency.en );

            var tmp = {
                    quantity: 1,
                    ref: item.ref,
                    onModel: item.onModel,
                    desc: item.name,
                    discount: 0,
                    currency: currency.en,
                    unit_price: unit_price,
                    total: unit_price,
                    item_id: item._id
                    // item_id: item
                }
                dispatch(setListItem(actionType, name, tmp))
        }catch(error){
          dispatch(setError(error));
          dispatch(requestFailed(actionType));
        }
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
        currencyConvertorApi( item.currency, item.total, currency.en )
        .then( (value) => {
            item.total = parseFloat(((value * item.quantity) - item.discount).toFixed(2));
            item.unit_price = value;
            item.base_currency = item.currency;
            item.currency = currency.en
        })
        .then(() => {
            dispatch(updateListItems(actionType,  item ))
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed(actionType));

        })
    }
}

export function updateListItems( actionType, item ) {
    return  {
        type: `UPDATE_LIST_ITEM`,
        subtype: actionType,
        payload: item
      }
}



/**
 * 
 * Call API and convert each amount 
 * @param  from
 * @param  price
 * @param  to
 */
async function currencyConvertorApi(from, amount, to){

    // Set real time currency convertor
    return new Promise( (resolve, reject) => {
        axios.post(`${API_ENDPOINT}common/convert-currency`,
        {
            data: {
                from: from,
                to: to,
                amount: amount
            },
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
            resolve(res);
        })
        .catch(function (error) {
            reject(error)
        })
    })
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
