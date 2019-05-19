// src/pages/payment/CardSection.js

import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <div style={{width: "100%"}}>
        <CardNumberElement  placeholder="Numéro de carte" />
        <CardExpiryElement placeholder="MM AA" />
        <CardCVCElement />
      </div>
    );
  }
}

export default CardSection;
