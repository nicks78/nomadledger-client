
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
    var sum = 0;
    if( charges )
    for (let i = 0; i < charges.length; i++) {
        sum += charges[i].subtotal;
    }
    var result = parseFloat(Math.round(sum * 100) / 100);
    return result;
}