//manager/src/pages/service/addService.js

import React from 'react'
import AddItem from '../../lib/addItem'

const AddService = (props) => {
  
    const {locale, newData, category, currency, service_type} = props

    const fields = [
      {
        title: locale.subheading.add_service,
        label: locale.subheading.label_service,
        section_1: false,
        fields: [
            { name: 'name', type:"text", required: true, length: 50},
            { name: 'currency', type:"select", selections: currency, required: true },
            { name: 'price', type:"text", required: true },
            { name: 'service_type', type:"select", selections: service_type, required: true },
            { name: 'category', type:"select", selections: category, required: true  },
            { name: 'description', type:"longtext", multiline: true, rowsMax:"4" },
          ]
      },
    ]
    return (

          <AddItem
            formFields={fields}
            locale={locale}
            newData={newData}
            addBtnTitle={ locale.wording.create }
            headerText={ locale.subheading.add_service }
            limitUploadFile={0}
            isCreating={ props.isCreating }
            progress={ props.progress }
            reducer="SERVICE"
            createItem={ props.createService || null  }
            createItemState={ props.createServiceState }
            />
    )
}

export default AddService;
