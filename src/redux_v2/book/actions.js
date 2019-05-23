//src/redux_v2/book/actions.js
import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {history} from '../../routes/history'
import {updateArrayOfObject} from '../../utils/help_function'
import {setNotification} from '../notification/actions'
import {setError} from '../error/actions'

/**
* GET FULL LIST OF documents
*
* @param actionType String
* @param endPoint String
* @param stateName String
*
*/
export function getListBooks(actionType, endPoint, stateName) {
    return async (dispatch, getState) => {
      try{
        const request = await axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/${endPoint}`);
        const res = request.data
        dispatch(receiveDocuments(actionType, res, stateName ))
      }catch(err){
        dispatch(setNotification(message, 'error'))
      }
    }
}


/**
* CREATE A DOC
*
* @param actionType String
* @param endPoint String
* @param stateName String
*
*/
