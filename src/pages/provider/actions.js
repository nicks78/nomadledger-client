//manager/src/pages/product/actions.js


// import axios from 'axios';
import { 
  REQUEST_PROVIDERS, 
  FAILED_PROVIDERS, 
  RECEIVE_PROVIDERS, 
  PROVIDER_STATE, 
  GET_PROVIDER  } from '../../redux/actionsTypes'


// TMP DATA
import providers from '../../FAKE_DATA/providers.json'

// GET FULL LIST OF PROVIDERS
export function getProviders( ){

    return dispatch => {

        dispatch(requestProviders())

        setTimeout(() => {
            dispatch(receiveProviders(providers))  
        }, 300)

        if(1 === 2){
            dispatch(failedProviders())
        }     
    }
}

// GET A SINGLE PRODUCT
export function getProvider( id ){

  return dispatch => {
  
      dispatch(requestProviders())

      setTimeout(() => {
          dispatch(setProvider( providers.filter(obj => { return obj._id === id }) ))  
      }, 300)

      if(1 === 2){
          dispatch(failedProviders())
      }      
  }
}

// CREATE NEW PROVIDER
export function createProvider( data ){

  return dispatch => {
  
      dispatch(requestProviders())

      setTimeout(() => {
          dispatch(setProvider( providers ))  
      }, 3000)

      if(1 === 2){
          dispatch(failedProviders())
      }      
  }
}

function setProvider(provider) {
  return {
    type: GET_PROVIDER,
    isFetching: false,
    provider: provider[0]
  }
}



function requestProviders() {
  return {
    type: REQUEST_PROVIDERS,
    isFetching: true
  }
}

function receiveProviders(providers) {
  return {
    type: RECEIVE_PROVIDERS,
    payload: providers,
    receivedAt: Date.now()
  }
}

function failedProviders() {
  return {
    type: FAILED_PROVIDERS,
    isFetching: false,
    isError: true
  }
}

// keep product state form update 
export function createProviderState (fieldName, value){
  return {
    type: PROVIDER_STATE,
    payload: { fieldName, value }
  }
}