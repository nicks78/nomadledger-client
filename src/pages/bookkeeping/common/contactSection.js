//manager/src/pages/bookkeeping/contactSection.js

import React from 'react'
import {connect} from 'react-redux'
import { createState } from '../actions'
import { ApxtextIndexValue } from '../../../components/common'
import AutoComplete from '../../../lib/autoComplete'


const ContactSection = (props) => {

        const { locale, newQuote} = props;

        var infoContact = ["company_name", "firstname", "lastname", "email"];

        return (
            <div>
                <AutoComplete 
                    field="company_name"
                    model="contact"
                    reducer="QUOTE"
                    placeholder="Search a contact"
                    setSelectedObject={ props.createState }
                />
                <br />
                {
                    infoContact.map((name, index) => {
                        return  <ApxtextIndexValue 
                                    key={index}
                                    value={newQuote.company_name ? newQuote.company_name[name] : ''}
                                    label={locale.form.field[name]}
                                />
                    })
                }
                    <ApxtextIndexValue 
                        value={newQuote.company_name ? newQuote.company_name.phone_code.value +" "+ newQuote.company_name.phone : ''}
                        label={locale.form.field.phone}
                    />
                    <ApxtextIndexValue 
                        value={newQuote.company_name ? newQuote.company_name.addresses_street +" "+ newQuote.company_name.addresses_zip  + " " + newQuote.company_name.addresses_city + " " + newQuote.company_name.addresses_country[localStorage.getItem('locale')] : ''}
                        label={locale.form.field.addresses_street}
                    />
            </div>
        )
}



export default connect(null, { createState  })(ContactSection);