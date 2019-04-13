//src/utils/help_function.js

/**
 * 
 * @param {*} list 
 * @param {*} obj 
 */
export const updateArrayOfObject = (list, obj) => {
    for (var i in list) {
        if (list[i]._id === obj._id) {
           list[i] = obj;
           break; //Stop this loop, we found it!
        }
    }
    return list
}

/**
 * 
 * @param {*} num 
 */
export const checkNumFormatRegex = (num) => {
    const regexFr = /^([0-9]{0,}),?[0-9]?[0-9]?$/gm;
    const regexEn = /^([0-9]{0,})\.?[0-9]?[0-9]?$/gm;

    var fr = new RegExp(regexFr);
    var en = new RegExp(regexEn);
    if( en.test(num) ||  fr.test(num) ){
        var x = parseFloat(num.replace(',', '.')).toFixed(2)

        return x
    }

    return false
}

/**
 * 
 * @param {*} num 
 */
export const convertToNumber = (num) => {
    var locale = localStorage.getItem('locale');
    var formatedNum = num.toLocaleString(locale)
    return formatedNum
}

/**
 * 
 * @param {*} num 
 */
export const cvtNumToUserPref = (num) => {

    var locale = localStorage.getItem('locale');
    var result = '0';

    // Set to number
    num = parseFloat(num);

    if(num !== undefined){
        var numberToString = num.toFixed(2)
        if(locale === 'fr'){
            result = numberToString.replace('.', ',')
        }else{
            result = numberToString
        }
    }

    return result.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * 
 * @param {*} num 
 */
export const cvtToLocale = (num) => {

    var locale = localStorage.getItem('locale');
    if(locale === 'fr'){
        num = num.toString().replace('.', ',')
    }
    return num;
}

export const  removeFromArray = (array, element) => {
    var newArray = [];
    for(var i = 0; i < array.length; i++){
        if(array[i]._id !== element._id){
            newArray.push(array[i])
        }
    }
    return newArray
}

/**
 * 
 * @param list  List of object
 * @param element Object 
 */
export function discountPrice(list, element){

    var obj = list.filter((x) => {   
        if(x.item_id === element._id) { 
            x.discount = parseFloat(element.payload.value)
            x.total = parseFloat(((x.unit_price * x.quantity) - x.discount).toFixed(2));
            return x        
        } 
        return false
    })
    list = Object.assign(obj, list);
    return list;
}

/**
 * Check for duplicate product/service in list_item
 * @param list List of object
 * @param element Object
 */
export function removeDuplicateAndAddQuantity(list, element) {
    var obj = list.filter((x) => {   
        if( x.item_id === element.payload.item_id ) { 
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

/**
 * 
 * @param list List of object
 * @param element Object
 */
export function manageQuantity(list, action){
    var newData = list.map(obj => {
        if(obj.item_id === action.id){
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

/**
 * 
 * @param list List of object
 * @param element Object
 * @param name field name in object
 * @param value new value
 */
export function editObjectInArray (list, obj, name, value) {

    var newList = [];

    for (let i = 0; i < list.length; i++) {
        if(list[i].item_id === obj.item_id){
            list[i][name] = value
        }
        newList.push(list[i])
    }
    return newList
}


/**
 * 
 * @param list List of object
 * @param element Object
 */
export function replaceObjectInArray(list, obj) {
   console.log("LIST", list)
   console.log("OBJ", obj)

    var newList = [];
    for (let i = 0; i < list.length; i++) {
        if(list[i]._id !== obj._id){
            list[i] = obj
        }
        newList.push(list[i])
    }
    return newList
}

