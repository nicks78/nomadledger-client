//src/redux/book/baseBookReducer.js

import {
    removeDuplicateAndAddQuantity,
    discountPrice,
    manageQuantity,
    editObjectInArray
} from '../../utils/help_function'

import { sumItem, calculVat, sumCharges } from './helper'


const initialState = {
    item: { list_items: [] },
    total: 0,
    rowsPerPageOptions: [],
    isUpdating: false,
    receivedAt: null,
    progress: 0,
    isFetching: false,
    isError: false,
    list: [],
    actionLoading: false
}

const authReducer = (state = initialState, action) => {

    var items, totalItems, balance_due


    switch (action.type) {
        case `REQUEST`:
            return {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                isUpdating: action.isUpdating
            }
        case `REQUEST_ACTION`:
            return {
                ...state,
                actionLoading: action.actionLoading,
                isError: action.isError,
            }
        case `UPDATING`:
            return {
                ...state,
                isError: action.isError,
                isUpdating: action.isUpdating
            }
        case `FAILED`:
            return {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                receivedAt: action.receivedAt,
                isUpdating: action.isUpdating,
                actionLoading: action.actionLoading
            }
        case `RECEIVE`:
            return {
                ...state,
                isFetching: action.isFetching,
                isUpdating: action.isUpdating,
                list: action.payload,
                receivedAt: action.receivedAt,
                actionLoading: action.actionLoading
            }
        case `GET`:
            return {
                ...state,
                isFetching: action.isFetching,
                isUpdating: action.isUpdating,
                isError: action.isError,
                item: action.item,
            }
        case `STATE`:
            return {
                ...state,
                item: { ...state.item, [action.payload.fieldName]: action.payload.value },
            }
        case `STATE_ITEM`:
            items = removeDuplicateAndAddQuantity(state.item.list_items || [], action);
            totalItems = sumItem(items);
            balance_due = totalItems - (state.item.charges || 0);

            return {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                item: {
                    ...state.item,
                    list_items: items,
                    subtotal: totalItems,
                    balance_due: balance_due,
                    net_to_pay: balance_due,
                    vat_value: calculVat(totalItems, state.item.vat),
                    deposit_amount: 100
                },
            }
        case `UPDATE_LIST_ITEM`:
            // items = replaceObjectInArray(state.item.list_items, action.payload);
            totalItems = sumItem(state.item.list_items);
            balance_due = totalItems - (state.item.charges || 0);

            return {
                ...state,
                item: {
                    ...state.item,
                    list_items: state.item.list_items,
                    subtotal: totalItems,
                    balance_due: balance_due,
                    net_to_pay: balance_due,
                    vat_value: calculVat(totalItems, state.item.vat),
                    deposit_amount: 100
                },
            }

        case `UP_DOWN_QUANTITY`:
            items = manageQuantity(state.item.list_items, action);
            totalItems = sumItem(items);
            if (state.item.quote_id) {
                balance_due = totalItems - (sumCharges(state.item.charges) || 0);
            }

            return {
                ...state,
                item: {
                    ...state.item,
                    list_items: items,
                    subtotal: totalItems,
                    balance_due: balance_due,
                    net_to_pay: state.item.quote_id ? balance_due : totalItems,
                    vat_value: calculVat(totalItems, state.item.vat),
                    deposit_amount: 100
                },
            }

        case `DISCOUNT`:
            items = discountPrice(state.item.list_items, action);
            totalItems = sumItem(items);
            if (state.item.quote_id) {
                balance_due = totalItems - (sumCharges(state.item.charges) || 0);
            }

            return {
                ...state,
                item: {
                    ...state.item,
                    list_items: items,
                    subtotal: totalItems,
                    balance_due: balance_due,
                    net_to_pay: state.item.quote_id ? balance_due : totalItems,
                    vat_value: calculVat(totalItems, state.item.vat),
                    deposit_amount: 100
                },
            }
        case `UPDATE_PRICE`:

            var object = []
            var val = action.value || 0
            for (let i = 0; i < state.item.list_items.length; i++) {
                if (state.item.list_items[i]._id === action._id) {
                    state.item.list_items[i].unit_price = val;
                    state.item.list_items[i].total = val * state.item.list_items[i].quantity;

                }
                object.push(state.item.list_items[i])
            }

            totalItems = sumItem(object);
            balance_due = totalItems - (state.item.charges || 0);

            return {
                ...state,
                item: {
                    ...state.item,
                    list_items: object,
                    subtotal: totalItems,
                    net_to_pay: balance_due,
                    balance_due: balance_due,
                    vat_value: calculVat(totalItems, state.item.vat),

                }
            }
        case `EDIT_SINGLE_ITEM`:
            items = editObjectInArray(state.item.list_items, action.item, action.payload.fieldName, action.payload.value);
            totalItems = sumItem(items);
            if (state.item.quote_id) {
                balance_due = totalItems - (sumCharges(state.item.charges) || 0);
            }
            return {
                ...state,
                item: {
                    ...state.item,
                    list_items: items,
                    subtotal: totalItems,
                    balance_due: balance_due,
                    net_to_pay: state.item.quote_id ? balance_due : totalItems,
                    vat_value: calculVat(totalItems, state.item.vat),
                    deposit_amount: 100
                },
            }

        case `REMOVE_ITEM`:
            items = state.item.list_items.filter((el) => { return el._id !== action.payload._id });
            totalItems = sumItem(items);
            if (state.item.quote_id) {
                balance_due = totalItems - (sumCharges(state.item.charges) || 0);
            }
            return {
                ...state,
                item: {
                    ...state.item,
                    list_items: items,
                    subtotal: totalItems,
                    balance_due: balance_due,
                    net_to_pay: state.item.quote_id ? balance_due : totalItems,
                    vat_value: calculVat(totalItems, state.item.vat),
                    deposit_amount: 100
                },
            }


        case `SET_TOTAL`:
            return {
                ...state,
                total: action.total,
                rowsPerPageOptions: action.rowsPerPageOptions
            }
        case `RESET_STATE`:
            return initialState
        default:
            return state;
    }
}

export default authReducer;
