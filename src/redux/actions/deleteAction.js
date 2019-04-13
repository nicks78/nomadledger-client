//src/redux/actions/deleteAction.js


import axios from 'axios';
import { API_ENDPOINT, apiCall } from '../../utils/constant'
import { requestFailed  } from '../library/actions'
import {setNotification} from '../notification/actions'
import {setError} from '../error/errorReducer'

// DELETE ITEM
export const deleteItem = ( actionType, id ) => {

    return dispatch => {

        axios({
            method: "delete",
            url: `${API_ENDPOINT}${apiCall(actionType).endPoints.delete}`,
            data:{ _id:  id},
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setNotification("success_delete", "success"))
            dispatch(setDeletedItem( actionType, res.deteledId ))  
        }) 
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        })    
    }
  }
  
function setDeletedItem(actionType, deteledId){
    return {
        type: `DELETE`,
        subtype: actionType,
        deteledId: deteledId
    }
}