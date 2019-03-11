//src/redux/actions/deleteAction.js


import axios from 'axios';
import { API_ENDPOINT, apiCall } from '../../utils/constant'
import { requestFailed  } from './'


// CREATE NEW ITEM
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
            dispatch(setDeletedItem( actionType, res.deteledId ))  
        }) 
        .catch(function (error) {
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed(actionType, message));
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