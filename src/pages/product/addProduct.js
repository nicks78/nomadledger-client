//manager/src/pages/product/addProduct.js

import React from 'react'
import AddItem from '../../lib/addItem'

const AddProduct = (props) => {

    const {locale, category} = props

    const fields = [
      {
        title: locale.form.title.add_product, 
        label: locale.form.title.label_product,
        fields: [
          { name: 'product_name', type:"text" },
          { name: 'product_price', type:"text"},
          { name: 'product_category', type:"select", selections: category, helperText: "select_category" },
          { name: 'product_description', type:"longtext", multiline: true, rowsMax:"4" },
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
