// src/pages/payment/CheckoutForm.js

import React from 'react';
import {connect} from 'react-redux'
import {DEFAULT_URL} from '../../redux/constant'
import {submitPayment, requestPayment} from '../../redux/payment/actions'
import {injectStripe, CardElement} from 'react-stripe-elements';
import { Button, Typography, TextField, Checkbox } from '@material-ui/core'
import WarningIcon from '@material-ui/icons/WarningOutlined'


class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      terms: false,
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    // User information 
    const infos = this.props.payment;
    this.props.requestPayment()

    this.props.stripe.createToken({name: infos.lastname + " " + infos.firstname  }).then(({token}) => {
      var data = {
        stripe_token: token,
        email: this.props.payment.email,
        token_user: this.props.payment.token_user
      }
      this.props.submitPayment(data)
    })
  };

  render() {

    const { payment, locale, isFetching } = this.props
    const { terms } = this.state;

    return (
      <div>
        <Typography variant="body1" align="center">{locale.helperText.payment_terms}</Typography><br />
        <Typography variant="caption" style={{color: "red", display: 'inline-flex', alignItems: 'center' }}>
          <WarningIcon style={{ fontSize: 18 }}/>&nbsp;{ locale.message.warning_not_refresh }</Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField  value={ payment !== null ? payment.email : "" } disabled variant="outlined" margin="dense" fullWidth />
          <TextField  value={ payment !== null ? payment.lastname : "" } disabled variant="outlined" margin="dense" fullWidth />
          <TextField  value={ payment !== null ? payment.firstname : "" } disabled variant="outlined" margin="dense" fullWidth />
          <CardElement />
          <br />
          <Button 
            variant="contained" 
            disabled={ payment === null || !terms || isFetching ? true : false }
            style={{width: '100%'}}
            type="submit" 
            color="primary">
            { isFetching ? locale.wording.payment_progress : locale.wording.confirm_payment } {payment && payment.amount} €
          </Button>
        </form>
        <div>
          <Checkbox checked={ terms } onChange={(e, isChecked) => { this.setState({terms: isChecked}) }} /> 
          <a href={`${DEFAULT_URL}terms.pdf`} target="_blank" style={{ fontSize: 12 }} >{ locale.wording.tandc }</a>
        </div>
        
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