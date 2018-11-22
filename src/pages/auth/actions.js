//manager/src/pages/auth/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../../api/constant'



// CREATE NEW ITEM
export const createUser = ( actionType ) => {

    return (dispatch, getState) => {
    
        // Get current state
        var state = getState().auth.state_user

        // // Set loading time
        dispatch(requestUser());

        axios.post(`${API_ENDPOINT}user/create`,
            { data: state },   
            { headers: {
                    'x-access-token': localStorage.getItem('token'),
            }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
              if(res.success){
                dispatch(setCreateUser( res.user ))  
              }else{
                dispatch(requestFailed( res.message ))
              }
        })   
    }
}

function requestUser(){
    return {
        type: `REQUEST_USER`,
        isFetching: true,
    }
}

// function setGetUser( user ){
//     return {
//         type: `GET_USER`,
//         isFetching: false,
//         isLoggedIn: true,
//         user: user
//     }
// }
  
function setCreateUser( user ){
    return {
        type: `CREATE_USER`,
        isFetching: false,
        isLoggedIn: true,
        user: user
    }
}

function requestFailed( message ) {
    return {
        type: `FAILED_USER`,
        isFetching: false,
        isError: true,
        message: message
    }
}

export function createStateUser ( fieldName, value ){
    return {
      type: `STATE_USER`,
      payload: {fieldName, value}
    }
}