// manager/src/redux/HOC/initAction.js



export const requestData = (actionType) => {
    return {
        type: `REQUEST`,
        subtype: actionType,
        isFetching: true,
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


export const requestFailed = (actionType) =>  {
    return {
        type: `FAILED`,
        subtype: actionType,
        isFetching: false,
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