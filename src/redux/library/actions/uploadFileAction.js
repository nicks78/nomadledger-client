//src/redux/library/actions/uploadFileAction.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestCreation, requestFailed, progress  } from './'


// UPLOAD IMAGE/DOCS TO SERVER
/**
 * 
 * @param actionType // model name
 * @param file  // file to be uploaded 
 * @param id // id of the document if 'null', company_id is the default
 * @param field // name of the field in the document
 * @param oldFile // old file name to be delete
 */
export const uploadFileToServer = ( actionType, file, id, field, oldFile ) => {

    return (dispatch) => {

        var oldfile = '';
        if(oldFile){
            oldfile = oldFile.replace('/docs/', '').replace('/images/', '')
        }

        // Set action name
        var url_path = actionType.toLowerCase() + '/upload?id=' +id+ '&field=' + field +'&oldfile='+ oldfile

        // // Set loading time
        dispatch(requestCreation(actionType));

        const formData = new FormData();

        // Set file
        formData.append("files", file);

        axios.post(`${API_ENDPOINT}${url_path}`,
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
                dispatch(setUploaded( actionType, res.payload ))  
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
  
function setUploaded(actionType, item){
    return {
        type: `UPLOAD`,
        subtype: actionType,
        isCreating: false,
        item: item
    }
}