//manager/src/pages/client/addContact.js

import React  from 'react'
import AddItem from '../../components/lib/addItem'
import {phone_code, country} from '../../utils/static_data'


const CreateInvoice = (props) => {    

    const {locale} = props

    const fields = [
      {
        title: locale.form.title.add_contact, 
        label: locale.form.title.label_company,
        section_1: false,
        fields: [
            { name: 'price',type:"text" },

          ]
      },
      {
        title: locale.form.title.add_contact, 
        label: locale.form.title.label_contact,
        fields: [
            { name: 'description', type:"text" },
            
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

export default CreateInvoice;