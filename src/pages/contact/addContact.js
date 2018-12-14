//manager/src/pages/client/addContact.js

import React  from 'react'
import AddItem from '../../lib/addItem'
import {phone_code, country} from '../../utils/static_data'


const AddContact = (props) => {    

    const {locale, contactGroup} = props

    const fields = [
      {
        title: locale.form.title.add_contact, 
        label: locale.form.title.label_company,
        section_1: false,
        fields: [
            { name: 'company_name',type:"text" },
            { name: 'contact_group', type:"select", selections: contactGroup },
            { name: 'company_register',type:"text"},
            { name: 'company_vat', type:"number"},
            { name: 'addresses_street', type:"text" },
            { name: 'addresses_zip', type:"text" },
            { name: 'addresses_city', type:"text" },
            { name: 'addresses_country', type:"select", selections: country, helperText: "select_country_code" }
          ]
      },
      {
        title: locale.form.title.add_contact, 
        label: locale.form.title.label_contact,
        fields: [
            { name: 'firstname',type:"text" },
            { name: 'lastname',type:"text"},
            { name: 'phone_code', type:"select", selections: phone_code, helperText: "select_phone_code" },
            { name: 'phone', type:"text" },
            { name: 'email', type:"email" }
          ]
      }
    ]
    return (

      <div>
        
          <AddItem 
            formFields={fields} 
            locale={locale} 
            newData={props.newData} 
            addBtnTitle={ locale.button.add_contact } 
            headerText={ locale.form.title.add_contact }
            limitUploadFile={1}
            isCreating={ props.isCreating }
            progress={ props.progress }
            reducer="CONTACT"
            createItem={ props.createContact }
            createItemState={ props.createContactState }
            />
      </div>
            
    )
}

export default AddContact;