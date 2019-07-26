//manager/src/pages/auth/index.js
import React, { Component } from 'react'
import {DEFAULT_URL} from '../../redux/constant'
import {initLocale} from '../../redux/locale/actions'
import {connect} from 'react-redux'
import { createStateUser, createUser } from '../../redux/auth/createActions'
import * as actions from '../../redux/auth/createActions'
import { resetUser } from '../../redux/auth/actions'
import {Typography, withStyles, Grid, Button} from '@material-ui/core';
import Jumbotron from './components/jumbotron'
import RegisterForm from './components/registerForm'
import {setNotification} from '../../redux/notification/actions'
import Footer from './components/footer'
import BlocDesc from './components/blocDesc'
import Expanded from './components/expanded'
import Offer from './components/offer'
import AppBar from './components/appBar'
import Partners from './components/partners'
import Contact from './components/contact'
// import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined'
// import GoogleSignUp from './components/googleSignUp';


class Auth extends Component {

    state = {
        showLogin: true,
        openSnack: true,
        width: window.innerWidth,
        showAppbar: false,
        agreedTerms: false,

    }

    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount(){
        this.props.resetUser();
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize = () => {
      this.setState({ width: window.innerWidth })
    }

    handleScroll = () => {
      var scrollTop = document.documentElement.scrollTop;
      if( scrollTop > 250){
        this.setState({
          showAppbar: true
        })
      }else{
        this.setState({
          showAppbar: false
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
    const {showAppbar, agreedTerms, width} = this.state
    const lang = localStorage.getItem("locale")
    const isMobile = width <= 500

    return (
      <div id="main" className={ classes.root}>
          <section>
            <AppBar locale={locale} showAppbar={showAppbar} initLocale={this.props.initLocale} lang={lang} isMobile={isMobile} />
          </section>
        <section>
          <Jumbotron locale={locale} isMobile={isMobile}/>
        </section>

        <section className={ classes.margin} style={{ marginTop: isMobile ? 20 : -20 }}>
          <Grid container className={classes.intro} spacing={24}>
            <Grid item xs={12} sm={6} md={6}>
              <div style={{textAlign: 'center'}}>
                <img src={`${DEFAULT_URL}img/element/intro-picture.jpg`} height={isMobile ? "200" : "300"} alt="intro"/>
              </div>
            </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div style={{ width: isMobile ? "100%" : "90%", marginLeft: isMobile ? "12px" : "4rem" }}>
              <Typography  variant="body2" align="left" dangerouslySetInnerHTML={{__html: locale.company_name + locale.home_page.paragraphe_01}}/><br />
              <Typography variant="body2" align="left" dangerouslySetInnerHTML={{__html: locale.home_page.paragraphe_02 }}/>
            </div>
          </Grid>
          </Grid>
        </section>


        <section style={{marginBottom: 50}} className={ classes.margin}>
          <BlocDesc locale={locale} isMobile={isMobile}/>
        </section>
        
        <section  className={ classes.margin} style={{backgroundColor: '#edf7f8', paddingTop: 50, paddingBottom: 50}} >
          <div id="formAnchor"></div>
          <Typography variant="h2" align="center" style={{marginBottom: 24, color: "#0c3c5e"}}>{locale.home_page.form.title.toUpperCase()}</Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6} sm={6}>
              <form onSubmit={this.onSubmitForm}>
              <RegisterForm state={newUser} onAgreedToTerms={ () => this.setState({agreedTerms: !this.state.agreedTerms}) } updateState={this.handleChange} locale={locale} isMobile={isMobile}/>
                <div className={classes.buttonLogin}><Button color="primary" disabled={!agreedTerms || isFetching} variant="contained" className={classes.btn} type="submit">{ isFetching ? locale.wording.loading : locale.home_page.form.btn}</Button></div>
              </form>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={`${DEFAULT_URL}img/element/Screen-HP-mockup.png`} height={isMobile ? "200" : "300"} alt="intro"/>
              </div>
            </Grid>
          </Grid>
        </section>
          
        <section className={ classes.margin} style={{ width: isMobile ? "90%" : "60%", margin: "0 auto", paddingTop: 50, paddingBottom: 50 }}>
        <Typography variant="h2" align="center" style={{marginBottom: 24, color: "#0c3c5e"}}>{locale.home_page.questions.title.toUpperCase()}</Typography>
            <Expanded locale={locale} />
        </section>

        <section className={ classes.margin} style={{ backgroundColor: "#0C3C5E", paddingTop: 50, paddingBottom: 50 }}>
          <Typography variant="h2" align="center" style={{marginBottom: 24, color: "white"}}>{locale.home_page.offer.title.toUpperCase()}</Typography>
          <Offer locale={locale}  isMobile={isMobile} />
        </section>

        <section className={ classes.margin} style={{ paddingTop: 50, paddingBottom: 50 }}>
          <Typography variant="h2" align="center" style={{marginBottom: 24, color: "#0c3c5e"}}>{locale.home_page.partners.title.toUpperCase()}</Typography>
          <Partners locale={locale} />
        </section>

        <section className={ classes.margin} style={{ paddingTop: 50, paddingBottom: 50, backgroundColor: "#edf7f8" }}>
            <Contact locale={locale} isMobile={isMobile} />
        </section>

        <Footer locale={locale} />
      </div>
    )
  }
}

const styles = theme => ({

  margin: {
    paddingRight: 200,
    paddingLeft: 200,
    [theme.breakpoints.down("md")]: {
      paddingRight: 10,
      paddingLeft: 10
    }
  },
  appBarWrapper: {
    position: "fixed",
    zIndex: 9,
    width: "100%",
    transition: "all 0.2s ease",
    backgroundColor: 'red'
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
    width: 150,
    boxShadow: "none"
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


const StyledAuth = withStyles(styles)(Auth)


export default connect(mapStateToProps, {createStateUser, createUser, resetUser, initLocale, setNotification, actions })(StyledAuth);
