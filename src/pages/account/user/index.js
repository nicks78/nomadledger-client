//manager/src/pages/account/user/index.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DEFAULT_URL } from '../../../redux/constant'
import { withStyles, Typography, Divider } from '@material-ui/core';
import UploadImg from '../../../lib/file/uploadImg'
import ApxButtonEdit from '../../../components/common/buttonEdit'
import { uploadFileToServer, updateDocument, updatePassword } from '../../../redux/account/actions'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid'
import EditInput from '../../../lib/editInput'
import Button from '@material-ui/core/Button';
import Phone from '../../../lib/phone'
import { resizeFile } from '../../../utils/resizeFile'



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
    marginTop: 48,
    marginBottom: 24,
  },
  passwordTitle: {
    marginTop: 24
  },
  btnChangePassword: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    }
  },
  btn: {
    backgroundColor: theme.palette.yellow.dark,
    marginTop: 24,
    width: "100%",
    maxWidth: 220
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 24
  }
})


class User extends Component {

  state = {
    reducer: "USER",
    showEdit: false,
  }

  openEdit = () => {
    this.setState({ showEdit: !this.state.showEdit })
  }
  updateDocument = () => {
    this.setState({ showEdit: false })
    this.props.updateDocument(this.state.reducer)
  }

  handlePassword = (event) => {
    var name = event.target.name;
    var value = event.target.value

    this.setState({ [name]: value })
  }

  requestNewPassword = (e) => {
    e.preventDefault();
    if (this.props.user.email) {
      this.props.updatePassword(this.props.user.email)
    }
  }

  handleUpload = (file) => {
    if (!file) { return }
    resizeFile(file, this.callback)
  }

  // Callback when img is resized
  callback = (file) => {
    this.props.uploadFileToServer("USER", file, 'avatar', this.props.user.avatar)
  }

  render() {
    const { user, locale, classes, requestPW, isUploading, progress } = this.props;
    const { showEdit, reducer } = this.state


    return (
      <div>
        <div className={classes.titleWrapper} >
          <Typography variant="overline">
            {locale.subheading.info_profile}

          </Typography>
          <ApxButtonEdit
            updateDocument={this.updateDocument}
            openEdit={this.openEdit}
            showEdit={showEdit}
          />

        </div>

        <div className={classes.wrapper}>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <UploadImg
                field="avatar"
                _handleUploadFile={(e) => { this.handleUpload(e.target.files[0]) }}
                progress={progress}
                isUploading={isUploading}
                image={
                  <Avatar
                    component="p"
                    alt={user.firstname}
                    src={`${user.avatar.full_path || DEFAULT_URL + "img/default_logo.jpg"}`}
                    className={classes.avatar}
                  />
                }
              />
            </Grid>

            <Grid item xs={12}>
              <EditInput
                label={locale.wording.firstname}
                value={user.firstname || ""}
                showEdit={showEdit}
                locale={locale}
                field="firstname"
                handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
              />
              <EditInput
                label={locale.wording.lastname || ""}
                value={user.lastname}
                showEdit={showEdit}
                locale={locale}
                field="lastname"
                handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
              />
              <Phone
                locale={locale}
                showEdit={showEdit}
                fieldCode="phone_code"
                field="phone"
                handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
                helperText="select_phone_code"
                labelCode={locale.wording.phone_code}
                label={locale.wording.phone}
                valueCode={user.phone_code || {}}
                value={user.phone || ""}
                reducer="USER"
              />

              <EditInput
                html_tag="a"
                href={`mailto:${user.email}`}
                label={locale.wording.email}
                value={user.email || ""}
                showEdit={showEdit}
                locale={locale}
                disabled={true}
                field="email"
                helperText={locale.helperText.cannot_change_email}
                required={true}
                handleAction={(event) => { this.props.handleFormEdit(event, reducer) }}
              />



              <div className={classes.btnChangePassword}>
                <Divider className={classes.divider} />
                <Typography variant="h3" align="left">
                  {locale.subheading.change_pw}
                </Typography>

                <Typography variant="caption" align="left">
                  {locale.subheading.change_pw_para}
                </Typography>


                <Button color="primary"
                  disabled={requestPW}
                  variant="contained"
                  className={classes.btn}
                  onClick={this.requestNewPassword}>
                  {requestPW ? locale.wording.loading : locale.wording.send_pw_link}
                </Button>

              </div>

            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {

  return {
    requestPW: state.account.user.requestPW,
    receivedAt: state.account.user.receivedAt,
    locale: state.locale.locale,
    user: state.account.user.item,
    isUploading: state.account.user.isUploading,
    progress: state.account.user.progress,
  }
}

const styledUser = withStyles(styles, { withTheme: true })(User);

export default connect(mapStateToProps, { uploadFileToServer, updateDocument, updatePassword })(styledUser);
