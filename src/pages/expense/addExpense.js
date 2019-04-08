//manager/src/pages/expense/addExpense.js

import React from 'react'
import AddItem from '../../lib/addItem'

const AddExpense = (props) => {

    const {locale, category, currency, vat} = props

    const fields = [
      {
        title: locale.subheading.add_expense, 
        label: locale.subheading.label_expense,
        fields: [
            { name: 'receipt_date', type:"date"},
            { name: 'name', type:"text", required: true, length: 50 },
            { name: 'category', type:"select", selections: category, helperText: "select_category", required: true },
            { name: 'currency', type:"select", selections: currency, helperText: "select_currency", required: true },
            { name: 'vat', type:"select", selections: vat, helperText: "select_vat", required: true },
            { name: 'quantity', type:"number", required: true},
            { name: 'price', type:"text", required: true},
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
            addBtnTitle={ locale.wording.create } 
            headerText={ locale.subheading.add_expense }
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
