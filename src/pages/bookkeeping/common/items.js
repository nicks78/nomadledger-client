//manager/src/pages/bookkeeping/common/items.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addRemoveQuantity, removeItem, editItem, createState, discountPrice} from '../actions'
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
            alert('Error format du numéro');
            return;
        }
        this.props.discountPrice( this.props.reducer, id, fieldName, convertToNumber(value)) 
    }

    totalHT = (listItems) => {
        var vat = this.props.newData.vat ? this.props.newData.vat.indice : 0
        var total = { vat : 0, ht: 0, ttc: 0 };

        for(var i = 0; i < listItems.length; i++){
            total.ht = parseFloat( (total.ht + listItems[i].total).toFixed(2)) 
        }
        var vat_value =  parseFloat((total.ht /100 * vat ).toFixed(2))
        total.vat = vat_value;
       
        var ttc = parseFloat((total.ht + total.vat ).toFixed(2));
        total.ttc = ttc;
        
        return  total;
    }


    render() {

    const { newData, listItems, reducer, classes, locale } = this.props

    
    return (
        <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
        <TableRow>
            <TableCell>{locale.table.ref}</TableCell>
            <TableCell align="right">{locale.table.description}</TableCell>
            <TableCell align="right">{locale.table.unit_price} { newData.currency && newData.currency.value }</TableCell>
            <TableCell style={{textAlign: "center"}}>{locale.table.quantity}</TableCell>
            <TableCell align="right">{locale.table.discount}</TableCell>
            <TableCell align="right">{locale.table.total} { newData.currency && newData.currency.value }</TableCell>
            <TableCell align="right">{locale.table.remove}</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            {   
            listItems.map(( item, index) => {
                
                return  <TableRow key={index} className={classes.tableRow}>
                            <TableCell>{locale.table[item.type]}-{ item.tmp.ref}</TableCell>
                            <TableCell className={ classes.TableCell }><ApxContenEditable value={ item.desc } id={item.item_id} actionInput={(event) => { this.props.editItem(reducer, item, 'desc' , event.target.innerText ) }} name="desc" /></TableCell>
                            <TableCell>{ cvtNumToUserPref(item.unit_price)}</TableCell>
                            <TableCell style={{textAlign: "center"}}>
                            
                            <div className={ classes.quantity }>
                                <ArrowDropDownIcon className={ classes.btnArrow} onClick={ () => { this.props.addRemoveQuantity(reducer, item.item_id, "down")}} />
                                    <span>{ item.quantity }</span>
                                <ArrowDropUpIcon className={ classes.btnArrow} onClick={ () => { this.props.addRemoveQuantity(reducer, item.item_id, "up")}} />
                            </div>
                            
                            </TableCell>
                            <TableCell><ApxContenEditable value={cvtNumToUserPref(item.discount)} id={item.item_id} actionInput={this.getInput} name="discount" /></TableCell>
                            <TableCell>{ cvtNumToUserPref(item.total) }</TableCell>
                            <TableCell ><IconButton onClick={ () => { this.props.removeItem(reducer, item)}} ><DeleteIcon color="secondary"/></IconButton></TableCell>
                        </TableRow>

            })
            }           
        </TableBody>

        <TableBody>
        <TableRow>
                <TableCell rowSpan={3}></TableCell>
                <TableCell colSpan={3} rowSpan={3}></TableCell>
                <TableCell className={ classes.TableCell } colSpan={2}><b>{locale.table.subtotal}</b></TableCell>
                <TableCell align="right"><b>{ cvtNumToUserPref(this.totalHT(listItems).ht) } { newData.currency && newData.currency.value }</b></TableCell>
            </TableRow>
            <TableRow>
                <TableCell><b>{locale.table.vat}</b></TableCell>
                <TableCell align="right"><b>{ newData.vat ? newData.vat.value : "0%" }</b> </TableCell>
                <TableCell align="right"><b>{ this.totalHT(listItems).vat } { newData.currency && newData.currency.value }</b></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}><b>{ locale.table.total_ttc }</b></TableCell>
                <TableCell align="right"><b>{ this.totalHT(listItems).ttc } { newData.currency && newData.currency.value }</b></TableCell>
            </TableRow>
        </TableBody>
    </Table>

    )
  }
}

const styles = theme => ({
    table: {
        minWidth: 700,
        border: '1px solid rgb(238,238,238)',
        
    },
    tableHead: {
        backgroundColor: "rgb(238,238,238)"
    },
    tableRow: {
        height: 28,
        
    },
    TableCell: {
        maxWidth: '35px',
        borderLeft:'1px solid rgba(224, 224, 224, 1)',
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

export default connect(mapStateToProps, {  addRemoveQuantity, removeItem, editItem, createState, discountPrice })(StyledItems);