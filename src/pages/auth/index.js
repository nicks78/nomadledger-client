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
import BlocDesc from './components/blocDesc'
import Expanded from './components/expanded'
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined'
import GoogleSignUp from './components/googleSignUp';


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
        if(!this.state.agreedTerms){
            this.props.setNotification("error_agreed_terms", "error")
            return;
        }else{
          this.props.createStateUser( "agreedTerms", true )
          this.props.createUser()
        }

    }

    responseGoogle = (response) => {
      if(response.error){
          this.props.setNotification("error_sign_up_google", "error")
      }else{
        // const profile = response.profileObj;
        console.log(response)
        // this.props.createStateUser( "email", profile.email )
        // this.props.createStateUser( "lastname", profile.familyName )
        // this.props.createStateUser( "firstname", profile.givenName )
        // this.props.createStateUser( "googleId", profile.googleId )
        // this.props.createStateUser( "avatar", { full_path: profile.imageUrl, path: "" } )
      }
    }


    render() {

    const { classes, locale, newUser, isFetching } = this.props;
    const {appBarBackground, appBarBoxShadow, agreedTerms, width} = this.state
    const isMobile = width <= 500
    const lang = localStorage.getItem("locale")

    return (
      <div id="main" className={ classes.root}>

        <section>

          <Jumbotron locale={locale} isMobile={isMobile}/>
        </section>

        <section className={  isMobile ? classes.marginMobile : classes.margin}>
          <Grid container className={classes.intro} spacing={24}>
            <Grid item xs={12} sm={6} md={6}>
              <div style={{textAlign: 'center'}}>
                <img src={`${DEFAULT_URL}img/element/intro-picture.jpg`} height="300" alt="intro"/>
              </div>
            </Grid>
          <Grid item xs={12} sm={6} md={6}>
              <Typography variant="body1" align="center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                    It was popularised in the 1960s with the release of Letraset sheets containing
                    Lorem Ipsum passages, and more recently with desktop publishing software 
                    like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>

          </Grid>

          </Grid>
          
        </section>
        <section style={{marginBottom: 50}} className={  isMobile ? classes.marginMobile : classes.margin}>
          <BlocDesc locale={locale} isMobile={isMobile}/>
        </section>

        <section className={  isMobile ? classes.marginMobile : classes.margin} style={{backgroundColor: '#edf7f8', paddingTop: 50, paddingBottom: 50}} >
          <Typography variant="h2" align="center" style={{marginBottom: 24}}>Try it for free for 7 days</Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6} sm={6}>
              <form onSubmit={this.onSubmitForm}>
              <RegisterForm state={this.state} onAgreedToTerms={ () => this.setState({agreedTerms: !this.state.agreedTerms}) } updateState={this.handleChange} locale={locale} isMobile={isMobile}/>
                <div className={classes.buttonLogin}><Button disabled={!agreedTerms} variant="contained" className={classes.btn} type="submit">Register</Button></div>
              </form>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={`${DEFAULT_URL}img/element/Screen-HP-mockup.png`} height="300" alt="intro"/>
              </div>
              
            </Grid>
          </Grid>
          
        </section>
          
        <section className={  isMobile ? classes.marginMobile : classes.margin} style={{ width: isMobile ? "90%" : "60%", margin: "0 auto", paddingTop: 50, paddingBottom: 50 }}>
        <Typography variant="h2" align="center" style={{marginBottom: 24}}>Question</Typography>
            <Expanded locale={locale} />
        </section>

        <Footer locale={locale} />
      </div>
    )
  }
}

const styles = theme => ({

  marginMobile: {
    paddingRight: 0,
    paddingLeft: 0
  },
  margin: {
    paddingRight: 100,
    paddingLeft: 100
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
  intro: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonLogin: {
    float: "right",
  },
  btn: {
    backgroundColor: theme.palette.yellow.dark,
    color: 'white',
    width: 150
  },
  formBloc: {
    backgroundColor: theme.palette.thinBlue,
    marginTop: 100,
  }
})


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
