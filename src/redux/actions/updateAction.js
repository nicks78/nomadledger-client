//manager/src/redux/HOC/createAction.js


import axios from 'axios';
import { API_ENDPOINT, apiCall } from '../../utils/constant'
import { requestUpdate, requestFailed  } from './'


// CREATE NEW ITEM
export const updateItem = ( actionType, id ) => {

    return (dispatch, getState) => {
        
        // Set action name
        var obj = actionType.toLowerCase()

        // Set loading time
        dispatch(requestUpdate(actionType));

        // Get current state
        var state = getState().library[obj].tmp_state
        state._id = id

        axios.post(`${API_ENDPOINT}${apiCall(actionType).endPoints.put}`,
            {data: state},
            { headers: {
                    'Content-Type': 'application/json',
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
              if(res.success){
                dispatch(setUpdateItem( actionType, res.item ))  
              }else{
                dispatch(requestFailed(actionType))
              }
        }) 
        .catch(function (error) {
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed(actionType, message));
        })    
    }
  }
  
function setUpdateItem(actionType, item){
    return {
        type: `UPDATE`,
        subtype: actionType,
        isUpdating: false,
        item: item
    }
}