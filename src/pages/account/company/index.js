//manager/src/pages/account/company/index.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {  updateDocument, uploadFileToServer } from '../../../redux/account/actions'
import { DEFAULT_IMG} from '../../../redux/constant'
import { withStyles, TextField, Typography } from '@material-ui/core'
import ApxButtonEdit from '../../../components/common/buttonEdit'
import ApxtextIndexValue from '../../../components/common/textIndexValue'
import UploadImg from '../../../lib/uploadImg'
import EditInput from '../../../lib/editInput'
import EditSelect from '../../../lib/editSelect'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import { cvtNumToUserPref } from '../../../utils/help_function'
import {resizeFile} from '../../../utils/resizeFile'



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
    width: '91.5%',
    [theme.breakpoints.down("sm")]: {
      width: '100%',
      marginTop: 10
    }
  },
  paddingCompanyInfo: {
    paddingRight: "30px !important",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "12px !important",
    }
  },
  img: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: 100
    }
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
    this.props.updateDocument("USER");
    this.props.updateDocument(this.state.reducer)
  }

  handleUpload = (file) => {
    if(!file){return;}
    resizeFile(file, this.callback)
  }

  // Callback when img is resized
  callback = (file) => {
      this.props.uploadFileToServer("COMPANY", file, 'logo_company', this.props.company.logo_company )
  }

  render() {
    const {company, progress, isUploading, locale, classes, company_type, country, currency, months, user} = this.props;
    const {showEdit, reducer} = this.state;

    const address = ["addresses_street", "addresses_zip", "addresses_city"]

    return (
      <div>
        <Grid container spacing={16}>
            <Grid item xs={12} md={3} sm={3}>
                  <UploadImg
                    field="logo_company"
                    _handleUploadFile={ (e) => { this.handleUpload( e.target.files[0] ) }}
                    progress={progress}
                    oldFile={company.logo_company}
                    isUploading={isUploading}
                    image={ <img className={classes.img} src={`${ company.logo_company.full_path || DEFAULT_IMG }`} alt="logo" width="70%" height={null} />}
                  />

            </Grid>

            <Grid item  xs={12} md={9} sm={9}>
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
                    variant="outlined"
                    className={ classes.input }
                />  : company.company_name }
              </Typography>
              <br />
              <Grid container spacing={24}>

                  <Grid item xs={12} sm={7} md={7} className={ classes.paddingCompanyInfo }>

                  <Typography variant="subtitle1">
                      {locale.subheading.label_comp_info}
                    </Typography>
                  <Divider className={ classes.divider }/>

                  <EditSelect
                        arrayField={company_type}
                        field="company_type"
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
                      label={ locale.wording.company_register_city }
                      value={ company.company_register_city}
                      showEdit={showEdit}
                      locale={locale}
                      field="company_register_city"
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
                     {
                      showEdit ?
                        <EditInput
                          label={ locale.wording.capital }
                          value={ company.capital || "" }
                          showEdit={showEdit}
                          locale={locale}
                          field="capital"
                          handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
                      />
                      :
                      <ApxtextIndexValue
                            value={ cvtNumToUserPref(company.capital || 0)}
                            label={locale.wording.capital }
                        />
                    }

                    <EditSelect
                        arrayField={months}
                        field="fiscal_month"
                        handleAction={ (ev) => { this.props.handleFormEdit(ev, reducer) } }
                        locale={locale}
                        showEdit={showEdit}
                        label={locale.wording.fiscal_date }
                        value={company.fiscal_month[localStorage.getItem('locale')] }
                    />

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

                </Grid>
                <Grid item xs={12} sm={5} md={5}>
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
                    handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
                    locale={locale}
                    showEdit={showEdit}
                    label={locale.wording.addresses_country }
                    value={ company.addresses_country[localStorage.getItem("locale")]}
                />
              <br /><br />
                <Typography variant="subtitle1">
                      {locale.subheading.label_comp_member}
                </Typography>
                <Divider className={ classes.divider }/>
                <div>
                  <ApxtextIndexValue
                        value={new Date(user.membership_end).toLocaleDateString("fr")}
                        label={locale.wording.end}
                    />

                </div>

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
        isUploading: state.account.company.isUploading,
        locale: state.locale.locale,
        company: state.account.company.item,
        progress: state.account.company.progress,
        company_type: state.helper.items.company_type,
        months: state.helper.items.months,
        country: state.helper.items.country,
        currency: state.helper.items.currency,
        user: state.account.user.item
    }
}

const styledCompany = withStyles(styles)(Company);

export default connect(mapStateToProps, { updateDocument, uploadFileToServer })(styledCompany);

// {
//   showEdit ?
//   <p style={{display: "inline-flex", alignItems: "center"}}>
//     <Checkbox style={{paddingLeft: 0}} name="autoRenewal" checked={ user.autoRenewal } onChange={(e) => { this.props.handleFormEdit(e, "USER") }} />
//     <Typography component="span" variant="body2">{ locale.wording.auto_renewal }</Typography>
//   </p>
//
//   : <ApxtextIndexValue
//         value={ user.autoRenewal ? locale.wording.yes : locale.wording.no }
//         label={locale.wording.renewal}
//     />
// }
