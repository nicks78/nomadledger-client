//src/pages/auth/resetPassword.js
import React, { Component } from 'react'
import {DEFAULT_URL} from '../../redux/constant'
import {initLocale} from '../../redux/locale/actions'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {resetPassword, verifyToken} from '../../redux/auth/actions'
import {setNotification} from '../../redux/notification/actions'
import {TextField, withStyles, Typography, Button, Paper } from '@material-ui/core'

class ResetPassword extends Component {

    state = {
        password: "",
        confirm_pwd: "",
        token: "",
        height: window.innerHeight
    }

    componentDidMount(){
        this.setState({
            token : this.props.match.params.token
        })
        this.props.verifyToken(this.props.match.params.token)
        window.addEventListener("resize", this.changeHeight )
    }

    changeHeight = () => {
        this.setState({
            height: window.innerHeight
        })
    }

    onSubmitForm = (e) =>{
        e.preventDefault();

        if( this.state.password.length < 8 ){
            this.props.setNotification("error_pw_min_8", "error");
            return;
        }

        if(this.state.password === this.state.confirm_pwd){
            this.props.resetPassword(this.state.token, this.state.password )
        }else{
            this.props.setNotification("error_pw_not_match", "error")
        }
    }


    render() {

    const {classes, locale, isFetching} = this.props
    const langue = localStorage.getItem("locale")
    return (
      <div className={classes.container} style={{height: this.state.height}}>
        <div style={{position: "absolute", top: 10, right: 10}}>
          <Button onClick={() => { this.props.initLocale(langue === "fr" ? "en" : "fr") }} color="primary" >{ langue === "fr" ? "FR" : "EN"}</Button>
        </div>
            <Paper className={classes.paper}>

            <div>
                    <Typography className={classes.companyName} variant="h1" align="center">
                    <Link to="/"><img src={`${DEFAULT_URL}img/logo.png`} alt="logo" height="80" width="auto" /></Link><br />
                        <span dangerouslySetInnerHTML={{__html: locale.company_name}}></span>
                    </Typography><br />
                </div>
            <Typography variant="caption">
                { locale.subheading.label_reset_pwd }
            </Typography>

            <form onSubmit={ this.onSubmitForm }>
                <TextField
                    name="password"
                    label={locale.wording.password}
                    type="password"
                    fullWidth
                    required
                    margin="dense"
                    onChange={ (e) => { this.setState({[e.target.name]: e.target.value }) } }
                    variant="outlined"
                />
                <TextField
                    name="confirm_pwd"
                    label={locale.wording.password_confirm}
                    type="password"
                    fullWidth
                    required
                    margin="dense"
                    onChange={ (e) => { this.setState({[e.target.name]: e.target.value }) } }
                    variant="outlined"
                /><br /><br />
                <Button
                    type="submit"
                    color="primary"
                    disabled={isFetching ? true : false }
                    className={classes.button}
                    variant="contained">{ isFetching ? locale.wording.loading :  locale.wording.reset_pwd  }</Button>
            </form>

            </Paper>

      </div>
    )
  }
}

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: '25%',
        margin: '0 auto',
        padding: 24,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            padding: 12,
            width: '100%',
            boxShadow: 'none',
            borderRadius: 0,

        }
    },
    button: {
        float: 'right',
        width: "100%"
    }
})

const mapStateToProps =(state) => {
    return {
        locale: state.locale.locale,
        isFetching: state.auth.isFetching
    }
}

const StyledResetPassword = withStyles(styles)(ResetPassword)

export default connect(mapStateToProps, {resetPassword, setNotification, initLocale, verifyToken})(StyledResetPassword)
