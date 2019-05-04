//manager/src/pages/auth/index.js
import React, { Component } from 'react'
import {DEFAULT_URL} from '../../redux/constant'
import {initLocale} from '../../redux/locale/actions'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { createStateUser, createUser } from '../../redux/auth/createActions'
import { resetUser } from '../../redux/auth/actions'
import {Typography, withStyles, Paper, Grid, Button} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined'
import withWidth from '@material-ui/core/withWidth';
import Jumbotron from './components/jumbotron'
import RegisterForm from './components/registerForm'
import Footer from './components/footer'

const styles = theme => ({
    root: {

    },
    appBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 24,
      backgroundColor: theme.palette.lightGrey,
      overflow: "hidden"
    },
    title: {
      color: theme.palette.secondary.main,
      fontWeight: 100,
      fontSize: 52,
    },
    subtitle: {
      fontSize: 20,
      color: theme.palette.caption,
      fontWeight: 300,
    },
    jumbotron: {
        display: "flex",
        justifyContent: "center",
        padding: 24,
        overflow: "hidden",
        backgroundColor: theme.palette.lightGrey,
    },
    headerText: {
      width: "60%",
      marginTop: 100,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginTop: 0,
      }
    },
    headerImg: {
      width: "40%",
      marginTop: -100,
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    },
    buttonLogin: {
      float: "right",
    },

    features: {
      display: 'flex',
      justifyContent: "space-between",
      textAlign: "center",
      padding: 48
    },

    formRegister: {
      display: "flex",
      justifyContent: 'center',
      // alignItems: "center",
      paddingBottom: 48,
    },
    paper: {
      width: "50%",
      padding: 24,
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    }
})

class Auth extends Component {

    state = {
        showLogin: true,
        openSnack: true,

    }

    componentWillUnmount(){
        this.props.resetUser();
    }

    handleChange = (event) => {
        var fieldName = event.target.name;
        var value = event.target.value

        this.props.createStateUser( fieldName, value )
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        this.props.createUser()
    }


    render() {

    const { classes, locale, newUser, isFetching } = this.props

    return (
      <div id="main" className={ classes.root}>
        <div id="appBar" className={classes.appBar}>
            <div style={{display: "flex", alignItems:"center"}} >
              <img src={`${DEFAULT_URL}img/logo.png`} width="50"  alt="logo"/>
              <span style={{ fontSize: 25, fontWeight: 300 }}>NomadLedger</span>
            </div>

            <Button component={Link} to="/login" className={ classes.buttonLogin } color="primary" variant="contained" >{locale.wording.login} </Button>
        </div>
        <div id="jumbotron" className={classes.jumbotron}>
          <div className={classes.headerText}>
            <Typography className={ classes.title } variant="h1">The nomad software<br />for freelancer</Typography>
            <br />
            <Typography className={ classes.subtitle }>
              NomadLedger is an easy to use software to manage your accounting document and keep track of your objective in just a few click.
            </Typography>
          </div>

          <div className={classes.headerImg}>
            <img src={`${DEFAULT_URL}img/header.png`} width="700" alt="header" />
          </div>


        </div>


        <div className={classes.features}>
          <div>
            <Typography variant="subtitle1">Multi-currency support</Typography>
            <br />
          <img src={`${DEFAULT_URL}img/1.png`} width="100" alt="img-1" />
          </div>
          <div>
            <Typography variant="subtitle1">Multi-currency support</Typography>
            <br />
          <img src={`${DEFAULT_URL}img/1.png`} width="100" alt="img-1" />
          </div>
          <div>
            <Typography variant="subtitle1">Multi-currency support</Typography>
            <br />
          <img src={`${DEFAULT_URL}img/1.png`} width="100" alt="img-1" />
          </div>
        </div>


        <div className={ classes.formRegister }>
          <Paper className={ classes.paper }>
            <Typography variant="overline">{locale.home_page.form_title}</Typography>
            <Typography variant="caption">{locale.helperText.trial_30}</Typography>
            <form onSubmit={ this.onSubmitForm }>
              <RegisterForm updateState={ this.handleChange } state={this.state} locale={locale}/>
              <br />
              <Button fullWidth type="submit" color="primary" variant="contained">Register</Button>
            </form>
          </Paper>
        </div>

        <div className={ classes.infosBlock }>

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {

    return {
        isFetching: state.auth.isFetching,
        locale: state.locale.locale,
        newUser: state.auth.state_user
    }
}

const auth = withWidth()(Auth)
const StyledAuth = withStyles(styles)(auth)


export default connect(mapStateToProps, {createStateUser, createUser, resetUser, initLocale})(StyledAuth);
