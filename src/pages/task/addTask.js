//src/pages/task/addTask.js

import React from 'react'
import AddItem from '../../lib/addItem'

const AddTask = (props) => {

    const {locale, status} = props

    const fields = [
      {
        title: locale.subheading.add_task, 
        label: locale.subheading.label_task,
        fields: [
            { name: 'due_date', type:"date"},
            { name: 'subject', type:"text" },
            { name: 'status', type:"select", selections: status, helperText: "select_status" },            
            { name: 'short_desc', type:"longtext", multiline: true, rowsMax:"4" }
          ]
      }
    ]

    return (
      <div>
          <AddItem 
            formFields={fields} 
            locale={locale} 
            disabled={props.disabled}
            newData={props.newData} 
            addBtnTitle={ locale.wording.create } 
            headerText={ locale.subheading.add_task }
            limitUploadFile={0}
            reducer="TASK"
            isCreating={ props.isCreating }
            createItem={ props.createTask }
            createItemState={ props.createTaskState }
            upload={false}
            />
      </div>
    )
}

export default AddTask;
