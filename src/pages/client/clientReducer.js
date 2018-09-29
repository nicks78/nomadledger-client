


// daytrip/src/screens/city/cityReducer.js

import { REQUEST_CLIENTS, FAILED_CLIENTS, RECEIVE_CLIENTS, GET_CLIENT, CLIENT_STATE, CREATE_CLIENT } from '../../redux/actionsTypes'


const initialState = {
  isFetching: false,
  client: null,
  isError: false,
  listClients: [],
  receivedAt: null,
  newClient: {}
}

export default (state = initialState, action) => {
  
  switch (action.type) {
    case REQUEST_CLIENTS:
        return  { 
            ...state,
            isFetching: true,
          }
    case FAILED_CLIENTS: 
        return {
            ...state,
            isFetching: false,
            isError: true,
        }
    case RECEIVE_CLIENTS:
        return  { 
            ...state,
            isFetching: false,
            listClients: action.payload, 
            receivedAt: action.receivedAt 
        }
    case GET_CLIENT: 
        return {
            ...state,
            client: action.client,
            isFetching: false,
        }
    case CLIENT_STATE: 
        return {
            ...state,
            newClient: { ...state.newClient, [ action.payload.fieldName] : action.payload.value  }    
        }
    case CREATE_CLIENT:
        return {
            ...state,
            isFetching: action.isFetching,
            newClient: {},
            listClients: [ ...state.listClients, action.client ]
        }
    default:
        return state
  }
}
