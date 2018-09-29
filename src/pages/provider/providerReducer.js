//manager/src/pages/provider/providerReducer.js

import { 
    REQUEST_PROVIDERS, 
    FAILED_PROVIDERS, 
    RECEIVE_PROVIDERS, 
    PROVIDER_STATE, 
    GET_PROVIDER } from '../../redux/actionsTypes'

const initialState = {
  isFetching: false,
  provider: null,
  isError: false,
  listProviders: [],
  receivedAt: null,
  newProvider: {}
}

export default (state = initialState, action) => {
  
  switch (action.type) {
    case REQUEST_PROVIDERS:
        return  { 
            ...state,
            isFetching: true,
          }
    case FAILED_PROVIDERS: 
        return {
            ...state,
            isFetching: false,
            isError: true,
        }
    case RECEIVE_PROVIDERS:
        return  { 
            ...state,
            isFetching: false,
            listProviders: action.payload, 
            receivedAt: action.receivedAt 
        }
    case GET_PROVIDER:
        return  { 
            ...state,
            provider: action.provider,
            isFetching: false,
        }
    case PROVIDER_STATE: 
        return {
            ...state,
            newProvider: { ...state.newProvider, [ action.payload.fieldName] : action.payload.value  }    
        }
    default:
        return state
  }
}
