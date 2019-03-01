//manager/src/pages/service/addService.js

import React from 'react'
import AddItem from '../../lib/addItem'

class AddService extends React.Component {

  state = {
      reducer: "SERVICE"
  };

  toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
  }

  handleChange = name => (event) => {
        var fieldName = name;
        var value = event.target.value
        this.props.createServiceState( this.state.reducer, fieldName, value )
  }

  render(){
    const {locale, newData, category, currency} = this.props

    const fields = [
      {
        title: locale.form.title.add_service, 
        label: locale.form.title.label_service,
        section_1: false,
        fields: [
            { name: 'name', type:"text", required: true },
            { name: 'currency', type:"select", selections: currency, helperText: "select_currency" , required: true },
            { name: 'price', type:"text", required: true },
            { name: 'category', type:"select", selections: category, helperText: "select_category", required: true  },
            { name: 'description', type:"longtext", multiline: true, rowsMax:"4" },
          ]
      },
    ]
    return (

          <AddItem 
            formFields={fields} 
            locale={locale} 
            newData={newData} 
            addBtnTitle={ locale.button.add_service } 
            headerText={ locale.form.title.add_service }
            limitUploadFile={0}
            isCreating={ this.props.isCreating }
            progress={ this.props.progress }
            reducer="SERVICE"
            createItem={ this.props.createService || null  }
            createItemState={ this.props.createServiceState }
            />
    )
  }
}

export default AddService;
