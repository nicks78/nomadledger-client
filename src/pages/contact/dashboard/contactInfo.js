import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createState, updateItem } from '../../../redux/high-order-component'
import EditIcon from '@material-ui/icons/EditOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import EditContactInfo from './editContactInfo'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';


class ContactInfo extends Component {

    state = {
        value: 0,
        showEdit: false,
        contact: {}
    }

    // Store change data reducer
    handleEditProfile = (e) => {
        var fieldName =  e.target.name
        var value =  e.target.value

        // Temporary save data into redux store
        this.props.createState("CONTACT", fieldName, value)
    }


    showUpdateForm = (e) => {
        this.setState({showEdit: !this.state.showEdit})
    }  

    // Update database
    saveUpdate = (e) => {
        this.setState({showEdit: false});

        // Save the data to database
        this.props.updateItem("CONTACT", this.props.id)
    }   

    render() {
        const {locale, contact, isUpdating, tmp_state} = this.props
        const { showEdit } = this.state;

        
        return (
            <div style={{marginTop: '24px'}}>
            <div style={{ float: 'right' }}>
            
            {   !isUpdating ?
                <span>
                    { showEdit ? <CheckIcon onClick={this.saveUpdate}/> : <EditIcon className="icon-button" onClick={ this.showUpdateForm }/> }
                </span>
                : <CircularProgress style={{ width: 20, height: 20 }}color="secondary" />
            }
            </div>
            
            { !showEdit ? 
                <Typography variant="headline" gutterBottom>
                    {contact.company_name}
                </Typography>
                : 
                <Input
                    defaultValue={contact.company_name}
                    placeholder={ locale.form.field.company }
                    onChange={this.handleEditProfile}
                    name="company_name"
                    style={{width: '80%'}} 
                />
            }
            
            <EditContactInfo 
                label={ locale.form.field.firstname }
                value={contact.firstname }
                edit={showEdit}
                field="firstname"
                editProfile={this.handleEditProfile}
            />
            <EditContactInfo 
                label={ locale.form.field.lastname }
                value={contact.lastname }
                edit={showEdit}
                field="lastname"
                editProfile={this.handleEditProfile}
            />
            <EditContactInfo 
                html_tag="a"
                href={`tel:${ contact.phone_code }${contact.phone.replace('0', '')}`}
                label={locale.form.field.phone}
                type="select"
                locale={locale}
                valuePhone={contact.phone}
                selected={tmp_state.phone_code || "+33"}
                value={`(${ contact.phone_code })${contact.phone.replace('0', '')}`}
                edit={showEdit}
                field="phone"
                editProfile={this.handleEditProfile}
            />
            <EditContactInfo 
                html_tag="a"
                href={`mailto:${contact.email}`}
                label={locale.form.field.email}
                value={contact.email}
                edit={showEdit}
                field="email"
                editProfile={this.handleEditProfile}
            />
            <br />
            <br />
            <EditContactInfo 
                label={locale.form.field.addresses_street}
                value={contact.addresses_street}
                edit={showEdit}
                field="addresses_street"
                editProfile={this.handleEditProfile}
            />
            <EditContactInfo 
                label={locale.form.field.addresses_zip}
                value={contact.addresses_zip}
                edit={showEdit}
                field="addresses_zip"
                editProfile={this.handleEditProfile}
            />
            <EditContactInfo 
                label={locale.form.field.addresses_city}
                value={contact.addresses_city}
                edit={showEdit}
                field="addresses_city"
                editProfile={this.handleEditProfile}
            />
            <EditContactInfo 
                label={locale.form.field.addresses_country}
                value={contact.addresses_country}
                edit={showEdit}
                field="addresses_country"
                type="select"
                locale={locale}
                selected={contact.addresses_country}
                editProfile={this.handleEditProfile}
            />
            <br />
            <br />
            <EditContactInfo 
                label={locale.form.field.company_register}
                value={contact.company_register}
                edit={showEdit}
                field="company_register"
                editProfile={this.handleEditProfile}
            />
            <EditContactInfo 
                label={locale.form.field.company_vat}
                value={contact.company_vat}
                edit={showEdit}
                field="company_vat"
                editProfile={this.handleEditProfile}
            />
        
        <br />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        isUpdating: state.library.contact.isUpdating,
        tmp_state: state.library.contact.tmp_state
    }
  }
  

export default connect(mapStateToProps, {createState, updateItem})(ContactInfo);
