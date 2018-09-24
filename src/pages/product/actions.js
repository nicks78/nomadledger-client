//manager/src/pages/product/actions.js


// import axios from 'axios';
import { REQUEST_PRODUCTS, FAILED_PRODUCTS, RECEIVE_PRODUCTS, PRODUCT_STATE, GET_PRODUCT  } from '../../redux/actionsTypes'


// TMP DATA
import products from '../../FAKE_DATA/products.json'

// GET FULL LIST OF PRODUCTS
export function getProducts( ){

    return dispatch => {

        dispatch(requestProducts())

        setTimeout(() => {
            dispatch(receiveProducts(products))  
        }, 300)

        if(1 === 2){
            dispatch(failedProducts())
        }     
    }
}

// GET A SINGLE PRODUCT
export function getProduct( id ){

  return dispatch => {
  
      dispatch(requestProducts())

      setTimeout(() => {
          dispatch(setProduct( products.filter(obj => { return obj._id === id }) ))  
      }, 300)

      if(1 === 2){
          dispatch(failedProducts())
      }      
  }
}

// CREATE NEW PRODUCT
export function createProduct( data ){

  return dispatch => {
  
      dispatch(requestProducts())

      setTimeout(() => {
          dispatch(setProduct( products ))  
      }, 3000)

      if(1 === 2){
          dispatch(failedProducts())
      }      
  }
}

function setProduct(product) {
  return {
    type: GET_PRODUCT,
    isFetching: false,
    product: product[0]
  }
}



function requestProducts() {
  return {
    type: REQUEST_PRODUCTS,
    isFetching: true
  }
}

function receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    payload: products,
    receivedAt: Date.now()
  }
}

function failedProducts() {
  return {
    type: FAILED_PRODUCTS,
    isFetching: false,
    isError: true
  }
}

// keep product state form update 
export function createProductState (fieldName, value){
  return {
    type: PRODUCT_STATE,
    payload: { fieldName, value }
  }
}