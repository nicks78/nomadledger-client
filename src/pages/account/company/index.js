//manager/src/pages/account/company/index.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getAccount, updateDocument, createState, uploadFileToServer } from '../actions'
import { withStyles } from '@material-ui/core'
import {API_ENDPOINT} from '../../../utils/constant'

import {Spinner, ApxAlert, ApxButtonEdit} from '../../../components/common'
import UploadImg from '../../../lib/uploadImg'
import {country} from '../../../utils/static_data'
import EditInput from '../../../lib/editInput'
import EditSelect from '../../../lib/editSelect'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input';

const styles = theme => ({

  divider: {
    clear: 'both',
    // marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    float: 'right',
    backgroundColor: '#008489',
    
  },
  checkicon: {
    color: theme.palette.green
  },
  input: {
    width: '80%'
  }
})


class Company extends Component {

  state = {
      showEdit: false,
      reducer: "COMPANY"
  }


  componentDidMount(){
    // if(this.props.receivedAt === null ){
        this.props.getAccount(this.state.reducer)
    // }
  }

  handleFormEdit  = event => {
      var name = event.target.name;
      var value = event.target.value
      // Temporary save data into redux store
      this.props.createState(this.state.reducer, name, value)
  }

  openEdit = () => {
    this.setState({showEdit: !this.state.showEdit})
  }

  updateDocument = () => {
    this.setState({showEdit: false})
    this.props.updateDocument(this.state.reducer)
  }

  render() {
    const {company, progress, isUploading, locale, classes, isFetching, isError, message} = this.props;
    const {showEdit} = this.state


    if( isFetching  || company === null ){
      return <Spinner />
    }

    return (
      <div>
        <Grid container spacing={16}>
            <Grid item xs={12} md={3}>
                  <UploadImg 
                    field="company_logo"
                    _handleUploadFile={ this.props.uploadFileToServer }
                    reducer={this.state.reducer}
                    progress={progress}
                    oldFile={company.company_logo}
                    isUploading={isUploading}
                    image={ <img src={`${API_ENDPOINT}image/view${ company.company_logo || '/default/default_logo.png' }`} alt="logo" width="100%" height={null} />}
                  />
               
            </Grid>

            <Grid item  xs={12} md={9}>
              <ApxButtonEdit 
                  updateDocument={this.updateDocument}
                  openEdit={this.openEdit} 
                  showEdit={showEdit}
              />
              <Typography variant="h1">
              { showEdit ? 
                <Input
                    defaultValue={ company.company_name}
                    placeholder={ locale.form.field.company_name }
                    onChange={this.handleFormEdit}
                    name="company_name"
                    className={ classes.input }
                />  : company.company_name }
              </Typography>

              <Grid container spacing={8}>

                  <Grid item xs={12} md={5}>

                  { isError && <ApxAlert message={message} /> }

                  <EditInput 
                      label={ locale.form.field.company_register }
                      value={ company.company_register}
                      showEdit={showEdit}
                      locale={locale}
                      field="company_register"
                      handleAction={this.handleFormEdit}
                  />
                  <EditInput 
                      label={ locale.form.field.company_vat }
                      value={ company.company_vat}
                      showEdit={showEdit}
                      locale={locale}
                      field="company_vat"
                      handleAction={this.handleFormEdit}
                  />

      <Divider className={classes.divider}/>
                  <EditInput 
                      label={ locale.form.field.addresses_street }
                      value={ company.addresses_street}
                      showEdit={showEdit}
                      locale={locale}
                      field="addresses_street"
                      handleAction={this.handleFormEdit}
                  />
                  <EditInput 
                      label={ locale.form.field.addresses_zip }
                      value={ company.addresses_zip}
                      showEdit={showEdit}
                      locale={locale}
                      field="addresses_zip"
                      handleAction={this.handleFormEdit}
                  />
                  <EditInput 
                      label={ locale.form.field.addresses_city }
                      value={ company.addresses_city}
                      showEdit={showEdit}
                      locale={locale}
                      field="addresses_city"
                      handleAction={this.handleFormEdit}
                  />

                  <EditSelect 
                    arrayField={country}
                    field="addresses_country"
                    helperText="select_country_code"
                    handleAction={ this.handleFormEdit }
                    locale={locale}
                    showEdit={showEdit}
                    label={locale.form.field.addresses_country }
                    value={ company.addresses_country[localStorage.getItem("locale")]}
                />
              

                  </Grid>
        
              </Grid>
            </Grid>
        </Grid>
          
      </div>
    )
  }
}

const mapStateToProps = (state) => {

    return {
        isFetching: state.account.company.isFetching,
        isError: state.account.company.isError,
        message: state.account.company.message,
        receivedAt: state.account.company.receivedAt,
        isUploading: state.account.company.isUploading,
        locale: state.locale.locale,
        company: state.account.company.item, 
        progress: state.account.company.progress
    }
}

const styledCompany = withStyles(styles)(Company);

export default connect(mapStateToProps, { getAccount, updateDocument, createState, uploadFileToServer })(styledCompany);