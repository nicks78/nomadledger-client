//manager/src/pages/bookkeeping/contactSection.js

import React from 'react'
import { connect } from 'react-redux'
import { createState } from '../../../redux/book/actions'
import ApxtextIndexValue from '../../../components/common/textIndexValue'
import AutoComplete from '../../../lib/autoComplete'
import ModalEditContact from './modalEditContact'


const ContactSection = (props) => {

    const { locale, contact, reducer } = props;

    return (
        <div>
            <div style={{ padding: 10 }}>

                <AutoComplete
                    field="company_name"
                    state="contact_id"
                    model="contact"
                    reducer={reducer}
                    placeholder={locale.wording.search_contact + " *"}
                    setSelectedObject={props.createState}
                />
                <br />
                <ApxtextIndexValue
                    value={contact.contact_id ? <ModalEditContact item={contact.contact_id} reducer={props.reducer} /> : ""}
                    label={locale.wording.company_name}
                />
                <ApxtextIndexValue
                    value={contact.contact_id ? contact.contact_id.firstname : ''}
                    label={locale.wording.firstname}
                />
                <ApxtextIndexValue
                    value={contact.contact_id ? contact.contact_id.lastname : ''}
                    label={locale.wording.lastname}
                />
                <ApxtextIndexValue
                    value={contact.contact_id ? contact.contact_id.email.toLowerCase() : ''}
                    label={locale.wording.email}
                />
                <ApxtextIndexValue
                    value={contact.contact_id ? contact.contact_id.phoneNumber : ''}
                    label={locale.wording.phone}
                />
                <ApxtextIndexValue
                    value={contact.contact_id ? contact.contact_id.addresses_street + " " + contact.contact_id.addresses_zip + " " + contact.contact_id.addresses_city + " " + (contact.contact_id.addresses_country ? contact.contact_id.addresses_country[localStorage.getItem('locale')] : "") : ''}
                    label={locale.wording.addresses_street}
                />
                <br />
            </div>
        </div>
    )
}



export default connect(null, { createState })(ContactSection);
