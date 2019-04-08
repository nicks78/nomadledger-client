//src/redux/library/actions/updateAction.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestUpdate, requestFailed  } from './'
import {setNotification} from '../../notification/actions'


// CREATE NEW ITEM
export const updateItem = ( actionType, endPoint ) => {

    return (dispatch, getState) => {
        
        // Set action name
        var model = actionType.toLowerCase()

        // // Set loading time
        dispatch(requestUpdate(actionType));

        // Get current state
        var state = getState().library[model].item

        axios.put(`${API_ENDPOINT}${model}/${endPoint}`,
            {data: state},
            { headers: {
                    'Content-Type': 'application/json',
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setNotification("success_update", "success"))
            dispatch(setUpdateItem( actionType, res.item ))  
        }) 
        .catch(function (error) {
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(setNotification(message, "error"))
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