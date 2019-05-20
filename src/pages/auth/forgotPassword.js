//src/pages/auth/forgotPassword.js

import React, { Component } from 'react'
import {DEFAULT_URL} from '../../redux/constant'
import {initLocale} from '../../redux/locale/actions'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {recoverPassword} from '../../redux/auth/actions'
import {TextField, withStyles, Typography, Button, Paper } from '@material-ui/core'

class ForgotPassword extends Component {

    state = {
        email: "email",
        height: window.innerHeight
    }

    componentDidMount(){
        window.addEventListener("resize", this.changeHeight )
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.changeHeight);
    }

    changeHeight = () => {
        this.setState({
            height: window.innerHeight
        })
    }

    onSubmitForm = (e) =>{
        e.preventDefault()
        this.props.recoverPassword(this.state.email)
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
                        <span>{locale.company_name}</span>
                    </Typography><br />
                </div>

            <Typography variant="subtitle1" align="center">
                { locale.subheading.label_forgot_pwd_body1 }
            </Typography>
        <br />
            <Typography variant="caption">
                { locale.subheading.label_forgot_pwd }
            </Typography>

            <form onSubmit={(e) => { this.onSubmitForm(e) }}>
                <TextField
                    name="email"
                    label={locale.wording.email}
                    type="email"
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
                    variant="contained">{ isFetching ? locale.wording.loading : locale.wording.send_link  }</Button>
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

const StyledForgotPassword = withStyles(styles)(ForgotPassword)

export default connect(mapStateToProps, {recoverPassword, initLocale})(StyledForgotPassword)
