//manager/src/pages/bookkeeping/common/items.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addRemoveQuantity, removeItem, editItem, discountPrice} from '../../../redux/book/itemActions'
import { createState } from '../../../redux/book/actions'
import {
    IconButton,
    withStyles,
    Table,
    TableBody,
    TableHead,
    TextField,
    TableCell,
    Checkbox,
    InputAdornment,
    TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { cvtNumToUserPref, checkNumFormatRegex } from '../../../utils/help_function'
import ApxContenEditable from '../../../components/common/contentEditable'
import EditIcon from '@material-ui/icons/EditOutlined'


class Items extends Component {


    // Update discount price
    getInput = (event, id) => {
        var fieldName = event.target.id
        var value = event.target.value

        this.props.discountPrice( this.props.reducer, id, fieldName, value)
    }

    setDeposit = (e) => {
      var vat = this.props.newData.vat ? this.props.newData.vat.indice : 0;
      
      var value = parseFloat(e.target.value.replace(",", ".") || 0)

      this.props.createState(this.props.reducer, "deposit_amount", e.target.value)
      this.props.createState(this.props.reducer, "deposit", true)

      var vat_value =  (value /100) * vat 

      // this.props.createState(this.props.reducer, "balance_due", parseFloat((total).toFixed(2)) - parseFloat((value).toFixed(2))   )
      this.props.createState(this.props.reducer, "net_to_pay", value)
      this.props.createState(this.props.reducer, "vat_value", vat_value )
    }

    handleCheckBox = (e) => {
      var name = e.target.name;

      if(name === "deposit"){
        this.props.createState(this.props.reducer, "net_to_pay", 0)
        this.props.createState(this.props.reducer, "vat_value", 0 )
        this.props.createState(this.props.reducer, "deposit", e.target.checked )
        this.props.createState(this.props.reducer, "balance", false )
      }

      if(name === "balance"){
        var total = this.props.newData.subtotal - this.props.newData.charges
        this.props.createState(this.props.reducer, "balance", e.target.checked)
        this.props.createState(this.props.reducer, "deposit_amount", 0)
        this.props.createState(this.props.reducer, "deposit", false )
        this.props.createState(this.props.reducer, "net_to_pay", total)
      }

      
    }


    render() {

    const { newData, listItems, reducer, classes, locale } = this.props;
    const vat_terms =  newData.vat && newData.vat.vat_terms_en ? <span style={{ fontSize: 10 }}><br />{ newData.vat && newData.vat["vat_terms_" + localStorage.getItem('locale')] }</span> : null
    const canBeUpdated = newData.quote_id || newData.refund_id ? false : true

      console.log("BALANCE", newData)

    return (
      <div>
        
        <div style={{overflowX: "auto"}}>
        <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <TableCell>{locale.wording.ref}</TableCell>
            <TableCell style={{ width: "60%" }} variant="head" className={classes.contentEditable}>{locale.wording.designation}&nbsp;<EditIcon className={classes.icon} /></TableCell>
            <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.unit_price}&nbsp;{ newData.currency && newData.currency.value }</TableCell>
            <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.quantity}&nbsp;<EditIcon className={classes.icon} /></TableCell>
            <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.discount_unit}&nbsp;<EditIcon className={classes.icon} /></TableCell>
            <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.total} { newData.currency && newData.currency.value }</TableCell>
            { canBeUpdated ? <TableCell>{locale.wording.remove}</TableCell> : null }
        </TableRow>
        </TableHead>
        <TableBody>
            {
            listItems.map(( item, index) => {
                return  <TableRow key={index} className={classes.tableRow}>
                            <TableCell>{locale.wording[item.onModel].toUpperCase()}-{ item.ref}</TableCell>
                            <TableCell className={ classes.contentEditable }>
                            {
                              canBeUpdated ?
                                <ApxContenEditable value={ item.desc || "" } length="40"  id={item.item_id} actionInput={(event) => { this.props.editItem(reducer, item, 'desc' , event.target.value ) }} name="desc" />
                              : item.desc
                            }
                            </TableCell>
                            <TableCell>{ cvtNumToUserPref(item.unit_price)}</TableCell>
                            <TableCell className={classes.tablenoWrap}>

                            {
                              canBeUpdated ?
                              <div className={ classes.quantity }>
                                  <ArrowDropDownIcon className={ classes.btnArrow} onClick={ () => { this.props.addRemoveQuantity(reducer, item.item_id, "down")}} />
                                      <span>{ item.quantity }</span>
                                  <ArrowDropUpIcon className={ classes.btnArrow} onClick={ () => { this.props.addRemoveQuantity(reducer, item.item_id, "up")}} />
                              </div>
                              : <span>{ item.quantity }</span>
                            }

                            </TableCell>
                            <TableCell>
                              {
                                canBeUpdated ?
                              <ApxContenEditable placeholder="0" value={item.discount  || ""} length="5" id={item.item_id} actionInput={this.getInput} name="discount" />
                                : item.discount || cvtNumToUserPref(0)
                              }
                            </TableCell>
                            <TableCell className={classes.tablenoWrap}>{ cvtNumToUserPref(item.total) }</TableCell>
                            { canBeUpdated ? <TableCell ><IconButton onClick={ () => { this.props.removeItem(reducer, item)}} ><DeleteIcon style={{ color: 'red' }}/></IconButton></TableCell> : null }
                        </TableRow>

            })
            }
        </TableBody>
    </Table>
    </div>
    <div className={ classes.sumWrapper}>
      {
        reducer === "INVOICE" && newData.quote_id ?
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
          <Checkbox 
            checked={newData.deposit || false} 
            style={{ marginRight: 5}} 
            name="deposit"
            disabled={ newData._id ? true : false   }
            onChange={ this.handleCheckBox } />
          {locale.wording.invoice_deposit}
          </div>

          <div>
          <Checkbox 
            checked={newData.balance || false} 
            style={{ marginRight: 5}} 
            name="balance"
            disabled={ newData._id ? true : false }
            onChange={ this.handleCheckBox } />
            {locale.wording.balance}
          </div>
          
        </div>
        : null 
      }


      <div>
        <Typography variant="body1" className={ classes.sum }>
          <b style={{ marginLeft: 24 }}>{locale.wording.subtotal}</b>
          <span className={ classes.sumSpan }><b>{  cvtNumToUserPref(newData.subtotal || 0 ) } { newData.currency && newData.currency.value }</b></span>
        </Typography>
      </div>
        {
          newData.deposit ?
              <Typography variant="body1" component="div" className={ classes.sum } style={{backgroundColor: "white"}}>
                <b style={{ marginLeft: 24 }}>{locale.wording.balance_due}</b>
                <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(newData.balance_due) } { newData.currency && newData.currency.value }  </b></span>
              </Typography>
          : null 
        }
        {
          newData.balance && !newData._id ?
              <Typography variant="body1" component="div" className={ classes.sum } style={{backgroundColor: "white", opacity: 0.4}}>
                <b style={{ marginLeft: 24 }}>{locale.wording.amount_paid}</b>
                <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(newData.charges) } { newData.currency && newData.currency.value }  </b></span>
              </Typography>
          : null 
        }
        {
          newData.deposit ? 
          <Typography variant="body1" component="div"  className={ classes.sum }>
                <b style={{ marginLeft: 24 }}>{locale.wording.deposit}</b>
                <span className={ classes.sumSpan }><b>
                  <TextField  
                      placeholder="1000" 
                      value={newData.deposit_amount || "" }  
                      disabled={!newData.deposit}
                      id="deposit_amount" 
                      InputProps={{
                        endAdornment: <InputAdornment position="end">{ newData.currency && newData.currency.value }</InputAdornment>,
                      }}
                      style={{ width: 120 }}
                      onChange={ (e) => {
                          if(checkNumFormatRegex(e.target.value)){
                            this.setDeposit(e)
                          }
                         }}
                      variant="outlined"
                      margin="dense"
                      name="deposit_amount" /></b></span>
              </Typography>
              : null 
        }
              
        <Typography variant="body1" className={ classes.sum } style={{backgroundColor: "white"}}>
          <b style={{ marginLeft: 24 }}>{locale.wording.vat}&nbsp;{ newData.vat ? newData.vat.value : "0%" } { vat_terms}</b>
          <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(newData.vat_value || 0) } { newData.currency && newData.currency.value }</b></span>
        </Typography>
        <Typography variant="body1" component="div" className={ classes.sum }>
          <b style={{ marginLeft: 24 }}>{locale.wording.net_to_pay}</b>
          <span className={ classes.sumSpan }><b>{ cvtNumToUserPref( newData.net_to_pay + newData.vat_value || 0 ) } { newData.currency && newData.currency.value }  </b></span>
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

        "& td": {
          padding: "4px 20px 4px 26px"
        },
        "& th": {
          padding: "4px 20px 4px 26px"
        }
    },
    tablenoWrap: {
        whiteSpace: "nowrap",

    },
    tableRow: {
        // height: 28,
    },
    contentEditable: {
        whiteSpace: "nowrap",
        width: "60%" ,
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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

export default connect(mapStateToProps, {  addRemoveQuantity, removeItem, editItem, discountPrice, createState })(StyledItems);
