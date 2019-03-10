//manager/src/pages/account/user/index.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {DEFAULT_IMG} from '../../../redux/constant'
import { withStyles } from '@material-ui/core';
import UploadImg from '../../../lib/uploadImg'
import ApxAlert from '../../../components/common/alert'
import Spinner from '../../../components/common/spinner'
import ApxTitleBar from '../../../components/common/titleBar'
import { uploadFileToServer , updateDocument, updatePassword} from '../../../redux/account/actions'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid'
import EditInput from '../../../lib/editInput'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Phone from '../../../lib/phone'



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    margin: '0 auto',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  wrapper: {
    padding: 0
  },
  divider: {
    clear: 'both',
    marginTop: 24,
    marginBottom: 24,
  }
})


class User extends Component {

    state = {
      reducer: "USER",
      showEdit: false,
      password: '',
      password_confirm: ''
    }

  openEdit = () => {
    this.setState({showEdit: !this.state.showEdit})
  }
  updateDocument = () => {
    this.setState({showEdit: false})
    this.props.updateDocument(this.state.reducer)
  }

  handlePassword = (event) => {
    var name = event.target.name;
    var value = event.target.value

    this.setState({ [name] : value })
  }

  _updatePassword = () => {

    if(this.state.password === this.state.password_confirm){
        this.props.updatePassword(this.state.password )
    }else{
      alert( this.props.locale.message.alert_password_not_match )
    }
  }

  render() {
    const {  user, locale, classes, isFetching, isUploading, progress, isError, message } = this.props;
    const {showEdit, password, password_confirm, reducer} = this.state

    if( isFetching  ){
      return <Spinner />
    }

    if( user === null ){
      return <ApxAlert message="error_404" />
    }

    

    return (
      <div>
          <ApxTitleBar 
            text={locale.page.header_01 }
            showEdit={showEdit}
            openAction={ this.openEdit }
            editAction={ this.updateDocument }
          />

        { isError && <ApxAlert message={message} /> }

          <div className={ classes.wrapper }>
          <Grid container className={classes.root} spacing={16}>
                <Grid item  xs={12}>
                <UploadImg 
                    field="avatar"
                    _handleUploadFile={ (e) => { this.props.uploadFileToServer("USER", e.target.files[0], 'avatar', user.avatar ) }}
                    progress={progress}
                    isUploading={isUploading}
                    image={ 
                      <Avatar
                        component="p"
                        alt={user.firstname}
                        src={`${ user.avatar.full_path || DEFAULT_IMG }`}
                        className={ classes.avatar }
                    />
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                      <EditInput 
                          label={ locale.form.field.firstname }
                          value={  user.firstname }
                          showEdit={showEdit}
                          locale={locale}
                          field="firstname"
                          handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
                      />
                      <EditInput 
                          label={ locale.form.field.lastname }
                          value={ user.lastname }
                          showEdit={showEdit}
                          locale={locale}
                          field="lastname"
                          handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
                      />
                      <Phone 
                        locale={locale} 
                        showEdit={showEdit}
                        fieldCode="phone_code"
                        field="phone"
                        handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
                        helperText="select_phone_code"
                        labelCode={locale.form.field.phone_code }
                        label={ locale.form.field.phone }
                        valueCode={user.phone_code}
                        value={user.phone}
                        reducer="USER"
                      />
                      
                      <EditInput 
                          html_tag="a"
                          href={`mailto:${user.email}`}
                          label={ locale.form.field.email }
                          value={ user.email }
                          showEdit={showEdit}
                          locale={locale}
                          field="email"
                          handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
                      />


                    <div className={classes.divider} >
                      <Divider />
                    </div>


                  <form className={classes.container} autoComplete="off">
                    <TextField 
                          id="password"
                          label={locale.form.field.password}
                          className={classes.textField}
                          value={password}
                          name="password"
                          onChange={ this.handlePassword  }
                          margin="normal"
                      />
                      <br />
                      <TextField 
                          id="password_confirm"
                          label={locale.form.field.password_confirm}
                          className={classes.textField}
                          value={password_confirm}
                          name="password_confirm"
                          onChange={ this.handlePassword  }
                          margin="normal"
                      />
                        <br />
                      <Button color="primary" variant="contained" onClick={ this._updatePassword }>Save new password</Button>
                  
                  </form>    
                </Grid>
          </Grid>
          </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  
      return {
          isFetching: state.account.user.isFetching,
          isError: state.account.user.isError,
          message: state.account.user.message,
          receivedAt: state.account.user.receivedAt,
          locale: state.locale.locale,
          user: state.account.user.item, 
          isUploading: state.account.user.isUploading, 
          progress: state.account.user.progress,
      }
  }
  
  const styledUser = withStyles(styles,  { withTheme: true })(User);
  
  export default connect(mapStateToProps, {  uploadFileToServer, updateDocument, updatePassword })(styledUser);
