//manager/src/pages/bookkeeping/common/items.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { Button } from '@material-ui/core'
import { addRemoveQuantity, removeItem, editItem, discountPrice, updatePrice } from '../../../redux/book/itemActions'
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
  TableRow, Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import AddIcon from '@material-ui/icons/AddOutlined'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { cvtNumToUserPref } from '../../../utils/help_function'
import ApxContenEditable from '../../../components/common/contentEditable'
import EditIcon from '@material-ui/icons/EditOutlined'
import { calculVat } from '../../../redux/book/helper';


class Items extends Component {


  // Update discount price
  getInput = (event, id) => {
    var fieldName = event.target.id
    var value = event.target.value

    this.props.discountPrice(this.props.reducer, id, fieldName, value)
  }

  // Update discount price
  getPrice = (event, id) => {
    var value = event.target.value

    var x = value
    this.props.updatePrice(this.props.reducer, id, x)
  }


  setDeposit = (e) => {
    var vat = this.props.newData.vat ? this.props.newData.vat.indice : 0;

    var value = parseFloat(e.target.value.replace(",", ".") || 0)

    this.props.createState(this.props.reducer, "deposit_amount", e.target.value)
    this.props.createState(this.props.reducer, "deposit", true)

    var vat_value = (value / 100) * vat

    // this.props.createState(this.props.reducer, "balance_due", parseFloat((total).toFixed(2)) - parseFloat((value).toFixed(2))   )
    this.props.createState(this.props.reducer, "net_to_pay", value)
    this.props.createState(this.props.reducer, "vat_value", vat_value)
  }

  handleCheckBox = (e) => {
    var name = e.target.name;

    if (name === "deposit") {
      this.props.createState(this.props.reducer, "net_to_pay", 0)
      this.props.createState(this.props.reducer, "vat_value", 0)
      this.props.createState(this.props.reducer, "deposit", e.target.checked)
      this.props.createState(this.props.reducer, "balance", false)
    }

    if (name === "balance") {
      var total = this.props.newData.subtotal - this.props.newData.charges
      var vat_value = calculVat(total, this.props.newData.vat)
      this.props.createState(this.props.reducer, "balance", e.target.checked)
      this.props.createState(this.props.reducer, "deposit_amount", null)
      this.props.createState(this.props.reducer, "deposit", false)
      this.props.createState(this.props.reducer, "net_to_pay", total)
      this.props.createState(this.props.reducer, "vat_value", vat_value)
    }
  }

  addNewLine = () => {

    var obj = {
      description: "",
      _id: uuidv4(),
      currency: this.props.newData.currency,
      unit_price: 0,
      onModel: "service",
      name: "",
      category: {},
      quantity: 1,
      discount: 0,
      custom: true,
      ref: 0,
      base_currency: this.props.newData.currency
    }
    this.props.addNewLine(this.props.reducer, "name", obj)
  }


  render() {

    const { newData, listItems, reducer, classes, locale } = this.props;
    const vat_terms = newData.vat && newData.vat.vat_terms_en ? <span style={{ fontSize: 10 }}><br />{newData.vat && newData.vat["vat_terms_" + localStorage.getItem('locale')]}</span> : null
    const canBeUpdated = newData.quote_id || newData.refund_id ? false : true

    return (
      <div>

        <div style={{ overflowX: "auto" }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>

                <TableCell style={{ width: "60%" }} variant="head" className={classes.contentEditable}>{locale.wording.designation}&nbsp;<EditIcon className={classes.icon} /></TableCell>
                <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.unit_price}&nbsp;{newData.currency && newData.currency.value}</TableCell>
                <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.quantity}&nbsp;<EditIcon className={classes.icon} /></TableCell>
                <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.discount_unit}&nbsp;<EditIcon className={classes.icon} /></TableCell>
                <TableCell variant="head" className={classes.tablenoWrap}>{locale.wording.total} {newData.currency && newData.currency.value}</TableCell>
                {canBeUpdated ? <TableCell>{locale.wording.remove}</TableCell> : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                listItems.map((item, index) => {

                  return <TableRow key={index} className={classes.tableRow}>

                    <TableCell className={classes.contentEditable}>
                      {
                        canBeUpdated ?
                          <ApxContenEditable row="3" multiline={true} value={item.desc || ""} length="256" id={item._id} actionInput={(event) => { this.props.editItem(reducer, item, 'desc', event.target.value) }} name="desc" />
                          : item.desc
                      }
                    </TableCell>
                    <TableCell>
                      {
                        canBeUpdated && item.custom ? <ApxContenEditable type="number" placeholder={locale.wording.price} value={item.unit_price || ""} length="5" id={item._id} actionInput={this.getPrice} name="unit_price" />
                          : cvtNumToUserPref(item.unit_price) || ""
                      }
                    </TableCell>
                    <TableCell className={classes.tablenoWrap}>

                      {
                        canBeUpdated ?
                          <div className={classes.quantity}>
                            <ArrowDropDownIcon className={classes.btnArrow} onClick={() => { this.props.addRemoveQuantity(reducer, item.item_id, "down") }} />
                            <span>{item.quantity}</span>
                            <ArrowDropUpIcon className={classes.btnArrow} onClick={() => { this.props.addRemoveQuantity(reducer, item.item_id, "up") }} />
                          </div>
                          : <span>{item.quantity}</span>
                      }

                    </TableCell>
                    <TableCell>
                      {
                        canBeUpdated ?
                          <ApxContenEditable type="number" placeholder={locale.wording.discount} value={item.discount || ""} length="4" id={item._id} actionInput={this.getInput} name="discount" />
                          : item.discount || ""
                      }
                    </TableCell>
                    <TableCell className={classes.tablenoWrap}>{cvtNumToUserPref(item.total)}</TableCell>
                    {canBeUpdated ? <TableCell ><IconButton onClick={() => { this.props.removeItem(reducer, item) }} ><DeleteIcon style={{ color: 'red' }} /></IconButton></TableCell> : null}
                  </TableRow>

                })
              }
            </TableBody>
          </Table>
          <div style={{ float: "right", marginTop: 12 }}>
            <Button variant="contained" color="secondary" onClick={() => { this.addNewLine() }}><AddIcon /></Button>
          </div>
        </div>
        <div className={classes.sumWrapper}>
          {
            reducer === "INVOICE" && newData.quote_id ?
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  <Checkbox
                    checked={newData.deposit || false}
                    style={{ marginRight: 5 }}
                    name="deposit"
                    disabled={newData._id ? true : false}
                    onChange={this.handleCheckBox} />
                  {locale.wording.invoice_deposit}
                </div>

                <div>
                  <Checkbox
                    checked={newData.balance || false}
                    style={{ marginRight: 5 }}
                    name="balance"
                    disabled={newData._id ? true : false}
                    onChange={this.handleCheckBox} />
                  {locale.wording.balance}
                </div>

              </div>
              : null
          }


          <div>
            <Typography variant="body1" className={classes.sum}>
              <b style={{ marginLeft: 24 }}>{locale.wording.subtotal}</b>
              <span className={classes.sumSpan}><b>{cvtNumToUserPref(newData.subtotal || 0)} {newData.currency && newData.currency.value}</b></span>
            </Typography>
          </div>
          {
            newData.deposit ?
              <Typography variant="body1" component="div" className={classes.sum} style={{ backgroundColor: "white" }}>
                <b style={{ marginLeft: 24 }}>{locale.wording.balance_due}</b>
                <span className={classes.sumSpan}><b>{cvtNumToUserPref(newData.balance_due)} {newData.currency && newData.currency.value}  </b></span>
              </Typography>
              : null
          }
          {
            newData.balance && !newData._id ?
              <Typography variant="body1" component="div" className={classes.sum} style={{ backgroundColor: "white", opacity: 0.4 }}>
                <b style={{ marginLeft: 24 }}>{locale.wording.amount_paid}</b>
                <span className={classes.sumSpan}><b>{cvtNumToUserPref(newData.charges)} {newData.currency && newData.currency.value}  </b></span>
              </Typography>
              : null
          }
          {
            newData.deposit ?
              <Typography variant="body1" component="div" className={classes.sum}>
                <b style={{ marginLeft: 24 }}>{locale.wording.deposit}</b>
                <span className={classes.sumSpan}><b>
                  <TextField
                    placeholder={`ex: 1000${newData.currency.value}`}
                    type="number"
                    value={newData.deposit_amount || ""}
                    disabled={!newData.deposit}
                    id="deposit_amount"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{newData.currency && newData.currency.value}</InputAdornment>,
                    }}
                    style={{ width: 120 }}
                    onChange={(e) => { this.setDeposit(e) }}
                    variant="outlined"
                    margin="dense"
                    name="deposit_amount" /></b></span>
              </Typography>
              : null
          }

          <Typography variant="body1" className={classes.sum} style={{ backgroundColor: "white" }}>
            <b style={{ marginLeft: 24 }}>{locale.wording.vat}&nbsp;{newData.vat ? cvtNumToUserPref(newData.vat.indice || 0) + "%" : "0%"} {vat_terms}</b>
            <span className={classes.sumSpan}><b>{cvtNumToUserPref(newData.vat_value || 0)} {newData.currency && newData.currency.value}</b></span>
          </Typography>
          <Typography variant="body1" component="div" className={classes.sum}>
            <b style={{ marginLeft: 24 }}>{locale.wording.net_to_pay}</b>
            <span className={classes.sumSpan}><b>{reducer === "REFUND" ? "- " : ""}{cvtNumToUserPref(newData.net_to_pay + newData.vat_value || 0)} {newData.currency && newData.currency.value}  </b></span>
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
    width: "60%",
    padding: 0
  },
  tableCell: {
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
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

export default connect(mapStateToProps, { addRemoveQuantity, removeItem, editItem, discountPrice, createState, updatePrice })(StyledItems);
