//src/redux/task/taskReducer.js

const initialState = {
    isCreating: false,
    isFetching: false,
    isError: false,
    message: '',
    item: null,
    list: []
}



const taskReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST_TASK`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isCreating: action.isCreating,
                isError: action.isError
            }
        case `FAILED_TASK`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                isCreating: action.isCreating,
                message: action.message
            }
        case `RECEIVE_TASK`:
            return  { 
                ...state, 
                isFetching: action.isFetching,
                list: action.payload
            }
        case `STATE_TASK`:
            return  { 
                ...state,
                item: { ...state.item, [ action.payload.fieldName ] : action.payload.value }
            }
        case `CREATED_TASK`:
            return {
                ...state,
                item: null,
                list: addTaskToList(state.list, action.payload)
            }
        case `UPDATED_TASK`:
            return {
                ...state,
                list: addTaskToList(state.list, action.payload)
            }
        default:
            return state;
    }
}

export default taskReducer;

function addTaskToList(array, item){
    for (let i = 0; i < array.length; i++) {
        if(array[i].date.date ===  item.due_date.date){
            array[i].tasks.push(item);
        }
    }
    return array;
}