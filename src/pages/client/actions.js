// daytrip/src/screens/city/actions.js


// import axios from 'axios';
import { REQUEST_CLIENTS, FAILED_CLIENTS, RECEIVE_CLIENTS, GET_CLIENT, CLIENT_STATE  } from '../../redux/actionsTypes'


// TMP DATA
import clients from '../../FAKE_DATA/clients.json'

// GET FULL LIST OF CLIENT
export function getClients( ){

    return dispatch => {

        dispatch(requestClients())

        setTimeout(() => {
            dispatch(receiveClients(clients))  
        }, 300)

        if(1 === 2){
            dispatch(failedClients())
        }
            
    }
}

// GET A SINGLE CLIENT
export function getClient( id ){

  return dispatch => {
  
      dispatch(requestClients())

      setTimeout(() => {
          dispatch(setClient( clients.filter(obj => { return obj._id === id }) ))  
      }, 300)

      if(1 === 2){
          dispatch(failedClients())
      }      
  }
}

// CREATE NEW CLIENT
export function createClient( data ){

  return dispatch => {
  
      dispatch(requestClients())

      // var data = {
      //   _id: "2",
      //   firstname: "Eric",
      //   lastname: "Pax",
      //   phone: "0695026075",
      //   email: "nicolas@apx-dev.com",
      //   logo: "https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png",
      //   company: {
      //       name: "APX DEV",
      //       street: "",
      //       city: "",
      //       zip: "",
      //       country: "" 
      //   }
      // }

      setTimeout(() => {
          dispatch(setClient( clients ))  
      }, 3000)

      if(1 === 2){
          dispatch(failedClients())
      }      
  }
}

export function createClientState (fieldName, value){
  return {
    type: CLIENT_STATE,
    payload: { fieldName, value }
  }
}

function setClient(client) {
  return {
    type: GET_CLIENT,
    isFetching: false,
    client: client[0]
  }
}

function requestClients() {
  return {
    type: REQUEST_CLIENTS,
    isFetching: true
  }
}

function receiveClients(clients) {
  return {
    type: RECEIVE_CLIENTS,
    payload: clients,
    receivedAt: Date.now()
  }
}

function failedClients() {
  return {
    type: FAILED_CLIENTS,
    isFetching: false,
    isError: true
  }
}