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
    var formatedNum = num;
    if(typeof num !== 'number'){
      console.log("YEAH", num)
      var x = num.replace(',', '.');
      formatedNum = parseFloat(x)
    }

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

/**
 * Update price with discount included
 * @param list  List of object
 * @param element Object
 */
export function discountPrice(list, element){
  // Get working object from array
  var el = list.filter((item) => { return item.item_id === element._id });

  // Check != null array
  if(el.length > 0){
    el = el[0];
    var x = element.payload.value === "" ? 0 : element.payload.value
    el.discount = parseInt(x, 10);
    el.total = (el.unit_price - el.discount) * el.quantity

  }
  // Update list items
  var newList = [...list, ...el]

  return newList;
}

/**
 * Check for duplicate product/service in list_item
 * @param list List of object
 * @param element Object
 */
export function removeDuplicateAndAddQuantity(list, element) {
  var newList = [];
  var newObj = list.filter((el) => { return el.item_id === element.payload.item_id })

  // If existing element => update
  if(newObj.length > 0){

    newObj = newObj[0];
    newObj.quantity = newObj.quantity +1;
    newObj.total = parseFloat((newObj.unit_price * newObj.quantity).toFixed(2))
    newList = [...list, ...newObj];

  }else{
    // Update list with new element
    newList = [...list, element.payload]

  }

  return newList;
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
 * Update an object in array
 * @param list Array of object
 * @param element Object
 * @param name field name in object
 * @param value new value
 */
export function editObjectInArray (list, obj, name, value) {

    var newList = list;
    var element = list.filter((el) => { return el.item_id === obj.item_id })
    if(element.length > 0){
      element = element[0];
      element[name] = value;

      newList = [...list, ...element];
    }

    return newList
}


/**
 *
 * @param list List of object
 * @param element Object
 */
export function replaceObjectInArray(list, obj) {

    var newList = [];
    for (let i = 0; i < list.length; i++) {
        if(list[i]._id !== obj._id){
            list[i] = obj
        }
        newList.push(list[i])
    }
    return newList
}
