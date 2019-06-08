//src/redux/task/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {setError} from '../error/actions'


// GET AUTHENTICATED
export function getAllContract(endPoint, fieldName){

    return async dispatch => {

      dispatch(requestContract());

      try{
          const request = await axios.get(`${API_ENDPOINT}${endPoint}`)
          const res = request.data;

          dispatch(receiveContract( res.payload, fieldName ))

      }catch(error){
        dispatch(setError(error));
        dispatch(requestFailed());
      }
    }
}


export function requestContract(){
    return {
        type: "REQUEST_CONTRACT",
        isFetching: true,
        isError: false,
        message: "",
    }
}

export function receiveContract(items, fieldName){
    return {
        type: "RECEIVE_CONTRACT",
        isFetching: false,
        payload: items,
        fieldName
    }
}


export function requestFailed(){
    return {
        type: "FAILED_CONTRACT",
        isError: true,
        isFetching: false
    }
}

export function resetContract (){
    return {
      type: `RESET_CONTRACT`
    }
}
