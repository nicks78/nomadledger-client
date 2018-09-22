


// daytrip/src/screens/city/cityReducer.js

import { REQUEST_CLIENTS, FAILED_CLIENTS, RECEIVE_CLIENTS, GET_CLIENT, CREATE_CLIENT } from '../../redux/actionsTypes'


const initialState = {
  isFetching: false,
  client: null,
  isError: false,
  listClients: [],
  receivedAt: null
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
    case CREATE_CLIENT: 
        return {
            ...state,
            listClients: action.payload,
            isFetching: false,
        }
    default:
        return state
  }
}
