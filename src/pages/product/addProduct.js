//manager/src/pages/product/addProduct.js

import React from 'react'
import AddItem from '../../components/lib/addItem'

const AddProduct = (props) => {

    const {locale} = props

    const fields = [
      {
        title: locale.form.title.add_product, 
        label: locale.form.title.label_product,
        fields: [
            {
              name: 'product_name',
              type:"text"
            },
            {
              name: 'price',
              type:"number"
            },
            {
              name: 'vat',
              type:"text"
            },
            {
              name: 'description',
              type:"text"
            }
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
            limitUploadFile={2}
            createItem={ props.createItem }
            createItemState={ props.createItemState }
            />
      </div>
    )
}

export default AddProduct;
