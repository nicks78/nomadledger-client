//src/redux/library/actions/createAction.js


import axios from 'axios';
import { API_ENDPOINT } from '../../constant'
import { requestCreation, requestFailed, progress } from './initAction'
import { setNotification } from '../../notification/actions'
import { setError } from '../../error/actions'

// CREATE NEW ITEM
export const createItem = (actionType) => {

    return (dispatch, getState) => {

        // Set loading time
        dispatch(requestCreation(actionType));

        // Set action name
        var type = actionType.toLowerCase()

        // Get current state
        var state = getState().library[type].tmp_state

        const formData = new FormData();
        // Set file
        if (state.images)
            for (var x = 0; x < state.images.length; x++) {
                formData.append("files", state.images[x]);
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
                    var p = (progressEvent.loaded / progressEvent.total) * 100
                    dispatch(progress(actionType, parseInt(p, 10)))
                }
            })
            .then(function (response) {
                return response.data
            })
            .then(res => {
                dispatch(setNotification("success_create", "success"))
                dispatch(setCreateItem(actionType, res.item))
            })
            .catch(function (error) {
                dispatch(setError(error));
                dispatch(requestFailed(actionType));
            })
    }
}

export const duplicateItem = (actionType, item) => {
    return (dispatch, getState) => {

        dispatch(requestCreation(actionType));
        // Set action name
        var type = actionType.toLowerCase();
        let data = Object.assign({}, item);
        delete data._id

        const formData = new FormData();

        formData.append('state', JSON.stringify(data));

        axios.post(`${API_ENDPOINT}${type}/create`,
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
                dispatch(setNotification("success_create", "success"))
                dispatch(setCreateItem(actionType, res.item))
            })
            .catch(function (error) {
                dispatch(setError(error));
                dispatch(requestFailed(actionType));
            })
    }
}

function setCreateItem(actionType, item) {
    return {
        type: `CREATE`,
        subtype: actionType,
        isCreating: false,
        item: item
    }
}
