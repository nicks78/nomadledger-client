import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Spinner} from '../../../components/common'
import { withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import { getAccount, updateDocument, createState } from '../actions'
import EditContactInfo from '../../contact/dashboard/editContactInfo'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import { ApxUploadImg } from '../../../components/common';
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input';


const styles = theme => ({

  divider: {
    marginTop: 15,
    marginBottom: 15,
  },
  icon: {
    float: 'right',
  },
  checkicon: {
    color: theme.palette.green
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

  onChange  = () => {

  }


  render() {
    const {company, uploadFile, progress, isCreating, locale, classes, isFetching} = this.props;
    const {showEdit} = this.state


    if( isFetching  || company === null ){
      return <Spinner />
    }


    return (
      <div>
        <Grid container spacing={16}>
            <Grid item xs={12} md={3}>
                  <ApxUploadImg 
                    progress={progress}
                    isCreating={isCreating}
                    uploadFile={uploadFile}
                    image={company.company_logo}
                  />
            </Grid>

            <Grid item  xs={12} md={9}>
            <IconButton className={ classes.icon } color="secondary">
                { showEdit ? <CheckIcon onClick={ this.updateDocument } className={ classes.checkicon}/> : <EditIcon color="primary" onClick={ this.openEdit } /> }
              </IconButton>
              <Typography variant="display1">
              { showEdit ? 
                <Input
                    defaultValue={company.company_name}
                    placeholder={ locale.form.field.company_name }
                    onChange={this.handleFormEdit}
                    name="company_name"
                    style={{width: '80%'}} 
                />  : company.company_name }
              </Typography>

              <Grid container spacing={8}>

                  <Grid item xs={12} md={5}>


                  <EditContactInfo 
                      label={ locale.form.field.company_register }
                      value={company.company_register}
                      edit={showEdit}
                      field="company_register"
                      editProfile={this.handleFormEdit}
                  />
                  <EditContactInfo 
                      label={ locale.form.field.company_vat }
                      value={company.company_vat}
                      edit={showEdit}
                      field="company_vat"
                      editProfile={this.handleFormEdit}
                  />
      <br />
      <Divider className={classes.divider}/>
                  <EditContactInfo 
                      label={ locale.form.field.addresses_street }
                      value={company.addresses_street}
                      edit={showEdit}
                      field="addresses_street"
                      editProfile={this.handleFormEdit}
                  />
                  <EditContactInfo 
                      label={ locale.form.field.addresses_zip }
                      value={company.addresses_zip}
                      edit={showEdit}
                      field="addresses_zip"
                      editProfile={this.handleFormEdit}
                  />
                  <EditContactInfo 
                      label={ locale.form.field.addresses_city }
                      value={company.addresses_city}
                      edit={showEdit}
                      field="addresses_city"
                      editProfile={this.handleFormEdit}
                  />
                  <EditContactInfo 
                      label={ locale.form.field.addresses_country }
                      value={company.addresses_country}
                      edit={showEdit}
                      field="addresses_country"
                      editProfile={this.handleFormEdit}
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
        tmp_state: state.account.company.tmp_state,
        receivedAt: state.account.company.receivedAt,
        locale: state.locale.locale,
        company: state.account.company.item, 
        progress: state.account.company.progress
    }
}

const styledCompany = withStyles(styles)(Company);

export default connect(mapStateToProps, { getAccount, updateDocument, createState })(styledCompany);