//manager/src/pages/service/serviceReducer.js

import { 
    REQUEST_SERVICES, 
    FAILED_SERVICES, 
    RECEIVE_SERVICES, 
    SERVICE_STATE, 
    GET_SERVICE } from '../../redux/actionsTypes'

const initialState = {
  isFetching: false,
  service: null,
  isError: false,
  listServices: [],
  receivedAt: null,
  newService: {}
}

export default (state = initialState, action) => {
  
  switch (action.type) {
    case REQUEST_SERVICES:
        return  { 
            ...state,
            isFetching: true,
          }
    case FAILED_SERVICES: 
        return {
            ...state,
            isFetching: false,
            isError: true,
        }
    case RECEIVE_SERVICES:
        return  { 
            ...state,
            isFetching: false,
            listServices: action.payload, 
            receivedAt: action.receivedAt 
        }
    case GET_SERVICE:
        return  { 
            ...state,
            service: action.service,
            isFetching: false,
        }
    case SERVICE_STATE: 
        return {
            ...state,
            newService: { ...state.newService, [ action.payload.fieldName] : action.payload.value  }    
        }
    default:
        return state
  }
}
