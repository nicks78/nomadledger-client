//manager/src/pages/bookkeeping/common/items.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addRemoveQuantity, removeItem, editItem, discountPrice} from '../../../redux/book/itemActions'
import {
    IconButton,
    withStyles,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { cvtNumToUserPref } from '../../../utils/help_function'
import ApxContenEditable from '../../../components/common/contentEditable'
import EditIcon from '@material-ui/icons/EditOutlined'



class Items extends Component {


    // Update discount price
    getInput = (event, id) => {
        var fieldName = event.target.id
        var value = event.target.value

        this.props.discountPrice( this.props.reducer, id, fieldName, value)
    }

    // Calcul all VAT / Total / Total HT
    totalHT = (listItems) => {
        var vat = this.props.newData.vat ? this.props.newData.vat.indice : 0
        var total = { vat : 0, ht: 0, ttc: 0 };

        total.ht = listItems.reduce((accumulator, currentValue) => { return accumulator + currentValue.total  }, 0)

        var vat_value =  parseFloat((total.ht /100 * vat ).toFixed(2))
        total.vat = vat_value;

        var ttc = parseFloat((total.ht + total.vat ).toFixed(2));
        total.ttc = ttc;

        return  total;
    }


    render() {

    const { newData, listItems, reducer, classes, locale } = this.props

    return (
      <div>
        <div style={{overflowX: "auto"}}>
        <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
        <TableRow>
            <TableCell>{locale.wording.ref}</TableCell>
            <TableCell variant="head" className={classes.contentEditable}>{locale.wording.description}&nbsp;<EditIcon className={classes.icon} /></TableCell>
            <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.unit_price}&nbsp;{ newData.currency && newData.currency.value }</TableCell>
            <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.quantity}&nbsp;<EditIcon className={classes.icon} /></TableCell>
            <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.discount_unit}&nbsp;<EditIcon className={classes.icon} /></TableCell>
            <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.total} { newData.currency && newData.currency.value }</TableCell>
            <TableCell>{locale.wording.remove}</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            {
            listItems.map(( item, index) => {
                return  <TableRow key={index} className={classes.tableRow}>
                            <TableCell>{locale.wording[item.onModel].toUpperCase()}-{ item.ref}</TableCell>
                            <TableCell className={ classes.contentEditable }><ApxContenEditable value={ item.desc || "" } length="40"  id={item.item_id} actionInput={(event) => { this.props.editItem(reducer, item, 'desc' , event.target.value ) }} name="desc" /></TableCell>
                            <TableCell>{ cvtNumToUserPref(item.unit_price)}</TableCell>
                            <TableCell className={classes.tablenoWrap}>

                            <div className={ classes.quantity }>
                                <ArrowDropDownIcon className={ classes.btnArrow} onClick={ () => { this.props.addRemoveQuantity(reducer, item.item_id, "down")}} />
                                    <span>{ item.quantity }</span>
                                <ArrowDropUpIcon className={ classes.btnArrow} onClick={ () => { this.props.addRemoveQuantity(reducer, item.item_id, "up")}} />
                            </div>

                            </TableCell>
                            <TableCell>
                              <ApxContenEditable value={item.discount} length="10" id={item.item_id} actionInput={this.getInput} name="discount" />
                            </TableCell>
                            <TableCell className={classes.tablenoWrap}>{ cvtNumToUserPref(item.total) }</TableCell>
                            <TableCell ><IconButton onClick={ () => { this.props.removeItem(reducer, item)}} ><DeleteIcon style={{ color: 'red' }}/></IconButton></TableCell>
                        </TableRow>

            })
            }
        </TableBody>
    </Table>
    </div>
    <div className={ classes.sumWrapper}>

        <Typography variant="body1" className={ classes.sum }>
          <b style={{ marginLeft: 24 }}>{locale.wording.subtotal}</b>
          <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(this.totalHT(listItems).ht) } { newData.currency && newData.currency.value }</b></span>
        </Typography>
        <Typography variant="body1" className={ classes.sum } style={{backgroundColor: "white"}}>
          <b style={{ marginLeft: 24 }}>{locale.wording.vat}&nbsp;{ newData.vat ? newData.vat.value : "0%" }</b>
          <span className={ classes.sumSpan }><b>{ this.totalHT(listItems).vat } { newData.currency && newData.currency.value }</b></span><br />
          <span style={{ marginLeft: 24, fontSize: 10 }}>{ newData.vat && newData.vat["vat_terms_" + localStorage.getItem('locale')] }</span>
        </Typography>
        <Typography variant="body1" className={ classes.sum }>
          <b style={{ marginLeft: 24 }}>{locale.wording.total_ttc}</b>
          <span className={ classes.sumSpan }><b>{ this.totalHT(listItems).ttc } { newData.currency && newData.currency.value }</b></span>
        </Typography>
    </div>
  </div>

    )
  }
}

const styles = theme => ({
    table: {
        minWidth: 700,
        boderRadius: 4,
        border: '1px solid rgb(238,238,238)',

    },
    tableHead: {
        backgroundColor: "rgb(238,238,238)",

    },
    tablenoWrap: {
        whiteSpace: "nowrap",

    },
    tableRow: {
        height: 28,
    },
    contentEditable: {
        whiteSpace: "nowrap",
        minWidth: 40,
        padding: 0
    },
    tableCell: {
        borderLeft:'1px solid rgba(224, 224, 224, 1)',
        fontWeight: 500
    },
    quantity: {
        display: 'inline-block'
    },
    btnArrow: {
        cursor: 'pointer'
    },
    icon: {
      fontSize: 12,
      // color: theme.palette.primary.light
    },
    sum: {
        backgroundColor: "rgb(238,238,238)",
        width: "100%",
        paddingTop: 15,
        paddingBottom: 15
    },
    sumSpan: {
      marginRight: 24,
      float: "right"
    },
    sumWrapper: {
      marginTop: 24,
      float: "right",
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 12
      }
    }
})

const mapStateToProps = (state) => {
    return {
        locale: state.locale.locale
    }
}
const StyledItems = withStyles(styles)(Items)

export default connect(mapStateToProps, {  addRemoveQuantity, removeItem, editItem, discountPrice })(StyledItems);
