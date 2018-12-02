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
    const {locale, newData} = this.props

    const fields = [
      {
        title: locale.form.title.add_service, 
        label: locale.form.title.label_service,
        section_1: false,
        fields: [
            { name: 'service_name',type:"text" },
            { name: 'service_description',type:"text"},
            { name: 'service_price', type:"text"},
            { name: 'service_note', type:"longtext", multiline: true, rowsMax:"4" },
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
