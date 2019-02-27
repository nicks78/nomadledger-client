import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core';
import {country, phone_code, company_type} from '../../../utils/static_data'
import { createState, updateItem } from '../../../redux/library/actions'
import ApxButtonEdit from '../../../components/common/buttonEdit'
import EditInput from '../../../lib/editInput'
import EditSelect from '../../../lib/editSelect'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';


const styles = theme => ({
    root: {
        marginTop: '24px'
    },
    iconBtn: {
        float: 'right',
    },
    icon: {
        top: '-12px',
        right: '-12px'
    },
    circular: {
        width: 20, 
        height: 20
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
        value: 0,
        showEdit: false,
        contact: {}
    }

    // Store change data reducer
    handleFormEdit = (e) => {
        var fieldName =  e.target.name
        var value =  e.target.value

        // Temporary save data into redux store
        this.props.createState("CONTACT", fieldName, value)
    }


    openEdit = (e) => {
        this.setState({showEdit: !this.state.showEdit})
    }  

    // Update database
    updateDocument = (e) => {
        this.setState({showEdit: false});

        // Save the data to database
        this.props.updateItem("CONTACT", this.props.id)
    }   

    render() {
        const {locale, contact, isUpdating, tmp_state, classes, contactGroup} = this.props
        const { showEdit } = this.state;

        
       

        return ( 
            <div className={ classes.root }>
                <div className={ classes.iconBtn }>
                
                {   !isUpdating ?
                    <ApxButtonEdit 
                    style={{top: '-5px', right: '-12px'}}
                    updateDocument={this.updateDocument}
                    openEdit={this.openEdit} 
                    showEdit={showEdit}
                  />
                    : <CircularProgress className={ classes.circular }color="secondary" />
                }
                </div>
            
            { !showEdit ? 
                <Typography variant="h1" gutterBottom>
                    {contact.company_name}
                </Typography>
                : 
                <Input
                    defaultValue={contact.company_name}
                    placeholder={ locale.form.field.company }
                    onChange={this.handleFormEdit}
                    name="company_name"
                    style={{width: '80%'}} 
                />
            }
            <br />
            <Typography variant="subtitle2">
                      {locale.form.title.label_contact_info}
            </Typography>
            <Divider className={ classes.divider }/>
            <EditSelect 
                arrayField={contactGroup}
                field="contact_group"
                helperText="select_contact_group"
                handleAction={ this.handleFormEdit }
                locale={locale}
                showEdit={showEdit}
                label={locale.form.field.contact_group }
                value={  contact.contact_group && contact.contact_group[localStorage.getItem("locale")] }
            />
            <EditInput 
                label={ locale.form.field.firstname }
                value={ tmp_state.firstname ||  contact.firstname }
                showEdit={showEdit}
                field="firstname"
                handleAction={this.handleFormEdit}
            />
            <EditInput 
                label={ locale.form.field.lastname }
                value={tmp_state.lastname ||  contact.lastname }
                showEdit={showEdit}
                field="lastname"
                handleAction={this.handleFormEdit}
            />
            <EditSelect 
                arrayField={phone_code}
                field="phone_code"
                helperText="select_phone_code"
                handleAction={ this.handleFormEdit }
                locale={locale}
                showEdit={showEdit}
                label={locale.form.field.phone_code }
                value={  contact.phone_code && contact.phone_code[localStorage.getItem("locale")] }
            />
            <EditInput 
                label={locale.form.field.phone}
                value={tmp_state.phone || contact.phone}
                showEdit={showEdit}
                field="phone"
                handleAction={this.handleFormEdit}
            />
            <EditInput 
                html_tag="a"
                href={`mailto:${contact.email}`}
                label={locale.form.field.email}
                value={tmp_state.email || contact.email}
                showEdit={showEdit}
                field="email"
                handleAction={this.handleFormEdit}
            />
            <br /><br />
            <Typography variant="subtitle2">
                      {locale.form.title.label_comp_address}
            </Typography>
            <Divider className={ classes.divider }/>
            <EditInput 
                label={locale.form.field.addresses_street}
                value={tmp_state.addresses_street || contact.addresses_street}
                showEdit={showEdit}
                field="addresses_street"
                handleAction={this.handleFormEdit}
            />
            <EditInput 
                label={locale.form.field.addresses_zip}
                value={tmp_state.addresses_zip || contact.addresses_zip}
                showEdit={showEdit}
                field="addresses_zip"
                handleAction={this.handleFormEdit}
            />
            <EditInput 
                label={locale.form.field.addresses_city}
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
                    label={locale.form.field.addresses_country }
                    value={  contact.addresses_country && contact.addresses_country[localStorage.getItem("locale")] }
                />
            
            <br /><br />
            <Typography variant="subtitle2">
                      {locale.form.title.label_comp_info}
            </Typography>
            <Divider className={ classes.divider }/>
            
            <EditSelect 
                    arrayField={company_type}
                    field="company_type"
                    helperText="select_company_type"
                    handleAction={ this.handleFormEdit }
                    locale={locale}
                    showEdit={showEdit}
                    label={locale.form.field.company_type }
                    value={  contact.company_type && contact.company_type[localStorage.getItem("locale")] }
                />
            <EditInput 
                label={locale.form.field.company_register}
                value={ tmp_state.company_register || contact.company_register}
                showEdit={showEdit}
                field="company_register"
                handleAction={this.handleFormEdit}
            />
            <EditInput 
                label={locale.form.field.company_vat}
                value={ tmp_state.company_vat || contact.company_vat}
                showEdit={showEdit}
                field="company_vat"
                handleAction={this.handleFormEdit}
            />
        
        <br />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        isUpdating: state.library.contact.isUpdating,
        tmp_state: state.library.contact.tmp_state,
        contactGroup: state.account.company.item ?  state.account.company.item.contact_group : []

    }
}
  
const styledContactInfo = withStyles(styles)(ContactInfo);

export default connect(mapStateToProps, { createState, updateItem })(styledContactInfo);
