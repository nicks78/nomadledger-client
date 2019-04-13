//src/redux/library/actions/createAction.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestCreation, requestFailed, progress  } from './'
import {setNotification} from '../../notification/actions'
import {setError} from '../../error/actions'

// CREATE NEW ITEM
export const createItem = ( actionType ) => {

    return (dispatch, getState) => {
        
        // Set action name
        var type = actionType.toLowerCase()

        // Get current state
        var state = getState().library[type].tmp_state

        // // Set loading time
        dispatch(requestCreation(actionType));

        const formData = new FormData();
        // Set file
        if(state.doc)
        for (var x = 0; x < state.doc.length; x++) {
            formData.append("files", state.doc[x]);
        }
        // Set input 
        formData.append('state', JSON.stringify(state));

        axios.post(`${API_ENDPOINT}${type}/create`,
            formData,   
            { 
              headers: {
                'content-type': 'application/form-data'
            },
            onUploadProgress: progressEvent => { // Check progression for upload
                var p =  ( progressEvent.loaded / progressEvent.total ) * 100
                dispatch(progress(actionType, parseInt(p, 10)))
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            dispatch(setNotification("success_create", "success"))
            dispatch(setCreateItem( actionType, res.item ))  
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        })  
    }
  }
  
function setCreateItem(actionType, item){
    return {
        type: `CREATE`,
        subtype: actionType,
        isCreating: false,
        item: item
    }
}