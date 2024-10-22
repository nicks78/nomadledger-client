//src/redux/library/actions/uploadFileAction.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestUpload, requestFailed, progress } from './'
import { setNotification } from '../../notification/actions'
import { setError } from '../../error/actions'

// UPLOAD IMAGE/DOCS TO SERVER
/**
 *
 * @param actionType // model name
 * @param file  // file to be uploaded
 * @param id // id of the document if 'null', company_id is the default
 * @param field // name of the field in the document
 * @param oldFile // old file name to be delete
 */
export const uploadFileToServer = (actionType, id, file, oldFileObject) => {

    return (dispatch) => {

        // Set action name
        var url_path = `${actionType.toLowerCase()}/upload-file/${id}`

        // // Set loading time
        dispatch(requestUpload(actionType));

        const formData = new FormData();
        formData.append("oldfile", oldFileObject.path);
        formData.append("files", file);

        axios.post(`${API_ENDPOINT}${url_path}`,
            formData,
            {
                headers: {
                    'content-type': 'application/form-data'
                },
                onUploadProgress: progressEvent => { // Check progression for upload
                    var p = (progressEvent.loaded / progressEvent.total) * 100
                    dispatch(progress(actionType, parseInt(p, 10)))
                }
            })
            .then(function (response) {
                return response.data
            })
            .then(res => {
                dispatch(setNotification("success_uploaded", "success"))
                dispatch(setUploaded(actionType, res.payload))
            })
            .catch(function (error) {
                console.log("ERROR", error.response)
                dispatch(setError(error));
                dispatch(requestFailed(actionType));
            })
    }
}


// UPLOAD IMAGE/DOCS TO SERVER
/**
 *
 * @param actionType // model name
 * @param file  // file to be uploaded
 * @param id // id of the document if 'null', company_id is the default
 * @param field // name of the field in the document
 * @param oldFile // old file name to be delete
 */
export const uploadProductFileToServer = (actionType, file) => {

    return (dispatch, getState) => {

        // Set action name
        var url_path = `${actionType.toLowerCase()}/upload-files`;
        var item = getState().library[actionType.toLowerCase()].item;

        // // Set loading time
        dispatch(requestUpload(actionType));

        const formData = new FormData();
        formData.append("item", JSON.stringify(item));
        formData.append("files", file);

        axios.post(`${API_ENDPOINT}${url_path}`,
            formData,
            {
                headers: {
                    'content-type': 'application/form-data'
                },
                onUploadProgress: progressEvent => { // Check progression for upload
                    var p = (progressEvent.loaded / progressEvent.total) * 100
                    dispatch(progress(actionType, parseInt(p, 10)))
                }
            })
            .then(function (response) {
                return response.data
            })
            .then(res => {
                dispatch(setNotification("success_uploaded", "success"))
                dispatch(setUploaded(actionType, res.payload))
            })
            .catch(function (error) {
                console.log("ERROR", error)

                dispatch(setError(error));
                dispatch(requestFailed(actionType));
            })
    }
}

function setUploaded(actionType, item) {
    return {
        type: `UPLOAD`,
        subtype: actionType,
        isUploading: false,
        item: item
    }
}
