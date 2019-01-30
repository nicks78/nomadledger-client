//manager/src/pages/service/showService.js

import React from 'react'
import {connect} from 'react-redux'
import { getItem, createState, updateItem, resetState } from '../../redux/actions'
import { Paper, withStyles, Typography, TextField, Grid, Button} from '@material-ui/core';
import {ApxAlert, Spinner, ApxPaper, ApxBackBtn} from '../../components/common'
import EditSelect from '../../lib/editSelect'
import {currency} from '../../utils/static_data'

class ShowService extends React.Component {

    componentDidMount(){
      var id = this.props.match.params.id;
      this.props.getItem("SERVICE", id)
    }

    componentWillUnmount(){
      this.props.resetState("SERVICE")
    }



    render() {
      const {classes, service, isFetching, locale, isError, message, category} = this.props

      if( isFetching ){
        return <Spinner/>
      }
      if( service === null ){
        return <ApxAlert message="error_404" />
      }
      if( isError ){
        return <ApxAlert message={message} />
      }

      const fields = [
        {
          title: locale.form.title.add_service, 
          label: locale.form.title.label_service,
          section_1: false,
          fields: [
              { name: 'name', type:"text" },
              { name: 'currency', type:"select", selections: currency, helperText: "select_currency" },
              { name: 'price', type:"text"},
              { name: 'category', type:"select", selections: category, helperText: "select_category" },
              { name: 'description', type:"longtext", multiline: true, rowsMax:"4" },
            ]
        },
      ]

      return (
        <ApxPaper>
          <ApxBackBtn/>
            <Typography variant="h2">
              { service.name}
            </Typography>
            <br />

            <Grid container spacing={24}>
              <Grid item xs={12} md={6}>
                  <TextField 
                    id="name"
                    type="text"
                    label={locale.form.field.name}
                    value={service.name}
                    fullWidth
                    onChange={ (e) => { this.props.createState("SERVICE", "name", e.target.value) } }
                  />
                  <br />
                  <TextField 
                    id="price"
                    type="number"
                    fullWidth
                    label={locale.form.field.price}
                    value={service.price}
                    onChange={ (e) => { this.props.createState("SERVICE", "price", e.target.value) } }
                  />
              </Grid>

              <Grid item xs={12} md={6}>
                <EditSelect 
                    showEdit={true}
                    arrayField={category}
                    field="category"
                    value={service.category[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState("SERVICE", "category", e.target.value) } }
                    locale={locale}
                  />
                  <EditSelect 
                    showEdit={true}
                    arrayField={currency}
                    field="currency"
                    value={service.currency[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState("SERVICE", "currency", e.target.value) } }
                    locale={locale}
                  />

              </Grid>
            </Grid>
           
            <br />
            <Button variant="contained" color="secondary" className={ classes.btnSave } onClick={ () => { this.props.updateItem("SERVICE", service._id)} }>{ locale.button.update }</Button>
        </ApxPaper>
      )
    }
}

const styles = theme => ({
    paper: {
      padding: 24,
      overflow: 'hidden'
    },
    btnSave: {
      float: 'right'
    }
})

const mapStateToProps = (state) => {
  return {
      isFetching: state.library.service.isFetching,
      isError: state.library.service.isError,
      message: state.library.service.message,
      service: state.library.service.item,
      locale: state.locale.locale,
      category: state.account.company.item ?  state.account.company.item.category_name : []

  }
}

const StyledShowService = withStyles(styles)(ShowService)

export default connect(mapStateToProps, {  getItem, createState, updateItem, resetState })(StyledShowService);