//manager/src/pages/bookkeeping/contactSection.js

import React from 'react'
import {connect} from 'react-redux'
import { createState } from '../actions'
import { ApxtextIndexValue } from '../../../components/common'
import AutoComplete from '../../../lib/autoComplete'


const ContactSection = (props) => {

        const { locale, contact } = props;

        var infoContact = ["company_name", "firstname", "lastname", "email"];

        return (
            <div>
                <AutoComplete 
                    field="company_name"
                    state="contact_id"
                    model="contact"
                    reducer="QUOTE"
                    placeholder={locale.form.field.search_contact}
                    setSelectedObject={ props.createState }
                />
                <br />
                {
                    infoContact.map((name, index) => {
                        return  <ApxtextIndexValue 
                                    key={index}
                                    value={contact.contact_id ? contact.contact_id[name] : ''}
                                    label={locale.form.field[name]}
                                />
                    })
                }
                    <ApxtextIndexValue 
                        value={contact.contact_id ? contact.contact_id.phone_code.value +" "+ contact.contact_id.phone : ''}
                        label={locale.form.field.phone}
                    />
                    <ApxtextIndexValue 
                        value={contact.contact_id ? contact.contact_id.addresses_street +" "+ contact.contact_id.addresses_zip  + " " + contact.contact_id.addresses_city + " " + contact.contact_id.addresses_country[localStorage.getItem('locale')] : ''}
                        label={locale.form.field.addresses_street}
                    />
            </div>
        )
}



export default connect(null, { createState  })(ContactSection);