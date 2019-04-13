//src/redux/task/taskReducer.js

const initialState = {
    isCreating: false,
    isFetching: false,
    isError: false,
    item: null,
    list: []
}



const taskReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST_TASK`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `FAILED_TASK`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                isCreating: action.isCreating
            }
        case `RECEIVE_TASK`:
            return  { 
                ...state, 
                isFetching: action.isFetching,
                item: null,
                [action.fieldName]: action.payload
            }
        case `GET_TASK`:
            return  { 
                ...state, 
                isFetching: action.isFetching,
                isError: action.isError,
                item: action.payload
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
        case `RESET_TASK`:
            return initialState
        default:
            return state;
    }
}

export default taskReducer;

function addTaskToList(array, item){
    var newItem = {};
    var c = true;
    for (let i = 0; i < array.length; i++) {
        if(array[i].date.date ===  item.due_date.date){
            array[i].tasks.push(item);
            c = false;
        }
    }

    if(c === true){
        newItem = {
            _id: {
                year: item.due_date.year,
                dayOfMonth: item.due_date.dayOfMonth,
                month: item.due_date.month,
            },
            tasks: [
                {
                    subject: item.subject,
                    short_desc: item.short_desc,
                    label: item.due_date.label,
                    status: item.status,
                    _id: item._id,
                    due_date: item.due_date
                }
            ],
            date: { 
                label: item.due_date.label,
                due_date: item.due_date,
                timestamp: item.due_date.timestamp,
                date: item.due_date.date
            } 
        }
            array.push(newItem);
    }
    return array;
}