//manager/src/pages/bookkeeping/common/_helper.js


/**
 * 
 * @param array  List of object
 * @param element Object 
 */
export function discountPrice(list, element){
    var obj = list.filter((x) => {   
        if(x._id === element._id) { 
            x.discount = parseFloat(element.payload.value)
            x.total = parseFloat(((x.unit_price * x.quantity) - x.discount).toFixed(2));
            return x

        
        } 
        return false
    });
    list = Object.assign(obj, list);
    return list;
}

export function removeDuplicateAndAddQuantity(list, element) {
    var obj = list.filter((x) => {   
        if(x._id === element.payload._id) { 
            x.quantity = x.quantity +1; 
            x.total = parseFloat((x.unit_price * x.quantity).toFixed(2))
            return x
        } 
        return false
    });
    
    if(obj.length === 0 ){
        list = [...list, element.payload]
    }else{
        list = Object.assign(obj, list)
    }

    return list
}

export function manageQuantity(list, action){
    var newData = list.map(obj => {
        if(obj._id === action.id){
            if(obj.quantity !== 1 && action.move === "down"){
                obj.quantity = obj.quantity -1;
                obj.total = parseFloat(((obj.unit_price * obj.quantity) - obj.discount ).toFixed(2))
            }else if(action.move === "up"){
                obj.quantity = obj.quantity +1 ;
                obj.total = parseFloat(((obj.unit_price * obj.quantity) - obj.discount).toFixed(2))
            }
            return obj
        }else{
            return obj
        }  
    });

    return newData
}



