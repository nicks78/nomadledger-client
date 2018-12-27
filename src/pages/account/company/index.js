//manager/src/pages/account/company/index.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {  updateDocument, uploadFileToServer } from '../actions'
import {API_ENDPOINT} from '../../../utils/constant'
import { withStyles } from '@material-ui/core'
import {company_type} from '../../../utils/static_data'
import { ApxAlert, ApxButtonEdit, ApxDatePicker, ApxtextIndexValue } from '../../../components/common'
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
    marginBottom: 10
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

  openEdit = () => {
    this.setState({showEdit: !this.state.showEdit})
  }

  updateDocument = () => {
    this.setState({showEdit: false})
    this.props.updateDocument(this.state.reducer)
  }

  render() {
    const {company, progress, isUploading, locale, classes, isError, message} = this.props;
    const {showEdit, reducer} = this.state;

    const address = ["addresses_street", "addresses_zip", "addresses_city"]

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
                    image={ <img src={`${API_ENDPOINT}image/view${ company.company_logo.path || '/default/default_logo.png' }`} alt="logo" width="100%" height={null} />}
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
                    onChange={ (event) => { this.props.handleFormEdit(event, reducer) }} 
                    name="company_name"
                    className={ classes.input }
                />  : company.company_name }
              </Typography>

              <Grid container spacing={8}>

                  <Grid item xs={12} md={5}>

                  { isError && <ApxAlert message={message} /> }
                  <Typography variant="subtitle2">
                      {locale.form.title.label_comp_info}
                    </Typography>
                  <Divider className={ classes.divider }/>
                  
                  <EditSelect 
                        arrayField={company_type}
                        field="company_type"
                        helperText="select_service_type"
                        handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
                        locale={locale}
                        showEdit={showEdit}
                        label={locale.form.field.company_type}
                        value={ company.company_type[localStorage.getItem("locale")]}
                    />
                  <EditInput 
                      label={ locale.form.field.company_register }
                      value={ company.company_register}
                      showEdit={showEdit}
                      locale={locale}
                      field="company_register"
                      handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
                  />
                  <EditInput 
                      label={ locale.form.field.company_vat }
                      value={ company.company_vat}
                      showEdit={showEdit}
                      locale={locale}
                      field="company_vat"
                      handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
                  />
                  <br />
                  <Typography variant="subtitle2">
                        {locale.form.title.label_tax}
                    </Typography>
                    <Divider className={ classes.divider }/>

                    {
                        showEdit ? 
                            <ApxDatePicker 
                                handleDate={ (event) => { this.props.handleFormEdit(event, reducer) }}
                                value={company.start_date.label}
                                label={locale.form.title.label_start_tax}
                                field="start_date"
                            />
                        : 
                        <ApxtextIndexValue 
                            value={company.start_date.label} 
                            label={locale.form.title.label_start_tax}
                        /> 
                    }
                     {
                        showEdit ? 
                            <ApxDatePicker 
                                handleDate={ (event) => { this.props.handleFormEdit(event, reducer) }}
                                value={company.end_date.label} 
                                label={locale.form.title.label_end_tax}
                                field="end_date"
                            />
                        : 
                        <ApxtextIndexValue 
                            value={company.end_date.label} 
                            label={locale.form.title.label_end_tax}
                        /> 
                    }
                </Grid>
                <Grid item xs={12} md={1}></Grid>
                <Grid item xs={12} md={5}>
                <Typography variant="subtitle2">
                        {locale.form.title.label_comp_address}
                  </Typography>
                  <Divider className={ classes.divider }/>
                  {
                    address.map(( name, index) => {
                      return <EditInput 
                                key={index}
                                label={ locale.form.field[name] }
                                value={ company[name]}
                                showEdit={showEdit}
                                locale={locale}
                                field={name}
                                handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
                            />
                    })
                  }
                  <EditSelect 
                    arrayField={country}
                    field="addresses_country"
                    helperText="select_country_code"
                    handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
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

export default connect(mapStateToProps, { updateDocument, uploadFileToServer })(styledCompany);