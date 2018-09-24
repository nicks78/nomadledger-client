//manager/src/pages/service/actions.js


// import axios from 'axios';
import { REQUEST_SERVICES, FAILED_SERVICES, RECEIVE_SERVICES, SERVICE_STATE, GET_SERVICE  } from '../../redux/actionsTypes'


// TMP DATA
import services from '../../FAKE_DATA/services.json'

// GET FULL LIST OF SERVICES
export function getServices( ){

    return dispatch => {

        dispatch(requestServices())

        setTimeout(() => {
            dispatch(receiveServices(services))  
        }, 300)

        if(1 === 2){
            dispatch(failedServices())
        }     
    }
}

// GET A SINGLE SERVICE
export function getService( id ){

  return dispatch => {
  
      dispatch(requestServices())

      setTimeout(() => {
          dispatch(setService( services.filter(obj => { return obj._id === id }) ))  
      }, 300)

      if(1 === 2){
          dispatch(failedServices())
      }      
  }
}

// CREATE NEW SERVICE
export function createProduct( data ){

  return dispatch => {
  
      dispatch(requestServices())

      setTimeout(() => {
          dispatch(setService( services ))  
      }, 3000)

      if(1 === 2){
          dispatch(failedServices())
      }      
  }
}

function setService(service) {
  return {
    type: GET_SERVICE,
    isFetching: false,
    service: service[0]
  }
}



function requestServices() {
  return {
    type: REQUEST_SERVICES,
    isFetching: true
  }
}

function receiveServices(services) {
  return {
    type: RECEIVE_SERVICES,
    payload: services,
    receivedAt: Date.now()
  }
}

function failedServices() {
  return {
    type: FAILED_SERVICES,
    isFetching: false,
    isError: true
  }
}

// keep service state form update 
export function createServiceState (fieldName, value){
  return {
    type: SERVICE_STATE,
    payload: { fieldName, value }
  }
}