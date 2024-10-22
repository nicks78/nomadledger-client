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
          { name: 'name', type:"text", required: true, length: 50 },
          { name: 'buying_price', type:"number", required: true},
          { name: 'selling_price', type:"number", required: true},
          { name: 'stock', type:"number"},
          { name: 'currency', type:"select", selections: currency, required: true},
          { name: 'category', type:"select", selections: category, required: true  },
          { name: 'weight', type:"text"},
          { name: 'size', type:"text"},
          { name: 'color', type:"text"},
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
