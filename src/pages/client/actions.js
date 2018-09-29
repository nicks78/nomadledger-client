// daytrip/src/screens/city/actions.js


import axios from 'axios';
import { API_ENDPOINT, API_ADRESSES } from '../../api/constant'
import { REQUEST_CLIENTS, FAILED_CLIENTS, RECEIVE_CLIENTS, GET_CLIENT, CLIENT_STATE, CREATE_CLIENT  } from '../../redux/actionsTypes'


// TMP DATA
import clients from '../../FAKE_DATA/clients.json'

// GET FULL LIST OF CLIENT
export function getClients( ){

    return dispatch => {

        dispatch(requestClients())

        axios.get(`${API_ENDPOINT}${API_ADRESSES.GET_CLIENT}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
              'x-access-token': localStorage.getItem('token')
          }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
          if(res.success){
              dispatch(receiveClients( res.payload ))  
              }else{
                dispatch(failedClients())
              }
        })              
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


function setClient(client) {
  return {
    type: GET_CLIENT,
    isFetching: false,
    client: client[0]
  }
}



// CREATE NEW CLIENT
export function createClient( ){

  return (dispatch, getState) => {
  
      dispatch(requestClients());

      axios.post(`${API_ENDPOINT}${API_ADRESSES.CLIENTS}/create`,
        { data: getState().client.newClient },
        { headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        }
      })
      .then(function (response) { 
          return response.data
      }) 
      .then( res => {
            if(res.success){
              dispatch(setCreateClient( res.client ))  
            }else{
              dispatch(failedClients())
            }
      })   
  }
}

function setCreateClient(client){
  return {
      type: CREATE_CLIENT,
      isFetching: false,
      client: client
  }
}

export function createClientState (fieldName, value){
  return {
    type: CLIENT_STATE,
    payload: { fieldName, value }
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