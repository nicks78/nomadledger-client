//src/redux/account/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import { initLocale } from '../locale/actions'
import { setNotification } from '../notification/actions'
import { setError } from '../error/actions'


/**
 * GET A SINGLE ITEM
 * @param actionType
 *
 */
export function getAccount(actionType) {

    return async dispatch => {

        dispatch(requestData(actionType))

        try {
            const request = await axios.get(`${API_ENDPOINT}${actionType.toLowerCase()}/infos-${actionType.toLowerCase()}`);
            const res = request.data;
            if (actionType === "COMPANY") {
                dispatch(initLocale(res.payload.locale || "fr"))
            }

            dispatch(setAccount(actionType, res.payload))
        } catch (error) {
            dispatch(setError(error));
            dispatch(requestFailed(actionType));
        }
    }
}

/**
 * UPDATE DOCUMENT
 * @param actionType
 *
 */
export function updateDocument(actionType) {

    return async (dispatch, getState) => {

        var data = getState().account[actionType.toLowerCase()].tmp_state;

        if (Object.keys(data).length > 0) {

            try {
                const request = await axios.put(`${API_ENDPOINT}${actionType.toLowerCase()}/update/infos/${actionType.toLowerCase()}`, { data });
                const res = request.data;

                dispatch(setNotification("success_update", "success"))
                dispatch(setAccount(actionType, res.payload))

            } catch (error) {
                dispatch(setError(error));
                dispatch(requestFailed(actionType));
            }
        } else {
            return null
        }
    }
}

// PUSH - PULL  DOCUMENT
/**
 * @param actionType
 *
 */
export function pushToDocument(actionType, data, endPoint) {

    return (dispatch) => {
        if (Object.keys(data).length > 0) {

            if (data.indice) data.indice = parseFloat(data.indice)

            axios.put(`${API_ENDPOINT}${endPoint}${actionType.toLowerCase()}`, {
                data: data
            })
                .then(function (response) {
                    return response.data
                })
                .then(res => {
                    dispatch(setNotification("success_update", "success"))
                    dispatch(setAccount(actionType, res.payload))
                })
                .catch(function (error) {
                    dispatch(setError(error));
                    dispatch(requestFailed(actionType));
                })
        } else {
            return null
        }
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
export const uploadFileToServer = (actionType, file, field, oldFileObject) => {

    return (dispatch) => {

        dispatch(uploading(actionType))

        // Set File & apiEndPoint
        var url_path = `${actionType.toLowerCase()}/upload-file?model=${actionType.toLowerCase()}`
        const formData = new FormData();
        formData.append("oldfile", oldFileObject.path);
        formData.append('field', field)
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
                dispatch(setAccount(actionType, res.payload))
            })
            .catch(function (error) {
                dispatch(setError(error));
                dispatch(requestFailed(actionType));
            })
    }
}


// UPDATE PASSWORD
/**
 * @param password
 *
 */
export const updatePassword = (email) => {

    return (dispatch) => {

        dispatch(requestPassword(true))

        axios.post(`${API_ENDPOINT}auth/forgot-password`,
            { email: email },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(function (response) {
                return response.data
            })
            .then(res => {
                dispatch(setNotification("request_reset_pw", "success"));
                dispatch(requestPassword(false))
            })
            .catch(function (error) {
                dispatch(requestPassword(false))
                dispatch(setError(error));
                dispatch(requestFailed("USER"));
            })
    }
}


export function requestPassword(bool) {
    return {
        type: `REQUEST_PASSWORD`,
        subtype: "USER",
        requestPW: bool
    }
}

export function createState(actionType, fieldName, value) {
    return {
        type: `STATE`,
        subtype: actionType,
        payload: { fieldName, value }
    }
}

export function resetState(actionType) {
    return {
        type: `RESET_STATE`,
        subtype: actionType
    }
}

export function uploading(actionType) {
    return {
        type: `UPLOADING`,
        subtype: actionType,
        isUploading: true,
    }
}


function requestData(actionType) {
    return {
        type: `REQUEST`,
        subtype: actionType,
        isFetching: true,
    }
}


export function setAccount(actionType, item) {

    return {
        type: `GET`,
        isFetching: false,
        subtype: actionType,
        isError: false,
        isUploading: false,
        item: item,
        receivedAt: Date.now()
    }
}

function requestFailed(actionType) {
    return {
        type: `FAILED`,
        isFetching: false,
        subtype: actionType,
        isUploading: false,
        isError: true
    }
}

export const progress = (actionType, value) => {
    return {
        type: `PROGRESS`,
        subtype: actionType,
        value
    }
}
