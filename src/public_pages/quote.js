//src/public_pages/quote.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {setNotification} from '../redux/notification/actions'
import {API_ENDPOINT} from '../redux/constant'
import { withStyles, Paper, Table, TableRow, TableBody, TableHead, TableCell , Typography, Button, Divider} from '@material-ui/core';
import { cvtNumToUserPref } from '../utils/help_function'
import Spinner from '../components/common/spinner'
import ApxRichEditor from '../components/common/richEditor'

// "XI7ROsEUFOwx6T9Qaza8eBUnmsec30IkZ63MaRGHiheiHk76Hg"

class View extends Component {

    state = {
      token: "",
      isError: false,
      loading: false,
      response: "",
      user: null,
      quote: null
    }

    componentDidMount (){

      this.setState({
          token: this.props.match.params.token,
          loading: true
      })
      this.getDocument(this.props.match.params.token);
    }

    async getDocument  (token) {

      try{
        const request = await axios.get(`${API_ENDPOINT}public/quote/view/${token}`);
        const res = request.data;
        this.setState({ quote: res.payload, user: res.user, loading: false, response: res.payload.response })
      }catch(err){
        this.props.setNotification('error_404', "error")
        this.setState({ isError: true, loading: false })
      }
    }

    handleResponse = (a, b, c) => {
      this.setState({response: c })
    }

    async sendResponse (status) {
        const data = {response: this.state.response, status: status};
        const token = this.state.token;

        this.setState({ isError: false, loading: true })

        try{
          const request = await axios.put(`${API_ENDPOINT}public/quote/update/${token}`, {data});
          const res = request.data;
          this.setState({ loading: false, quote: res.payload })
          this.props.setNotification('success_reply', "success")
        }catch(err){
          this.props.setNotification("error_404", "error")
          this.setState({ isError: true, loading: false })
        }
    }


    // Calcul all VAT / Total / Total HT
    totalHT = (listItems) => {
        var vat = this.state.quote.vat ? this.state.quote.vat.indice : 0
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

        const { classes, locale } = this.props
        const {reducer, user, quote, loading, response} = this.state
        const options = {  day: 'numeric',  month: 'short', year: 'numeric'};

        if(loading){
          return <Spinner />
        }
        if(!user || !quote){
          return <div style={{ paddingTop: "10%" }}>
                    <Typography variant="h3" align="center">{ locale.message.error_404 }<br />
                      <a href="https://nomadledger.com">NomadLedger</a>
                    </Typography>
                </div>
        }


        return (
            <Paper className={classes.paper}>
              <div style={{textAlign: "center"}}>
                <img src={ user && user.company_id.logo_company.full_path } width="150" alt={user.company_id.company_name}/>
              </div>


            <div className={classes.header}>
                {
                  user ?
                    <div style={{marginBottom: 24}}>
                        <Typography variant="h3" align="left">{ user.company_id.company_name }</Typography>
                        <Typography variant="body1" align="left">{ user.firstname +" "+ user.lastname } </Typography>
                        <Typography variant="body1" align="left">{ user.phone_code.dial_code +""+user.phone } </Typography>
                        <Typography variant="body1" align="left">{ user.email }</Typography>
                        <Typography variant="body1" align="left">{ user.company_id.web_page }</Typography>
                        <Typography variant="caption" align="left">{ user.company_id.addresses_street }</Typography>
                        <Typography variant="caption" align="left">{ user.company_id.addresses_zip +" " }{ user.company_id.addresses_city }</Typography>
                        <Typography variant="caption" align="left">{ user.company_id.addresses_country && user.company_id.addresses_country[localStorage.getItem("locale")] }</Typography>
                    </div>
                  : <div></div>
                }
                {
                  quote ?
                    <div>
                      <Typography variant="caption" align="left">{locale.wording.quote}&nbsp;
                        <span className={ classes.span }>Nº{ quote.ref_add +"-"+quote.ref }</span>
                      </Typography>
                      <Typography variant="caption" align="left">{locale.wording.created_at}&nbsp;
                        <span className={ classes.span }>{ quote.created_at && new Date(quote.created_at.date).toLocaleDateString(localStorage.getItem("locale"), options) }</span>
                      </Typography>

                      <Typography variant="caption" align="left">{locale.wording.expired_at}&nbsp;
                        <span className={ classes.span }>{ quote.expired_at && new Date(quote.expired_at.date).toLocaleDateString(localStorage.getItem("locale"), options) }</span>
                      </Typography>
                    </div>
                    : <div></div>
                }

            </div>
            <Divider />
            <br />
            <Typography variant="h2" align="center">Devis Nº{ quote.ref_add +"-"+quote.ref }</Typography>
            <div style={{display: 'flex'}}>
            {
              quote.contact_id ?
                <div style={{marginBottom: 24, marginTop: 24}}>
                    <Typography variant="caption">{ locale.wording.of.toUpperCase() } :</Typography>
                    <Typography variant="h3" align="left">{ quote.contact_id.company_name }</Typography>
                    <Typography variant="body1" align="left">{ quote.contact_id.firstname + " "+ quote.contact_id.lastname }</Typography>
                    <Typography variant="body1" align="left">{ quote.contact_id.email }</Typography>
                    <Typography variant="body1" align="left">{ quote.contact_id.phoneNumber }</Typography>
                </div>
              : <div></div>
            }
            </div>



            <br />
            {
              quote.infos ?
                <React.Fragment>
                  <Typography variant="body1" align="left">{ locale.subheading.info_comp }</Typography>
                  <Typography className={classes.infos} variant="body2" dangerouslySetInnerHTML={{__html: quote.infos }} />
                </React.Fragment>
              : null
            }

              <div className={ classes.wrapTable }>
              <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
              <TableRow>
                  <TableCell>{locale.wording.ref}</TableCell>
                  <TableCell style={{ width: "30%" }} className={classes.contentEditable}>{locale.wording.designation}</TableCell>
                  <TableCell className={classes.tablenoWrap}>{locale.wording.unit_price}&nbsp;{ quote.currency && quote.currency.value }</TableCell>
                  <TableCell className={classes.tablenoWrap}>{locale.wording.quantity}</TableCell>
                  <TableCell className={classes.tablenoWrap}>{locale.wording.discount_unit}</TableCell>
                  <TableCell className={classes.tablenoWrap}>{locale.wording.total} { quote.currency && quote.currency.value  }</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  {
                  quote.list_items.map(( item, index) => {
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
              <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(this.totalHT(quote.list_items).ht) } { quote.currency && quote.currency.value }</b></span>
            </Typography>
            <Typography variant="body1" className={ classes.sum } style={{backgroundColor: "white"}}>
              <b style={{ marginLeft: 24 }}>{locale.wording.vat}&nbsp;{ quote.vat ? quote.vat.value : "0%" }</b>
              <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(this.totalHT(quote.list_items).vat || 0) } { quote.currency && quote.currency.value }</b></span><br />
              <span style={{ marginLeft: 24, fontSize: 10 }}>{ quote.vat && quote.vat["vat_terms_" + localStorage.getItem('locale')] }</span>
            </Typography>
            <Typography variant="body1" className={ classes.sum }>
              <b style={{ marginLeft: 24 }}>{locale.wording.total_ttc}</b>
              <span className={ classes.sumSpan }><b>{ cvtNumToUserPref(this.totalHT(quote.list_items).ttc || 0) } { quote.currency && quote.currency.value }</b></span>
            </Typography>
        </div>

        {
          quote.terms ?
          <div style={{clear: "both"}}>
            <Typography variant="body1">{locale.wording.tandc}</Typography>
            <Typography style={{clear: "both"}} className={classes.infos} variant="body2">{ quote.terms }</Typography>
          </div>
          : null
        }
        <br /><br />
        <div className={classes.comment}>
        <Typography variant="h3" align="center">{locale.subheading.label_reply_quote}</Typography>
        <br />
        <ApxRichEditor
            reducer={reducer}
            field="infos"
            initText={ response || "" }
            handleAction={ this.handleResponse }
        />
        <br />
        <div className={classes.btnWrap}>
            <Button style={{backgroundColor: 'red', color: "white"}} onClick={() => { this.sendResponse("rejected") } } className={ classes.btn } variant="contained">{ locale.wording.rejecte }</Button>
            <Button style={{backgroundColor: 'blue', color: "white"}} onClick={() => { this.sendResponse("reply") } } className={ classes.btn } variant="contained">{ locale.wording.reply }</Button>
            <Button style={{backgroundColor: "green", color: "white"}} onClick={() => { this.sendResponse("approved") } } className={ classes.btn } variant="contained">{ locale.wording.approve }</Button>
        </div>
        </div>

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
      border: `1px solid rgba(0, 0, 0, 0.24)`,
      minHeight: 80
    },
    tableHead: {
      backgroundColor: theme.palette.lightGrey
    },
    tableRow: {
      whiteSpace: "nowrap"
    },
    btnWrap: {
      display: 'flex',
      justifyContent: "space-around",
      alignItems: "center"
    },
    btn: {
      width: 100
    },
    comment: {
      backgroundColor: theme.palette.grey.main,
      padding: 18
    }
})

const mapStateToProps = (state, ownProps) => {

    return {
        locale: state.locale.locale,
        company: state.account.company.item
    }
}

const StyledView = withStyles(styles)(View)

export default connect( mapStateToProps , { setNotification })(StyledView);
