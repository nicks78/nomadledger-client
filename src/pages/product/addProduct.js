//manager/src/pages/product/addProduct.js

import React from 'react'
import AddItem from '../../lib/addItem'

const AddProduct = (props) => {

    const {locale, category, currency} = props

    const fields = [
      {
        title: locale.subheading.add_product, 
        label: locale.subheading.label_product,
        fields: [
          { name: 'name', type:"text", required: true },
          { name: 'buying_price', type:"text", required: true},
          { name: 'selling_price', type:"text", required: true},
          { name: 'stock', type:"number"},
          { name: 'currency', type:"select", selections: currency, helperText: "select_currency", required: true},
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
            addBtnTitle={ locale.wording.create } 
            headerText={ locale.subheading.add_product }
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
