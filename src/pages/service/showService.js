//manager/src/pages/service/showService.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getItem, createState, updateItem, resetState } from '../../redux/library/actions'
import { withStyles, Typography, TextField, Grid, Button} from '@material-ui/core';
import ApxAlert from '../../components/common/alert'
import Spinner from '../../components/common/spinner'
import ApxPaper from '../../components/common/paper'
import ApxBackBtn from '../../components/common/backBtn'
import EditSelect from '../../lib/editSelect'


class ShowService extends Component {

    state = {
      reducer: "SERVICE"
    }

    componentDidMount(){
      var id = this.props.match.params.id;
      this.props.getItem(this.state.reducer, id)
    }

    componentWillUnmount(){
      this.props.resetState(this.state.reducer)
    }



    render() {
      const {classes, service, isFetching, locale, isError, message, category, isUpdating, currency, service_type} = this.props
      const {reducer} = this.state

      if( isFetching ){
        return <Spinner/>
      }
      if( service === null ){
        return <ApxAlert message="error_404" />
      }

      return (
        <ApxPaper>
          <ApxBackBtn/>
            <Typography variant="h2">
              { service.name}
            </Typography>
            <br />
            {isError ? <ApxAlert message={message} /> : null }
            <Grid container spacing={8}>
              <Grid item xs={12}>
              <TextField 
                    id="name"
                    variant="filled" 
                    type="text"
                    margin="dense"
                    label={locale.wording.name}
                    value={service.name}
                    fullWidth
                    onChange={ (e) => { this.props.createState(reducer, "name", e.target.value) } }
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                  <EditSelect 
                    showEdit={true}
                    variant="filled" 
                    arrayField={currency}
                    field="currency"
                    value={service.currency[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "currency", e.target.value) } }
                    locale={locale}
                  />
                  <br />
                  <TextField 
                    id="price"
                    variant="filled" 
                    margin="dense"
                    fullWidth
                    label={locale.wording.price}
                    value={service.price}
                    onChange={ (e) => { this.props.createState(reducer, "price", e.target.value) } }
                  />
              </Grid>

              <Grid item xs={12} md={6}>
                <EditSelect 
                    showEdit={true}
                    variant="filled" 
                    arrayField={category}
                    field="category"
                    value={service.category[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "category", e.target.value) } }
                    locale={locale}
                  />
                  <EditSelect 
                    showEdit={true}
                    variant="filled" 
                    arrayField={service_type}
                    field="service_type"
                    value={service.service_type[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "service_type", e.target.value) } }
                    locale={locale}
                  />
                  

              </Grid>
            </Grid>

            <TextField variant="filled"
                      label={locale.wording.description } 
                      fullWidth
                      multiline
                      rows={6}
                      className={classes.margin} 
                      margin="normal"
                      value={ service.description } 
                      onChange={ (e) => {this.props.createState(reducer, "description",  e.target.value)} }
            />
           
            <br />
            <Button 
                variant="contained" 
                color="primary" 
                disabled={ isUpdating }
                className={ classes.btnSave } 
                onClick={ () => { this.props.updateItem(reducer, `update`)} }>
                { !isUpdating ?  locale.wording.update : locale.wording.loading }</Button>
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
      isUpdating: state.library.service.isUpdating,
      isError: state.library.service.isError,
      message: state.library.service.message,
      service: state.library.service.item,
      locale: state.locale.locale,
      category: state.account.company.item ?  state.account.company.item.category_name : [],
      currency: state.helper.items.currency,
      service_type: state.helper.items.service_type

  }
}

const StyledShowService = withStyles(styles)(ShowService)

export default connect(mapStateToProps, {  getItem, createState, updateItem, resetState })(StyledShowService);