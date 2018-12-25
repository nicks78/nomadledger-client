

// Update array of object
export const updateArrayOfObject = (list, obj) => {
    for (var i in list) {
        if (list[i]._id === obj._id) {
           list[i] = obj;
           break; //Stop this loop, we found it!
        }
    }
    return list
}


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

export const convertToNumber = (num) => {
    var res ;
    if(typeof num === 'string'){
        res = num.replace(',', '.')
    }
    res = parseFloat(res)
    return res;
}


export const cvtNumToUserPref = (num) => {

    var locale = localStorage.getItem('locale');
    var stringNumber = num.toString()
    var result = '';

    if(locale === 'fr'){
        result = stringNumber.replace('.', ',')
    }else{
        result = stringNumber
    }

    return result.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
