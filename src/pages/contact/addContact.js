//manager/src/pages/client/addContact.js

import React from 'react'
import AddItem from '../../lib/addItem'


const AddContact = (props) => {

  const { locale, contactGroup, country } = props

  const fields = [
    {
      title: locale.subheading.add_contact,
      label: locale.subheading.label_company,
      section_1: false,
      fields: [
        { name: 'company_name', type: "text", required: true },
        { name: 'contact_group', type: "select", selections: contactGroup, required: true },
        { name: 'company_register', type: "text" },
        { name: 'company_vat', type: "text" },
        { name: 'addresses_street', type: "text" },
        { name: 'addresses_zip', type: "text", length: 10 },
        { name: 'addresses_city', type: "text" },
        { name: 'addresses_country', type: "select", selections: country }
      ]
    },
    {
      title: locale.subheading.add_contact,
      label: locale.subheading.label_contact,
      fields: [
        { name: 'firstname', type: "text", required: true },
        { name: 'lastname', type: "text", required: true },
        // { name: 'phone_code', type:"select", selections: country, helperText: "select_phone_code", required: true },
        { name: 'phoneNumber', type: "text", required: true, length: 15 },
        { name: 'email', type: "email", required: true }
      ]
    }
  ]
  return (

    <div>

      <AddItem
        formFields={fields}
        locale={locale}
        newData={props.newData}
        addBtnTitle={locale.wording.create}
        headerText={locale.subheading.add_contact}
        limitUploadFile={1}
        isUploading={props.isUploading}
        isCreating={props.isCreating}
        progress={props.progress}
        reducer="CONTACT"
        createItem={props.createContact}
        {...props}
        createItemState={props.createContactState}
      />
    </div>

  )
}

export default AddContact;
