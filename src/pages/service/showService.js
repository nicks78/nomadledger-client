//manager/src/pages/service/showService.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getItem, createState, updateItem, resetState } from '../../redux/library/actions'
import {setNotification} from '../../redux/notification/actions'
import { withStyles, Typography, TextField, Grid, Button} from '@material-ui/core';
import ApxAlert from '../../components/common/alert'
import Spinner from '../../components/common/spinner'
import ApxPaper from '../../components/common/paper'
import ApxBackBtn from '../../components/common/backBtn'
import EditSelect from '../../lib/editSelect'
import { cvtToLocale, checkNumFormatRegex } from '../../utils/help_function'


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
      const {classes, service, isFetching, locale, category, isUpdating, currency, service_type} = this.props
      const {reducer} = this.state

      if( isFetching ){
        return <Spinner/>
      }
      if( service === null ){
        return <ApxAlert message="error_404" />
      }

      return (
        <ApxPaper styled={{padding: 24}}>
          <ApxBackBtn/>
            <Typography variant="h2" align="center">
              { service.name}
            </Typography>
            <br />

            <Grid container spacing={8}>
              <Grid item xs={12}>
              <TextField
                    id="name"
                    variant="outlined"
                    type="text"
                    margin="dense"
                    required
                    className={classes.textField}
                    label={locale.wording.name}
                    value={service.name}
                    fullWidth
                    onChange={ (e) => { this.props.createState(reducer, "name", e.target.value) } }
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                  <EditSelect
                    showEdit={true}
                    variant="outlined"
                    arrayField={currency}
                    field="currency"
                    required={true}
                    value={service.currency[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "currency", e.target.value) } }
                    locale={locale}
                  />
                  <TextField
                    id="price"
                    variant="outlined"
                    className={classes.textField}
                    style={{ wapInputFormat: 'N'}}
                    margin="dense"
                    fullWidth
                    required
                    label={locale.wording.price}
                    value={  cvtToLocale( service.price  ) }
                    onChange={ (e) => {
                        if(checkNumFormatRegex(e.target.value) === false){
                           this.props.setNotification("error_422_price", "warning")
                        }else{
                          this.props.createState(reducer, "price", e.target.value)
                        }
                      }}
                  />
              </Grid>

              <Grid item xs={12} md={6}>
                <EditSelect
                    showEdit={true}
                    variant="outlined"
                    arrayField={category}
                    field="category"
                    required={true}
                    value={service.category[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "category", e.target.value) } }
                    locale={locale}
                  />
                  <EditSelect
                    showEdit={true}
                    required={true}
                    variant="outlined"
                    arrayField={service_type}
                    field="service_type"
                    value={service.service_type[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "service_type", e.target.value) } }
                    locale={locale}
                  />


              </Grid>
            </Grid>

            <TextField variant="outlined"
                      label={locale.wording.description }
                      fullWidth
                      multiline
                      rows={6}
                      className={classes.textField}
                      margin="normal"
                      value={ service.description }
                      onChange={ (e) => {this.props.createState(reducer, "description",  e.target.value)} }
            />

            <br /><br />
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
    },
    textField: {
        fontWeight: 300,
        marginTop: 0,
        "& span": {
          color: `${theme.palette.secondary.main} !important`
        }
    },
})

const mapStateToProps = (state) => {
  return {
      isFetching: state.library.service.isFetching,
      isUpdating: state.library.service.isUpdating,
      service: state.library.service.item,
      locale: state.locale.locale,
      category: state.account.company.item ?  state.account.company.item.category_name : [],
      currency: state.helper.items.currency,
      service_type: state.helper.items.service_type

  }
}

const StyledShowService = withStyles(styles)(ShowService)

export default connect(mapStateToProps, {  getItem, createState, updateItem, resetState , setNotification})(StyledShowService);
