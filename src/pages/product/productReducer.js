//manager/src/pages/product/productReducer.js

import { 
    REQUEST_PRODUCTS, 
    FAILED_PRODUCTS, 
    RECEIVE_PRODUCTS, 
    PRODUCT_STATE, 
    GET_PRODUCT } from '../../redux/actionsTypes'

const initialState = {
  isFetching: false,
  product: null,
  isError: false,
  listProducts: [],
  receivedAt: null,
  newProduct: {}
}

export default (state = initialState, action) => {
  
  switch (action.type) {
    case REQUEST_PRODUCTS:
        return  { 
            ...state,
            isFetching: true,
          }
    case FAILED_PRODUCTS: 
        return {
            ...state,
            isFetching: false,
            isError: true,
        }
    case RECEIVE_PRODUCTS:
        return  { 
            ...state,
            isFetching: false,
            listProducts: action.payload, 
            receivedAt: action.receivedAt 
        }
    case GET_PRODUCT:
        return  { 
            ...state,
            product: action.product,
            isFetching: false,
        }
    case PRODUCT_STATE: 
        return {
            ...state,
            newProduct: { ...state.newProduct, [ action.payload.fieldName] : action.payload.value  }    
        }
    default:
        return state
  }
}
