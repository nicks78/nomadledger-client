//manager/src/pages/account/company/index.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {  updateDocument, uploadFileToServer } from '../../../redux/account/actions'
import { DEFAULT_IMG} from '../../../redux/constant'
import { withStyles, TextField, InputAdornment } from '@material-ui/core'
import ApxButtonEdit from '../../../components/common/buttonEdit'
import DatePickers from '../../../lib/dayPicker'
import ApxtextIndexValue from '../../../components/common/textIndexValue'
import UploadImg from '../../../lib/uploadImg'
import EditInput from '../../../lib/editInput'
import EditSelect from '../../../lib/editSelect'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import Snackbar from '../../../components/common/snackBar'

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
    width: '91.5%'
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
    const {company, progress, isUploading, locale, classes, isError, message, company_type, country, currency} = this.props;
    const {showEdit, reducer} = this.state;

    const address = ["addresses_street", "addresses_zip", "addresses_city"]

    return (
      <div>
        <Grid container spacing={16}>
            <Grid item xs={12} md={3}>
                  <UploadImg 
                    field="logo_company"
                    _handleUploadFile={ (e) => { this.props.uploadFileToServer("COMPANY", e.target.files[0], 'logo_company', company.logo_company ) }}
                    progress={progress}
                    oldFile={company.logo_company}
                    isUploading={isUploading}
                    image={ <img src={`${ company.logo_company.full_path || DEFAULT_IMG }`} alt="logo" width="80%" height={null} />}
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
                <TextField
                    value={ company.company_name || ""}
                    label={ locale.wording.company_name }
                    onChange={ (event) => { this.props.handleFormEdit(event, reducer) }} 
                    name="company_name"
                    fullWidth
                    variant="filled"
                    className={ classes.input }
                />  : company.company_name }
              </Typography>
              <br />
              <Grid container spacing={8}>

                  <Grid item xs={12} md={5}>

                  <Typography variant="subtitle1">
                      {locale.subheading.label_comp_info}
                    </Typography>
                  <Divider className={ classes.divider }/>
                  
                  <EditSelect 
                        arrayField={company_type}
                        field="company_type"
                        helperText="select_service_type"
                        handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
                        locale={locale}
                        showEdit={showEdit}
                        label={locale.wording.company_type}
                        value={ company.company_type[localStorage.getItem("locale")]}
                    />
                  <EditInput 
                      label={ locale.wording.company_register }
                      value={ company.company_register}
                      showEdit={showEdit}
                      locale={locale}
                      field="company_register"
                      handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
                  />
                  <EditInput 
                      label={ locale.wording.company_vat }
                      value={ company.company_vat}
                      showEdit={showEdit}
                      locale={locale}
                      field="company_vat"
                      handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
                  />
                  <br /><br />
                  <Typography variant="subtitle1">
                        {locale.subheading.label_tax}
                    </Typography>
                    <Divider className={ classes.divider }/>
                    {
                      showEdit ?
                      <EditSelect 
                          arrayField={currency}
                          field="currency"
                          helperText="select_currency"
                          handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
                          locale={locale}
                          showEdit={showEdit}
                          label={locale.subheading.label_currency_fav }
                          value={ company.currency[localStorage.getItem("locale")]}
                      />
                      : 
                      <ApxtextIndexValue 
                            value={company.currency[localStorage.getItem('locale')]} 
                            label={locale.subheading.label_currency_fav}
                        /> 
                    }
                    {
                        showEdit ? 
                            <TextField
                              label={locale.wording.start_date}
                              id="start_date"
                              disabled
                              margin="dense"
                              style={{width: '100%'}}
                              value={company.start_date.label} 
                              variant="filled"
                              InputProps={{
                                  startAdornment: <InputAdornment position="start">
                                      <DatePickers 
                                              handleDate={ (event) => { this.props.handleFormEdit(event, reducer) }}
                                              field="start_date"
                                          /> 
                                  </InputAdornment>,
                              }}
                          />
                        : 
                        <ApxtextIndexValue 
                            value={company.start_date.label} 
                            label={locale.wording.start_date}
                        /> 
                    }
                     {
                        showEdit ? 
                            <TextField
                                label={locale.wording.end_date + " (auto)"}
                                id="end_date"
                                disabled
                                margin="dense"
                                style={{width: '100%'}}
                                value={company.end_date.label} 
                                variant="filled"
                            />
                        : 
                        <ApxtextIndexValue 
                            value={company.end_date.label} 
                            label={locale.wording.end_date}
                        /> 
                    }
                </Grid>
                <Grid item xs={12} md={1}></Grid>
                <Grid item xs={12} md={5}>
                <Typography variant="subtitle1">
                        {locale.subheading.label_comp_address}
                  </Typography>
                  <Divider className={ classes.divider }/>
                  {
                    address.map(( name, index) => {
                      return <EditInput 
                                key={index}
                                label={ locale.wording[name] }
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
                    label={locale.wording.addresses_country }
                    value={ company.addresses_country[localStorage.getItem("locale")]}
                />
                  </Grid>
        
              </Grid>
            </Grid>
        </Grid>
        
        <Snackbar
            locale={locale}
            message={message}
            isError={isError}
        />
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
        progress: state.account.company.progress,
        company_type: state.helper.items.company_type,
        country: state.helper.items.country,
        currency: state.helper.items.currency,
    }
}

const styledCompany = withStyles(styles)(Company);

export default connect(mapStateToProps, { updateDocument, uploadFileToServer })(styledCompany);