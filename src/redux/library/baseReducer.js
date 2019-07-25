//src/redux/library/baseReducer.js

import {updateArrayOfObject} from '../../utils/help_function'


class BaseState {
    tmp_state = {};
    item = null;
    isUpdating = false;
    receivedAt = null;
    progress = 0;
    isCreating = false;
    isFetching = false;
    isUploading = false;
    isError = false;
    message = '';
    total = 0;
    rowsPerPageOptions = [];
    uploadingContact = false;
    list = []
}



const baseReducer = (state = new BaseState(), action) => {


    switch (action.type) {
        case `REQUEST`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                list: []
            }
        case `REQUEST_CREATE`:
            return  {
                ...state,
                isCreating: action.isCreating,
                isError: action.isError
            }
        case `UPLOAD_CONTACT`:
            return  {
                ...state,
                uploadingContact: action.uploadingContact,
                isError: action.isError
            }

        case `REQUEST_UPLOAD`:
            return  {
                ...state,
                isUploading: action.isUploading,
                isError: action.isError
            }
        case `REQUEST_UPDATE`:
            return  {
                ...state,
                isUpdating: action.isUpdating,
                isError: action.isError
            }
        case `FAILED`:
            return {
                ...state,
                isFetching: action.isFetching,
                message: action.message,
                receivedAt: action.receivedAt,
                isUpdating: action.isUpdating,
                isError: action.isError,
                isCreating: action.isCreating,
                uploadingContact: false
            }

        case `RECEIVE`:
            return  {
                ...state,
                isFetching: action.isFetching,
                list: action.payload,
                receivedAt: action.receivedAt,
                isCreating: false,
                uploadingContact: false
            }

        case `GET`:
            return {
                ...state,
                item: action.item,
                isFetching: action.isFetching,
            }

        case `STATE`:
            return {
                ...state,
                tmp_state: { ...state.tmp_state, [ action.payload.fieldName ] : action.payload.value },
                item: { ...state.item, [ action.payload.fieldName ] : action.payload.value }
            }

        case `CREATE`:
            return {
                ...state,
                isCreating: action.isCreating,
                total: state.total + 1,
                progress: action.value,
                receivedAt: Date.now(),
                tmp_state: {},
                item: null,
                list: [ ...state.list, action.item ]
            }
        case `UPDATE`:
            return {
                ...state,
                progress: action.value,
                isUpdating: action.isUpdating,
                tmp_state: {},
                item: action.item,
                list: updateArrayOfObject(state.list, action.item)
            }
        case `UPDATE_LIST`:
            return {
                ...state,
                list:  state.list.filter( (element) => { return element._id !== action.id }),
                total: state.total -1,
                receivedAt: Date.now(),
            }

        case `PROGRESS`:
            return {
                ...state,
                progress: action.value,
                isUploading: action.isUploading
            }

        case `RESET`:
            return new BaseState()

        case `UPLOAD`:
            return {
                ...state,
                item: action.item,
                isUploading: action.isUploading,
                progress: 0,
            }
        case `TOTAL`:
            return {
                ...state,
                total: action.total,
                isFetching: action.isFetching,
                rowsPerPageOptions: action.rowsPerPageOptions

            }
        default:
            return state;
    }
}



export default baseReducer;
