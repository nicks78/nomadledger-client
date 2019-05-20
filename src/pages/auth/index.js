//manager/src/pages/auth/index.js
import React, { Component } from 'react'
import {DEFAULT_URL} from '../../redux/constant'
import {initLocale} from '../../redux/locale/actions'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { createStateUser, createUser } from '../../redux/auth/createActions'
import { resetUser } from '../../redux/auth/actions'
import {Typography, withStyles, Paper, Grid, Button} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import Jumbotron from './components/jumbotron'
import RegisterForm from './components/registerForm'
import {setNotification} from '../../redux/notification/actions'
import Footer from './components/footer'
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined'


const styles = theme => ({
    root: {

    },
    appBarWrapper: {
      position: "fixed",
      zIndex: 9,
      width: "100%",
      transition: "all 0.2s ease"
    },
    appBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      flexGrow: 1,
      overflow: "hidden"
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
      marginTop: 48,
      paddingBottom: 48,
    },
    paper: {
      width: "50%",
      padding: 24,
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    },
    partners: {
      padding: 48,
      backgroundColor: theme.palette.lightGrey,
      // minHeight: 300,

      "& h2": {
        marginBottom: 48,
      }
    },
    partnersImgWrapper: {
      display: 'flex',
      alignItems: "center",
      justifyContent: "space-around",
      '& img' : {
        filter: "grayscale(50%)",
        webkitFilter: "grayscale(100%)",
        mozFilter: "grayscale(100%)",
        oFilter: "grayscale(100%)",
        msFilter: "grayscale(100%)",
      }
    }
})

class Auth extends Component {

    state = {
        showLogin: true,
        openSnack: true,
        width: window.innerWidth,
        appBarBackground: "rgba(243,243,243)",
        appBarBoxShadow: "none",
        agreedTerms: false,

    }

    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount(){
        this.props.resetUser();
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleResize = () => {
      this.setState({ width: window.innerWidth })
    }

    handleScroll = () => {
      var scrollTop = document.documentElement.scrollTop;
      if( scrollTop > 55){
        this.setState({
          appBarBackground: "white",
          appBarBoxShadow: "0px -1px 3px 0px grey"
        })
      }else{
        this.setState({
          appBarBackground: "rgba(243,243,243)",
          appBarBoxShadow: "none"
        })
      }
    }

    handleChange = (event) => {
        var fieldName = event.target.name;
        var value = event.target.value

        this.props.createStateUser( fieldName, value )
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.agreedTerms){
            this.props.setNotification("error_agreed_terms", "error")
            return;
        }else{
          this.props.createStateUser( "agreedTerms", true )
          this.props.createUser()
        }

    }


    render() {

    const { classes, locale, newUser, isFetching } = this.props;
    const {appBarBackground, appBarBoxShadow, agreedTerms, width} = this.state
    const isMobile = width <= 500
    const langue = localStorage.getItem("locale")

    return (
      <div id="main" className={ classes.root}>
        <div className={ classes.appBarWrapper } style={{ backgroundColor: appBarBackground, boxShadow: appBarBoxShadow }}>
          <div id="appBar" className={classes.appBar}>
              <div style={{display: "flex", alignItems:"center"}} >
                <img src={`${DEFAULT_URL}img/logo.png`} width="50"  alt="logo"/>
                { !isMobile ? <span style={{ fontSize: 25, fontWeight: 300 }}>NomadLedger</span> : null }
              </div>
              <div className={ classes.buttonLogin }>
                <Button component={Link} to="/login"  color="primary" variant="contained" >
                  {isMobile ? <ExitToAppIcon/> : locale.wording.login}
                </Button>&nbsp;
                <Button onClick={() => { this.props.initLocale(langue === "fr" ? "en" : "fr") }} color="primary" >{ langue === "fr" ? "FR" : "EN"}</Button>
              </div>


          </div>
        </div>

        <Jumbotron locale={locale} />

        <Grid container spacing={24} align="center">

          <Grid item xs={12} sm={4} md={4}>
            <img src={`${DEFAULT_URL}img/1.png`} width="150" alt="img-1" /><br />
            <div style={{marginTop: 24}}>
              <Typography variant="h3">Multi-currency support</Typography>
            </div>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <img src={`${DEFAULT_URL}img/1.png`} width="150" alt="img-1" /><br />
              <div style={{marginTop: 24}}>
                <Typography variant="h3">Process invoices & quotes</Typography>
              </div>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <img src={`${DEFAULT_URL}img/1.png`} width="150" alt="img-1" /><br />
              <div style={{marginTop: 24}}>
                <Typography variant="h3">Manager your tasks</Typography>
              </div>
          </Grid>

        </Grid>


        <div className={ classes.formRegister }>
          <Paper className={ classes.paper }>
            <Typography variant="h3" align="center">{locale.helperText.trial_30}</Typography><br />
            <Typography variant="caption">{locale.home_page.form_title}</Typography>
            <form onSubmit={ this.onSubmitForm }>
              <RegisterForm updateState={ this.handleChange } state={ newUser } locale={locale} onAgreedToTerms={ (e) => { this.setState({agreedTerms: e.target.checked}) } }/>
              <br />
              <Button fullWidth disabled={isFetching || !agreedTerms} type="submit" color="primary" variant="contained">{ isFetching ? locale.wording.loading : locale.wording.register }</Button>
            </form>
          </Paper>
        </div>

        <div className={ classes.partners }>
          <Typography variant="h2" align="center">Partners</Typography>
          <div className={ classes.partnersImgWrapper }>
            <img src="http://myassistantonline.fr/wp-content/uploads/2018/06/MyAssistantOnLine-e1535366190455.png" width="100"  alt="logo-1"/>
            <img src="https://acte-solutions.com/storage/app/media/acte_solutions_white_text_full.png" width="100"  alt="logo-2"/>
            <img src="https://3ct.fr/images/ico/3CT-icon-300.png" width="100" alt="logo-3" />
          </div>

        </div>

        <div className={ classes.infosBlock }>

        </div>

        <Footer locale={locale} />
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


export default connect(mapStateToProps, {createStateUser, createUser, resetUser, initLocale, setNotification})(StyledAuth);
