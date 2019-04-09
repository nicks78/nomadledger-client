//manager/src/pages/bookkeeping/contactSection.js

import React from 'react'
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import { createState } from '../../../redux/book/actions'
import ApxtextIndexValue from '../../../components/common/textIndexValue'
import AutoComplete from '../../../lib/autoComplete'


const ContactSection = (props) => {

        const { locale, contact, reducer } = props;

        var infoContact = [ "firstname", "lastname", "email"];

        return (
            <div style={{padding: 10,}}>
                <AutoComplete 
                    field="company_name"
                    state="contact_id"
                    model="contact"
                    reducer={reducer}
                    placeholder={locale.wording.search_contact + " *"}
                    setSelectedObject={ props.createState }
                />
                <br />
                <ApxtextIndexValue 
                    value={contact.contact_id ? <Link to={{ pathname: `/contact/view/${contact.contact_id._id}`, state: { reducer: "CONTACT" } }}>{contact.contact_id.company_name}</Link> : ''}
                    label={locale.wording.company_name}
                />
                {
                    infoContact.map((name, index) => {
                        return  <ApxtextIndexValue 
                                    key={index}
                                    value={contact.contact_id ? contact.contact_id[name] : ''}
                                    label={locale.wording[name]}
                                />
                    })
                }
                    <ApxtextIndexValue 
                        value={contact.contact_id ? contact.contact_id.phone_code.value +" "+ contact.contact_id.phone : ''}
                        label={locale.wording.phone}
                    />
                    <ApxtextIndexValue 
                        value={contact.contact_id ? contact.contact_id.addresses_street +" "+ contact.contact_id.addresses_zip  + " " + contact.contact_id.addresses_city + " " + contact.contact_id.addresses_country[localStorage.getItem('locale')] : ''}
                        label={locale.wording.addresses_street}
                    />
                    <br />
            </div>
        )
}



export default connect(null, { createState  })(ContactSection);