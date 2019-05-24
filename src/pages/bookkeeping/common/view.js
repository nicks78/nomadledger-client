//manager/src/pages/bookkeeping/item/view.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withStyles, Paper, Table, TableRow, TableBody, TableHead, TableCell , Typography, Fab} from '@material-ui/core';
import { getDocument, resetState, downloadPdf} from '../../../redux/book/actions'
import { cvtNumToUserPref } from '../../../utils/help_function'
import Spinner from '../../../components/common/spinner'
import ApxBackBtn from '../../../components/common/backBtn'
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined'


class View extends Component {

    state = {
      id: "",
      reducer: ""
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

    // Calcul all VAT / Total / Total HT
    totalHT = (listItems) => {
        var vat = this.props.item.vat ? this.props.item.vat.indice : 0
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

        const {item, classes, locale, company, isFetching } = this.props
        const {reducer} = this.state
        const options = {  day: 'numeric',  month: 'short', year: 'numeric'};

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

            <div className={classes.header}>
                {
                  item.contact_id ?
                    <div style={{marginBottom: 24}}>
                        <Typography variant="caption">{ locale.wording.bill_to }</Typography>
                        <Typography variant="body1" align="left">{ item.contact_id.company_name }</Typography>
                        <Typography variant="body1" align="left">{ item.contact_id.addresses_street }</Typography>
                        <Typography variant="body1" align="left">{ item.contact_id.addresses_zip +" " }{ item.contact_id.addresses_city }</Typography>
                        <Typography variant="body1" align="left">{ item.contact_id.addresses_country && item.contact_id.addresses_country[localStorage.getItem("locale")] }</Typography>
                    </div>
                  : <div></div>
                }
                {
                  item ?
                    <div>
                      {
                        item.status ?
                        <p style={{backgroundColor: item.status.color, color: "white", borderRadius: 4, textAlign: 'center', marginTop: 0}}>
                          {item.status[localStorage.getItem("locale")]}
                        </p>
                        : null
                      }
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


                    </div>
                    : <div></div>
                }

            </div>


              <Typography variant="caption" align="left">{ locale.subheading.info_comp }</Typography>
              <Typography className={classes.infos} variant="body2" dangerouslySetInnerHTML={{__html: item.infos }} />

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
              <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(this.totalHT(item.list_items).ht) } { item.currency && item.currency.value }</b></span>
            </Typography>
            <Typography variant="body1" className={ classes.sum } style={{backgroundColor: "white"}}>
              <b style={{ marginLeft: 24 }}>{locale.wording.vat}&nbsp;{ item.vat ? item.vat.value : "0%" }</b>
              <span className={ classes.sumSpan }><b>{ this.totalHT(item.list_items).vat } { item.currency && item.currency.value }</b></span><br />
              <span style={{ marginLeft: 24, fontSize: 10 }}>{ item.vat && item.vat["vat_terms_" + localStorage.getItem('locale')] }</span>
            </Typography>
            <Typography variant="body1" className={ classes.sum }>
              <b style={{ marginLeft: 24 }}>{locale.wording.total_ttc}</b>
              <span className={ classes.sumSpan }><b>{ this.totalHT(item.list_items).ttc } { item.currency && item.currency.value }</b></span>
            </Typography>
        </div>

        {
          item.terms ?
          <div style={{clear: "both"}}>
            <Typography style={{clear: "both"}} className={classes.infos} variant="body2">{ item.terms }</Typography>
          </div>
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
        overflow: 'hidden',
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
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 12
      }
    },

    infos: {
      paddingLeft: 10,
      paddingTop: 10,
      border: `1px solid ${theme.palette.lightGrey}`,
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

export default connect(mapStateToProps, {  getDocument, resetState, downloadPdf  })(StyledView);
