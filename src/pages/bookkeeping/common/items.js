//manager/src/pages/bookkeeping/common/items.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addRemoveQuantity, removeItem, discountPrice} from '../actions'
import { 
    IconButton, 
    withStyles,
    Table, 
    TableBody, 
    TableHead, 
    TableCell, 
    TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { cvtNumToUserPref, checkNumFormatRegex, convertToNumber } from '../../../utils/help_function'
import { ApxContenEditable } from '../../../components/common'

class Items extends Component {
    
    
    getInput = (event, id) => {
        var fieldName = event.target.id
        var value = event.target.innerText

        // Update store
        if(!checkNumFormatRegex(value)){
            alert('Error format');
            return;
        }
        this.props.discountPrice( this.props.reducer, id, fieldName, convertToNumber(value)) 
    }

    totalHT = (listItems) => {
        var vat = this.props.newData.vat ? this.props.newData.vat.indice : 0
        var total = {
            vat : 0,
            ht: 0,
            ttc: 0
        };

        for(var i = 0; i < listItems.length; i++){
            total.ht = parseFloat( (total.ht + listItems[i].total).toFixed(2)) 
        }

       var vat_value =  parseFloat((total.ht /100 * vat ).toFixed(2))
       total.vat = vat_value;

       var ttc = parseFloat((total.ht + total.vat ).toFixed(2))
       total.ttc = ttc;

       // Store result to redux state
        
        return  total;
    }


    render() {

    const { newData, listItems, reducer, classes, locale } = this.props
    return (
        <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
        <TableRow>
            <TableCell>Réference</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Unit Price { newData.currency && newData.currency.value }</TableCell>
            <TableCell style={{textAlign: "center"}}>Quantity</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">Total { newData.currency && newData.currency.value }</TableCell>
            <TableCell align="center">Remove</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            {   
            listItems.map(( item, index) => {
                
                return  <TableRow key={index} className={classes.tableRow}>
                            <TableCell>{ item.tmp.ref}</TableCell>
                            <TableCell>{ item.tmp.name }</TableCell>
                            <TableCell>{ cvtNumToUserPref(item.unit_price)}</TableCell>
                            <TableCell style={{textAlign: "center"}}>
                            
                            <div className={ classes.quantity }>
                                <ArrowDropDownIcon className={ classes.btnArrow} onClick={ () => { this.props.addRemoveQuantity(reducer, item._id, "down")}} />
                                    <span>{ item.quantity }</span>
                                <ArrowDropUpIcon className={ classes.btnArrow} onClick={ () => { this.props.addRemoveQuantity(reducer, item._id, "up")}} />
                            </div>
                            
                            </TableCell>
                            <TableCell><ApxContenEditable value={cvtNumToUserPref(item.discount)} id={item._id} actionInput={this.getInput} name="discount" /></TableCell>
                            <TableCell>{ cvtNumToUserPref(item.total) }</TableCell>
                            <TableCell ><IconButton onClick={ () => { this.props.removeItem(reducer, item)}} ><DeleteIcon color="secondary"/></IconButton></TableCell>
                        </TableRow>

            })
            }
            <TableRow>
                <TableCell>{locale.table.subtotal}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{ this.totalHT(listItems).ht } { newData.currency && newData.currency.value }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>{locale.table.vat}</TableCell>
                <TableCell align="right">{ newData.vat ? newData.vat.value : "0%" } </TableCell>
                <TableCell align="right">{ this.totalHT(listItems).vat } { newData.currency && newData.currency.value }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}>{ locale.table.total_ttc }</TableCell>
                <TableCell align="right">{ this.totalHT(listItems).ttc } { newData.currency && newData.currency.value }</TableCell>
            </TableRow>
           
        </TableBody>
    </Table>

    )
  }
}

const styles = theme => ({
    table: {
        minWidth: 700,
    },
    tableHead: {
        backgroundColor: "rgb(238,238,238)"
    },
    tableRow: {
        height: 28,
    },
    quantity: {
        display: 'inline-block'
    },
    btnArrow: {
        cursor: 'pointer'
    }
})

const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale 
    }
}
const StyledItems = withStyles(styles)(Items)

export default connect(mapStateToProps, {  addRemoveQuantity, removeItem, discountPrice })(StyledItems);