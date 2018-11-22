//manager/src/redux/HOC/createAction.js


import axios from 'axios';
import { API_ENDPOINT, apiCall } from '../../api/constant'
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
                    'x-access-token': localStorage.getItem('token'),
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