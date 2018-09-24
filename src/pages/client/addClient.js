//manager/src/pages/client/addClient.js

import React  from 'react'
import AddItem from '../../components/lib/addItem'


const AddClient = (props) => {    

    const {locale} = props

    const fields = [
      {
        title: locale.form.title.add_client, 
        label: locale.form.title.label_company,
        fields: [
            { name: 'company',type:"text" },
            { name: 'register',type:"text"},
            { name: 'vat', type:"number" },
            { name: 'address', type:"text" },
            { name: 'zip', type:"text" },
            { name: 'city', type:"text" },
            { name: 'country', type:"text" }
          ]
      },
      {
        title: locale.form.title.add_client, 
        label: locale.form.title.label_client,
        fields: [
            { name: 'firstname',type:"text" },
            { name: 'lastname',type:"text"},
            { name: 'phone_code', type:"text" },
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
            addBtnTitle={ locale.button.add_client } 
            headerText={ locale.form.title.add_client }
            limitUploadFile={1}
            createItem={ props.createClient }
            createItemState={ props.createClientState }
            />
      </div>
            
    )
}

export default AddClient;