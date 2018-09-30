//manager/src/redux/HOC/createAction.js


import axios from 'axios';
import { API_ENDPOINT, apiCall } from '../../api/constant'
import { requestCreation, requestFailed  } from './'


// CREATE NEW ITEM
export const createItem = ( actionType ) => {

    return (dispatch, getState) => {
        
        // Set action name
        var obj = actionType.toLowerCase()

        // Get current state
        var state = getState().library[obj].tmp_state

        // // Set loading time
        dispatch(requestCreation(actionType));
        
        axios.post(`${API_ENDPOINT}${apiCall(actionType).endPoints.post}`,
          { data: state },
          { headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token')
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