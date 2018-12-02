//manager/src/redux/HOC/newStateAction.js

// UPDATE APPLICATION STATE

export function createState ( actionType, fieldName, value ){
    return {
      type: `STATE`,
      subtype: actionType,
      payload: {fieldName, value}
    }
}

export function resetState ( actionType ){
  return {
    type: `RESET_STATE`,
    subtype: actionType,
    payload: { addresses: {}  }
  }
}