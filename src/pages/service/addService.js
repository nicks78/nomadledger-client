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
    const {locale, newData, category, currency, service_type} = this.props

    const fields = [
      {
        title: locale.subheading.add_service, 
        label: locale.subheading.label_service,
        section_1: false,
        fields: [
            { name: 'name', type:"text", required: true },
            { name: 'currency', type:"select", selections: currency, helperText: "select_currency" , required: true },
            { name: 'price', type:"text", required: true },
            { name: 'service_type', type:"select", selections: service_type, helperText: "select_service_type", required: true },
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
            addBtnTitle={ locale.wording.create } 
            headerText={ locale.subheading.add_service }
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
