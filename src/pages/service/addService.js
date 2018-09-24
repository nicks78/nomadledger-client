//manager/src/pages/service/addService.js

import React from 'react'
import AddItem from '../../components/lib/addItem'

const AddService = (props) => {

    const {locale} = props

    const fields = [
      {
        title: locale.form.title.add_service, 
        label: locale.form.title.label_service,
        fields: [
            {
              name: 'service_name',
              type:"text"
            },
          ]
      }
    ]

    return (
      <div>
          <AddItem 
            formFields={fields} 
            locale={locale} 
            newData={props.newData} 
            addBtnTitle={ locale.button.add_service } 
            headerText={ locale.form.title.add_service }
            limitUploadFile={1}
            createItem={ props.createItem }
            createItemState={ props.createItemState }
            />
      </div>
    )
}

export default AddService;
