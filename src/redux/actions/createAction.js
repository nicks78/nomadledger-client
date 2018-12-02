//manager/src/redux/HOC/createAction.js


import axios from 'axios';
import { API_ENDPOINT, apiCall } from '../../utils/constant'
import { requestCreation, requestFailed, progress  } from './'


// CREATE NEW ITEM
export const createItem = ( actionType ) => {

    return (dispatch, getState) => {
        
        // Set action name
        var obj = actionType.toLowerCase()

        // Get current state
        var state = getState().library[obj].tmp_state

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

        axios.post(`${API_ENDPOINT}${apiCall(actionType).endPoints.post}`,
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
              if(res.success){
                dispatch(setCreateItem( actionType, res.item ))  
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
  
function setCreateItem(actionType, item){
    return {
        type: `CREATE`,
        subtype: actionType,
        isCreating: false,
        item: item
    }
}