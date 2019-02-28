//manager/src/pages/expense/addExpense.js

import React from 'react'
import AddItem from '../../lib/addItem'
import {currency} from '../../utils/static_data'

const AddExpense = (props) => {

    const {locale, category} = props

    const fields = [
      {
        title: locale.form.title.add_expense, 
        label: locale.form.title.label_expense,
        fields: [
            { name: 'receipt_date', type:"date"},
            { name: 'name', type:"text", required: true },
            { name: 'category', type:"select", selections: category, helperText: "select_category", required: true },
            { name: 'currency', type:"select", selections: currency, helperText: "select_currency", required: true },
            { name: 'price', type:"number", required: true},
            
            { name: 'description', type:"longtext", multiline: true, rowsMax:"4" },
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
