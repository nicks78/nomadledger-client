//src/pages/task/addTask.js

import React from 'react'
import AddItem from '../../lib/addItem'

const AddTask = (props) => {

    const {locale} = props

    const fields = [
      {
        title: locale.form.title.add_task, 
        label: locale.form.title.label_task,
        fields: [
            { name: 'due_date', type:"date"},
            { name: 'subject', type:"text" },            
            { name: 'short_desc', type:"longtext", multiline: true, rowsMax:"4" }
          ]
      }
    ]

    return (
      <div>
          <AddItem 
            formFields={fields} 
            locale={locale} 
            newData={props.newData} 
            addBtnTitle={ locale.button.add_task } 
            headerText={ locale.form.title.add_task }
            limitUploadFile={1}
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
