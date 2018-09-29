//manager/src/pages/provider/addProvider.js

import React from 'react'
import AddItem from '../../components/lib/addItem'

const AddProvider = (props) => {

    const {locale} = props

    const fields = [
      {
        title: locale.form.title.add_provider, 
        label: locale.form.title.label_provider,
        fields: [
            {
              name: 'company_name',
              type:"text"
            },
            {
              name: 'price',
              type:"number"
            },
            {
              name: 'vat',
              type:"text"
            },
            {
              name: 'description',
              type:"text"
            }
          ]
      }
    ]

    return (
      <div>
          <AddItem 
            formFields={fields} 
            locale={locale} 
            newData={props.newData} 
            addBtnTitle={ locale.button.add_provider } 
            headerText={ locale.form.title.add_provider }
            limitUploadFile={3}
            createItem={ props.createItem }
            createItemState={ props.createItemState }
            />
      </div>
    )
}

export default AddProvider;
