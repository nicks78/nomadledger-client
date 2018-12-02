//manager/src/pages/expense/addExpense.js

import React from 'react'
import AddItem from '../../lib/addItem'

const AddExpense = (props) => {

    const {locale} = props

    const fields = [
      {
        title: locale.form.title.add_expense, 
        label: locale.form.title.label_expense,
        fields: [
            {
              name: 'expense_name',
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
            addBtnTitle={ locale.button.add_expense } 
            headerText={ locale.form.title.add_expense }
            limitUploadFile={1}
            reducer="EXPENSE"
            isCreating={ props.isCreating }
            createItem={ props.createExpense }
            createItemState={ props.createExpenseState }
            upload={false}
            />
      </div>
    )
}

export default AddExpense;
