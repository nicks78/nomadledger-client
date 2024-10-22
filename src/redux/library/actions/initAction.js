//src/redux/library/actions/initAction.js



export const requestData = (actionType) => {
    return {
        type: `REQUEST`,
        subtype: actionType,
        isFetching: true,
        isError: false
    }
}

export const requestUpdate = (actionType) => {
    return {
        type: `REQUEST_UPDATE`,
        subtype: actionType,
        isUpdating: true,
        isError: false
    }
}

export const requestCreation = (actionType) => {
    return {
        type: `REQUEST_CREATE`,
        subtype: actionType,
        isCreating: true,
        isError: false
    }
}

export const requestUpload = (actionType) => {
    return {
        type: `REQUEST_UPLOAD`,
        subtype: actionType,
        isUploading: true,
        isError: false
    }
}


export const requestFailed = (actionType) =>  {
    return {
        type: `FAILED`,
        subtype: actionType,
        isFetching: false,
        isCreating: false, 
        isUpdating: false,
        receivedAt: null,
        isError: true
    }
}

export const resetState = (actionType) =>  {
    return {
        type: `RESET`,
        subtype: actionType,
    }
}

export const progress = (actionType, value) =>  {
    return {
        type: `PROGRESS`,
        subtype: actionType,
        isUploading: true,
        value
    }
}