
export function sumItem(listItems){
    var ht = listItems.reduce((accumulator, currentValue) => { return accumulator + currentValue.total  }, 0)

    return ht;
}

export function calculVat(sum, vatObject){
    var vat = vatObject ? vatObject.indice : 0;
    var vat_value =  parseFloat((sum /100 * vat ).toFixed(2))

    return vat_value;
}

export function sumCharges(charges){
    var sum = charges || 0;
    if(typeof charges === "array")
    for (let i = 0; i < charges.length; i++) {
        sum += charges[i].subtotal;
    }
    return sum;
}