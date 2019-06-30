//manager/src/pages/bookkeeping/item/view.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withStyles, Paper, Table, TableRow, TableBody, TableHead, TableCell , Typography, Fab, TextField, IconButton} from '@material-ui/core';
import { getDocument, resetState, downloadPdf, updateSingle, createState} from '../../../redux/book/actions'
import { cvtNumToUserPref } from '../../../utils/help_function'
import Spinner from '../../../components/common/spinner'
import ApxBackBtn from '../../../components/common/backBtn'
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined'
import CheckIcon from '@material-ui/icons/Check'
import History from './history'
import StatusStep from './statusStep'
import ApxtextIndexValue from '../../../components/common/textIndexValue'



class View extends Component {

    state = {
      id: "",
      reducer: "",
    }

    componentDidMount(){
      
      this.setState({
          id: this.props.match.params.id,
          reducer: this.props.match.params.reducer
      })
      this.props.getDocument(this.props.match.params.reducer.toUpperCase(), this.props.match.params.id);
    }

    componentWillUnmount(){
      this.props.resetState(this.state.reducer.toUpperCase())
    }


    calculVat = (amount, vat) => {
      var _vat = vat ? vat.indice : 0;
      var vat_value =  (amount /100) * _vat 

      return vat_value
    }

    renderTransactionNumber = () => {
      const {locale, item } = this.props
      const reducer = this.state.reducer
        return <div style={{ display: "flex", alignItems: "center",  }}>
            <TextField
                label={ locale.wording.transaction_number }
                id="transaction_number"
                margin="dense"
                onBlur={ () => { this.props.updateSingle(reducer.toUpperCase(), {transaction_number: item.transaction_number },  `common/update-field/${reducer.toLowerCase()}/${item._id}` ) }}
                onChange={ (e) => { this.props.createState(reducer.toUpperCase(), "transaction_number",  e.target.value ) }}
                style={{ fontWeight: 300, maxWidth: 400, width: "100%"}}
                value={ item.transaction_number ||  ""}
                variant="outlined"
            />
            &nbsp;
            <IconButton color="primary" onClick={ () => {  this.props.updateSingle(reducer.toUpperCase(), {transaction_number: item.transaction_number },  `common/update-field/${reducer.toLowerCase()}/${item._id}` ) } } >
                <CheckIcon style={{color: 'green'}} />
            </IconButton>
            </div>
    }


    render() {

        const {item, classes, locale, company, isFetching } = this.props
        const {reducer} = this.state
        const options = {  day: 'numeric',  month: 'short', year: 'numeric'};
        const vatValue = this.calculVat(item.net_to_pay, item.vat )

        if(isFetching){
          return <Spinner />
        }
        if(!item || !company){
          return <p>Not data found !</p>
        }

        return (
            <Paper className={classes.paper}>
              <ApxBackBtn />
              <div style={{textAlign: "center"}}>
                <img src={ company && company.logo_company.full_path } width="80" alt={company.company_name}/>
              </div>
              <Typography variant="h1" align="center">{locale.wording[reducer]}</Typography>

            <StatusStep item={item} locale={locale} reducer={reducer}/>

            <div className={classes.header}>
                {
                  item.contact_id ?
                  <div className={classes.blockContact}>
                        <ApxtextIndexValue
                            value={ item.contact_id.company_name }
                            label={locale.wording.company_name}
                        />
                          <ApxtextIndexValue
                              value={ item.contact_id.firstname}
                              label={locale.wording.firstname}
                          />
                          <ApxtextIndexValue
                              value={ item.contact_id.lastname}
                              label={locale.wording.lastname}
                          />
                          <ApxtextIndexValue
                              value={ item.contact_id.email.toLowerCase()}
                              label={locale.wording.email}
                          />
                            <ApxtextIndexValue
                                value={ item.contact_id.phoneNumber}
                                label={locale.wording.phone}
                            />
                            <ApxtextIndexValue
                                value={ item.contact_id.addresses_street +" "+ item.contact_id.addresses_zip  + " " + item.contact_id.addresses_city + " " + (item.contact_id.addresses_country ? item.contact_id.addresses_country[localStorage.getItem('locale')] : "") }
                                label={locale.wording.addresses_street}
                            />
                    </div>
                  : <div></div>
                }
                {
                  item ?
                    <div>
                      <Typography variant="caption" align="left">{locale.wording[reducer]}&nbsp;
                        <span className={ classes.span }>Nº{ item.ref_add +"-"+item.ref }</span>
                      </Typography>
                      <Typography variant="caption" align="left">{locale.wording.created_at}&nbsp;
                        <span className={ classes.span }>{ item.created_at && new Date(item.created_at.date).toLocaleDateString(localStorage.getItem("locale"), options) }</span>
                      </Typography>
                      {
                        reducer === "quote" ?
                        <Typography variant="caption" align="left">{locale.wording.expired_at}&nbsp;
                          <span className={ classes.span }>{ item.expired_at && new Date(item.expired_at.date).toLocaleDateString(localStorage.getItem("locale"), options) }</span>
                        </Typography>
                        : null
                      }
                      {
                        reducer === "invoice" ?
                        <Typography variant="caption" align="left">{locale.wording.expired_at}&nbsp;
                          <span className={ classes.span }>{ item.due_at && new Date(item.due_at.date).toLocaleDateString(localStorage.getItem("locale"), options) }</span>
                        </Typography>
                        : null
                      }
                      {
                        item.quote_id ?
                        <Typography variant="caption" align="left">{locale.wording.on +" "+locale.wording.quote}&nbsp;
                          <span className={ classes.span }>{ "Nº"+ item.quote_id.ref + "-"+item.quote_id.ref_add }</span>
                        </Typography>
                        : null 
                      }
                      {
                        item.refund_id ?
                        <Typography variant="caption" align="left">{locale.wording.on +" "+locale.wording.quote}&nbsp;
                          <span className={ classes.span }>{ "Nº"+ item.invoice_id.ref + "-"+item.invoice_id.ref_add }</span>
                        </Typography>
                        : null 
                      }

                    </div>
                    : <div></div>
                }

            </div>
            {
              reducer === "invoice" || reducer === "refund" ?

              this.renderTransactionNumber()

              : null
            }

            {
              item.response ?
              <div className={classes.responseWrap}>

                <Typography variant="h3" align="center" style={{marginBottom: 10, color: "black"}}>{locale.subheading.label_client_feedback}</Typography>
                <Typography className={classes.response}  variant="body2" dangerouslySetInnerHTML={{__html: item.response }} />
              </div>
              : null
            }

            <br />

            {
              item.info_comp ?
              <div>
                <Typography variant="body1" align="left">{ locale.subheading.info_comp }</Typography>
                <Typography className={classes.infos} variant="body2" dangerouslySetInnerHTML={{__html: item.infos }} />
              </div>
              : null
            }


              <div className={ classes.wrapTable }>
              <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
              <TableRow>
                  <TableCell>{locale.wording.ref}</TableCell>
                  <TableCell style={{ width: "30%" }} className={classes.contentEditable}>{locale.wording.designation}</TableCell>
                  <TableCell className={classes.tablenoWrap}>{locale.wording.unit_price}&nbsp;{ item.currency && item.currency.value }</TableCell>
                  <TableCell className={classes.tablenoWrap}>{locale.wording.quantity}</TableCell>
                  <TableCell className={classes.tablenoWrap}>{locale.wording.discount_unit}</TableCell>
                  <TableCell className={classes.tablenoWrap}>{locale.wording.total} { item.currency && item.currency.value  }</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  {
                  item.list_items.map(( item, index) => {
                      return  <TableRow key={index} className={classes.tableRow}>
                                  <TableCell>{locale.wording[item.onModel].toUpperCase()}-{ item.ref}</TableCell>
                                  <TableCell style={{ width: "30%" }}>{item.desc} </TableCell>
                                  <TableCell>{ cvtNumToUserPref(item.unit_price)}</TableCell>
                                  <TableCell className={classes.tablenoWrap}>{ item.quantity }</TableCell>
                                  <TableCell>{item.discount}</TableCell>
                                  <TableCell>{ cvtNumToUserPref(item.total) }</TableCell>
                              </TableRow>

                  })
                  }
              </TableBody>
          </Table>
        </div>
        <div className={ classes.sumWrapper}>

            <Typography variant="body1" className={ classes.sum }>
              <b style={{ marginLeft: 24 }}>{locale.wording.subtotal}</b>
              <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(item.subtotal) } { item.currency && item.currency.value }</b></span>
            </Typography>
            {
              item.deposit ?
                  <Typography variant="body1" component="div" className={ classes.sum } style={{backgroundColor: "white", borderBottom: "1px solid rgb(0, 0, 0, 0.24)"}}>
                    <b style={{ marginLeft: 24 }}>{locale.wording.deposit}</b>
                    <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(item.deposit_amount) } { item.currency && item.currency.value }  </b></span>
                  </Typography>
              : null 
            }
            {
              item.balance ?
                  <Typography variant="body1" component="div" className={ classes.sum } style={{backgroundColor: "white"}}>
                    <b style={{ marginLeft: 24 }}>{locale.wording.amount_paid}</b>
                    <span className={ classes.sumSpan }><b>-{ cvtNumToUserPref(item.subtotal - item.net_to_pay || 0) } { item.currency && item.currency.value }  </b></span>
                  </Typography>
              : null 
            }
            {
              item.balance ?
                  <Typography variant="body1" component="div" className={ classes.sum }>
                    <b style={{ marginLeft: 24 }}>{locale.wording.balance_due}</b>
                    <span className={ classes.sumSpan }><b>{ cvtNumToUserPref( item.net_to_pay || 0) } { item.currency && item.currency.value }  </b></span>
                  </Typography>
              : null 
            }
            <Typography variant="body1" className={ classes.sum } style={{backgroundColor: "white"}}>
              <b style={{ marginLeft: 24 }}>{locale.wording.vat}&nbsp;{ item.vat ? item.vat.value : "0%" }</b>
              <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(vatValue ) } { item.currency && item.currency.value }</b></span><br />
              <span style={{ marginLeft: 24, fontSize: 10 }}>{ item.vat && item.vat["vat_terms_" + localStorage.getItem('locale')] }</span>
            </Typography>
            <Typography variant="body1" className={ classes.sum }>
              <b style={{ marginLeft: 24 }}>{locale.wording.net_to_pay}</b>
              <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(item.net_to_pay + vatValue || 0) } { item.currency && item.currency.value }</b></span>
            </Typography>
        </div>
        
        <div style={{clear: "both"}}>
        {
          item.terms ?
          <div >
            <Typography variant="body1">{locale.wording.tandc}</Typography>
            <Typography style={{clear: "both"}} className={classes.infos} variant="body2">{ item.terms }</Typography>
          </div>
          : null
        }
        

        </div>

        {
          reducer === 'quote' ?
            <History item={item} locale={locale}/>
          : null 
        }

        {
          item.invoice_id ?
            <History item={item} locale={locale} />
          : null 
        }

      
        <Fab color="primary" size="medium"  className={classes.fab}>
            <CloudDownloadIcon onClick={ () => {this.props.downloadPdf(this.state.reducer, item._id)} } />
        </Fab>
      </Paper>
        )
    }
}

const styles = theme => ({
    paper: {
        padding: 24,
        marginBottom: 24,
        [theme.breakpoints.down('sm')]: {
          padding: 12,
      }
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 24,
      marginBottom: 24,
      [theme.breakpoints.down('sm')]: {
          display: "block",
      }
    },
    wrapTable: {
      overflowX: "auto",
      marginTop: 24
    },
    span: {
      float: "right",
      fontWeight: 700,
      color: "#303030",
      marginLeft: 20,
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
      marginBottom: 24,
      float: "right",
      width: "50%",
      border: '1px solid rgb(0, 0, 0, 0.24)',
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 12
      }
    },

    infos: {
      paddingLeft: 5,
      paddingTop: 10,
      border: `1px solid rgba(0, 0, 0, 0.24)`,
      minHeight: 80
    },
    tableHead: {
      backgroundColor: theme.palette.lightGrey
    },
    fab: {
        position: 'fixed',
        bottom: 10,
        right: 10
    },
    tableRow: {
      whiteSpace: "nowrap"
    },
    responseWrap: {
      backgroundColor: theme.palette.grey.main,
      padding: 10
    },
    response: {
      border: `1px solid rgba(0, 0, 0, 0.24)`,
      minHeight: 80,
      paddingLeft: 5,
      backgroundColor: "white"
    },
    blockContact: {
      border: '1px solid rgb(238,238,238)', 
      borderRadius: 1, 
      marginTop: 8,
      minWidth: 400,
      padding: 10,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
  }
})

const mapStateToProps = (state, ownProps) => {

    return {
        isFetching: state.book[ownProps.match.params.reducer].isFetching,
        isError: state.book[ownProps.match.params.reducer].isError,
        message: state.book[ownProps.match.params.reducer].message,
        item: state.book[ownProps.match.params.reducer].item,
        locale: state.locale.locale,
        company: state.account.company.item
    }
}

const StyledView = withStyles(styles)(View)

export default connect(mapStateToProps, {  getDocument, resetState, downloadPdf, updateSingle, createState  })(StyledView);
