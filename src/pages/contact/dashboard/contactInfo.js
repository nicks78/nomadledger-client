import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withStyles, Grid } from '@material-ui/core';
import { createState, updateItem } from '../../../redux/library/actions'
import EditInput from '../../../lib/editInput'
import EditSelect from '../../../lib/editSelect'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    root: {
    },
    iconBtn: {
        // float: 'right',
    },
    icon: {
        top: '-12px',
        right: '-12px'
    },
    editIcon: {
        width: '0.7em !important',
        height: '0.7em !important',
        transition: '1s ease',
    },
    checkicon: {
        color: theme.palette.green
    },
    divider: {
        clear: 'both',
        marginBottom: 10
    }
})


class ContactInfo extends Component {

    state = {
        value: 0
    }

    // Store change data reducer
    handleFormEdit = (e) => {
        var fieldName =  e.target.name
        var value =  e.target.value
        // Temporary save data into redux store
        this.props.createState("CONTACT", fieldName, value)
    }

    render() {
        const {locale, contact, isUpdating, showEdit, tmp_state, classes, contactGroup, country, company_type} = this.props

        return (
            <div className={ classes.root }>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              { !showEdit ?
                  null
                  :
                  <TextField
                      defaultValue={contact.company_name}
                      label={ locale.wording.company }
                      onChange={this.handleFormEdit}
                      name="company_name"
                      inputProps={{
                        maxLength: "40"
                      }}
                      variant="outlined"
                      fullWidth
                  />
              }
            </Grid>

            <Grid item xs={12} sm={4} md={4} >
            <Typography variant="subtitle1">
                      {locale.subheading.label_contact_info}
            </Typography>
            <Divider className={ classes.divider }/>
            <EditSelect
                arrayField={contactGroup}
                field="contact_group"
                handleAction={ this.handleFormEdit }
                locale={locale}
                showEdit={showEdit}
                label={locale.wording.contact_group }
                value={  contact.contact_group && contact.contact_group[localStorage.getItem("locale")] }
            />
            <EditInput
                label={ locale.wording.firstname }
                value={ tmp_state.firstname ||  contact.firstname }
                showEdit={showEdit}
                field="firstname"
                handleAction={this.handleFormEdit}
            />
            <EditInput
                label={ locale.wording.lastname }
                value={tmp_state.lastname ||  contact.lastname }
                showEdit={showEdit}
                field="lastname"
                handleAction={this.handleFormEdit}
            />
            <EditInput
                label={locale.wording.phoneNumber}
                value={tmp_state.phoneNumber || contact.phoneNumber}
                showEdit={showEdit}
                field="phoneNumber"
                handleAction={this.handleFormEdit}
            />
            <EditInput
                html_tag="a"
                href={`mailto:${contact.email}`}
                label={locale.wording.email}
                value={tmp_state.email || contact.email}
                showEdit={showEdit}
                field="email"
                handleAction={this.handleFormEdit}
            />
            </Grid>

          <Grid item xs={12} sm={4} md={4} >
            <Typography variant="subtitle1">
                      {locale.subheading.label_comp_address}
            </Typography>
            <Divider className={ classes.divider }/>

            <EditInput
                label={locale.wording.addresses_street}
                value={tmp_state.addresses_street || contact.addresses_street}
                showEdit={showEdit}
                field="addresses_street"
                handleAction={this.handleFormEdit}
            />
            <EditInput
                label={locale.wording.addresses_zip}
                value={tmp_state.addresses_zip || contact.addresses_zip}
                showEdit={showEdit}
                field="addresses_zip"
                handleAction={this.handleFormEdit}
            />
            <EditInput
                label={locale.wording.addresses_city}
                value={ tmp_state.addresses_city || contact.addresses_city}
                showEdit={showEdit}
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
                    label={locale.wording.addresses_country }
                    value={  contact.addresses_country && contact.addresses_country[localStorage.getItem("locale")] }
                />

            </Grid>
            <Grid item xs={12} sm={4} md={4} >
            <Typography variant="subtitle1">
                      {locale.subheading.label_comp_info}
            </Typography>
            <Divider className={ classes.divider }/>

            <EditSelect
                    arrayField={company_type}
                    field="company_type"
                    helperText="select_company_type"
                    handleAction={ this.handleFormEdit }
                    locale={locale}
                    showEdit={showEdit}
                    label={locale.wording.company_type }
                    value={  contact.company_type && contact.company_type[localStorage.getItem("locale")] }
                />
            <EditInput
                label={locale.wording.company_register}
                value={ tmp_state.company_register || contact.company_register}
                showEdit={showEdit}
                field="company_register"
                handleAction={this.handleFormEdit}
            />
            <EditInput
                label={locale.wording.company_vat}
                value={ tmp_state.company_vat || contact.company_vat}
                showEdit={showEdit}
                field="company_vat"
                handleAction={this.handleFormEdit}
            />
          </Grid>
</Grid>
        <br />

        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        tmp_state: state.library.contact.tmp_state,
        contactGroup: state.account.company.item ?  state.account.company.item.contact_group : [],
        company_type: state.helper.items.company_type,
        country: state.helper.items.country,

    }
}

const styledContactInfo = withStyles(styles)(ContactInfo);

export default connect(mapStateToProps, { createState, updateItem })(styledContactInfo);
