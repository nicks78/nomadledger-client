//manager/src/pages/product/addProduct.js

import React from 'react'
import AddItem from '../../lib/addItem'
import {currency} from '../../utils/static_data'


const AddProduct = (props) => {

    const {locale, category} = props

    const fields = [
      {
        title: locale.form.title.add_product, 
        label: locale.form.title.label_product,
        fields: [
          { name: 'name', type:"text", required: true },
          { name: 'buying_price', type:"number"},
          { name: 'price', type:"number"},
          { name: 'stock', type:"number"},
          { name: 'currency', type:"select", selections: currency, helperText: "select_currency" },
          { name: 'category', type:"select", selections: category, helperText: "select_category", required: true  },
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
            addBtnTitle={ locale.button.add_product } 
            headerText={ locale.form.title.add_product }
            limitUploadFile={3}
            isCreating={ props.isCreating }
            reducer="PRODUCT"
            createItem={ props.createItem }
            createItemState={ props.createItemState }
            />
      </div>
    )
}

export default AddProduct;
