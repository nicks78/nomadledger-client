// src/pages/payment/CheckoutForm.js

import React from 'react';
import {connect} from 'react-redux'
import {submitPayment, requestPayment} from '../../redux/payment/actions'
import {injectStripe, CardElement} from 'react-stripe-elements';
import { Button, Typography, TextField } from '@material-ui/core'
import WarningIcon from '@material-ui/icons/WarningOutlined'
import {cvtNumToUserPref} from '../../utils/help_function'


class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autoRenewal: false,
      lastname: "",
      firstname: ""
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      lastname: nextProps.payment.lastname,
      firstname: nextProps.payment.firstname
    })
  }

    handleSubmit = async (ev) => {
    ev.preventDefault();

    // User information
    const infos = this.props.payment;
    this.props.requestPayment();
    var lastname = this.state.lastname || infos.lastname
    var firstname = this.state.firstname || infos.firstname

    try{
      let {token} = await this.props.stripe.createToken({name: lastname + " " + firstname  });
          console.log(token)
          var data = {
            stripe_token: token,
            email: this.props.payment.email,
            token_user: this.props.payment.token_user,
            autoRenewal: this.state.autoRenewal
          }

          this.props.submitPayment(data)
    }catch(err){
      if(err.error){
        this.props.setNotification(err.error.code, "error")
      }
    }

  };

  render() {

    const { payment, locale, isFetching } = this.props
    const { lastname, firstname } = this.state;

    if(!payment){
      return null
    }

    return (
      <div>
        <Typography variant="h1" style={{fontWeight: 600}} align="center">{cvtNumToUserPref(4.95)} € / <span style={{fontWeight: 300, fontSize: 20}}>{locale.wording.month}</span></Typography>
        <Typography variant="body1" align="center">{locale.helperText.payment_terms}</Typography><br />
        <Typography variant="caption" align="center">{locale.helperText.member_end} { new Date(payment.membership_end).toLocaleDateString(localStorage.getItem("locale")) } </Typography><br />
        <Typography variant="caption" style={{color: "red", display: 'inline-flex', alignItems: 'center' }}>
          <WarningIcon style={{ fontSize: 18 }}/>&nbsp;{ locale.message.warning_not_refresh }</Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField   value={ payment.email || "" } disabled  variant="outlined" margin="dense" fullWidth />
          <TextField label={locale.wording.card_lastname} value={ lastname } onChange={ (e ) => { this.setState({ lastname : e.target.value }) }} variant="outlined" margin="dense" fullWidth />
          <TextField label={locale.wording.card_firstname} value={ firstname } onChange={ (e ) => { this.setState({ firstname : e.target.value }) }} variant="outlined" margin="dense" fullWidth />
          <CardElement  />
          <br />
          <Button
            variant="contained"
            disabled={ payment === null || isFetching ? true : false }
            style={{width: '100%'}}
            type="submit"
            color="primary">
            { isFetching ? locale.wording.payment_progress : locale.wording.confirm_payment } {payment && payment.amount.toFixed(2)} €
          </Button>
        </form>
        <br />
        <Typography variant="body1" align="center" dangerouslySetInnerHTML={{__html: locale.helperText.need_help}}/>
      </div>

    );
  }
}

const mapStateToProps = (state) => {

  return {
      locale: state.locale.locale,
      payment: state.payment.payment,
      isFetching: state.payment.isFetching
  }
}


const CheckoutForm = connect( mapStateToProps, {submitPayment, requestPayment} )(Checkout);


export default injectStripe(CheckoutForm);

// <p style={{display: "inline-flex", alignItems: "center"}}>
//   <Checkbox style={{paddingLeft: 0}} checked={ autoRenewal } onChange={(e, isChecked) => { this.setState({autoRenewal: isChecked}) }} />
//   <Typography component="span" variant="body2">{ locale.wording.auto_renewal }</Typography>
// </p>
