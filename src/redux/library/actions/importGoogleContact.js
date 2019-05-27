//src/redux/library/actions/importGoogleContact.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestFailed, getItemList  } from './'
import {setNotification} from '../../notification/actions'
import {setError} from '../../error/actions'

// IMPORT CONTACT FROM GOOGLE
export const importGoogleContact = ( actionType, data ) => {

    return async (dispatch, getState) => {
        dispatch(requestUploadContact(actionType))
        try{
            await axios.post(`${API_ENDPOINT}${actionType.toLowerCase()}/import/from-google`, {data});
            // const res = request.data

            dispatch(setNotification("success_create", "success"))
            dispatch(getItemList( actionType, `list?limit=10&skip=0` ))

        }catch(error){
          console.log(error)
          dispatch(setError(error));
          dispatch(requestFailed(actionType));
        }

    }
  }

function requestUploadContact(actionType){
  return {
    type: "UPLOAD_CONTACT",
    subtype: actionType,
    uploadingContact: true,
  }
}
