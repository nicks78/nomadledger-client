//src/redux/library/actions/updateAction.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestUpdate, requestFailed  } from './'
import {setNotification} from '../../notification/actions'
import {setError} from '../../error/actions'

// CREATE NEW ITEM
export const updateItem = ( actionType, endPoint ) => {

    return (dispatch, getState) => {
        
        // Set action name
        var model = actionType.toLowerCase()

        // // Set loading time
        dispatch(requestUpdate(actionType));

        // Get current state
        var state = getState().library[model].item

        if(state.contact_id){
            state = state.contact_id
        }

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
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
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