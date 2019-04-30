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

const styles = theme => ({
    appBar: {
        padding: 10,
        backgroundColor: theme.palette.secondary.main,
        overflow: "hidden"
    },
    headline: {
        color: '#ef6c00',
        textAlign: 'center',
        textTransform: "uppercase",
        marginBottom: 24
    },
    section_1: {
        padding: "48px 0px 0px 0px"
    },
    textBlock001: {
        width: "60%",
        margin: '0 auto',
        textAlign: "justify",
        [theme.breakpoints.down('sm')]: {
            width: "95%"
        }
    },
    section_3: {
        display: 'flex',
        justifyContent: 'center',
        padding: 24,
        margin: '0 auto',
        width: "50%",
        marginBottom: 24,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            boxShadow: 'none',
            width: "100%",
            borderRadius: 0,
            marginBottom: 0,

        }
    },
    form: {
       padding: 24,
       [theme.breakpoints.down('sm')]: {
            padding: '24px 12px 24px 12px',
            boxShadow: 'none',
            borderRadius: 0,

        }
    },
    button: {
        color: 'white',
        float: 'right',
    },
    section_4: {
        backgroundColor: theme.palette.darkGrey,
        padding: 48,
        [theme.breakpoints.down('sm')]: {
            padding: '24px 12px 24px 12px',

        }
    },
    pricingTitle: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '0px 20px 0px 20px',
        color: "white",
        padding: 12,
        textAlign: "center",
        fontWeight: 600
    },
    icon: {
        color: "green",
        fontSize: 18
    },
    iconClose: {
        color: "red",
        fontSize: 18
    },
    feature: {
        // float: "left",
        // position: "relative",
        // left: "-50%",
        clear: "both",
        marginBottom: 10
    },
    paper: {
        height: 230,
        padding: 24,
        marginBottom: 24,
        borderRadius: "20% 0% 20% 0%",
    },

    section_5: {
        padding: 48,
        [theme.breakpoints.down('sm')]: {
            padding: '24px 12px 24px 12px',

        }
    },
    section_5_img:{
        width: "auto",
        height: 250,
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            maxHeight: null,
        }
    },
    footer: {
        padding: 48,
        backgroundColor: theme.palette.secondary.main
    }
})

class Auth extends Component {

    state = {
        showLogin: true,
        openSnack: true
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

    const form = {
          title: locale.wording.create,
          label: locale.subheading.label_company,
          fields: [
                { name: 'company_name', type:"text", required: true },
                { name: 'firstname', type:"text", required: true },
                { name: 'lastname', type:"text", required: true },
                { name: 'email', type:"email", required: true },
                { name: 'password',type:"password", required: true},
            ]
    }

    // var loc = localStorage.getItem("locale");
    return (
      <div className={ classes.container}>
      <div className={classes.appBar} >
            {/* <Button style={{ float: 'right', paddingLeft: 0, paddingRight: 5 }} onClick={ () => { this.props.initLocale( loc === "fr" ? "en" : "fr" )} }>{localStorage.getItem("locale")}</Button> */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                style={{
                    float: "right",
                    marginRight: 5,
                    color: "white"
                }}
                >
                { window.innerWidth < 480 ? <ExitToAppIcon /> : locale.wording.login}
            </Button>

      </div>

        <Jumbotron locale={locale } />


        <div>
    </div>

        <div className={ classes.section_1 }>
            <div className={classes.textBlock001}>
                <Typography variant="h2" className={ classes.headline }>
                    {locale.home_page.block_title_001}
                </Typography>
                <Typography variant="body2" align="center">
                    { locale.home_page.block_paragraphe_001 }
                </Typography>
            </div>



        <div className={ classes.section_3 }>
                <Paper className={ classes.form }>
                    <Typography variant="overline">
                            {locale.home_page.form_title}
                    </Typography>
                    <Typography variant="caption">{locale.helperText.trial_30}</Typography>
                    <form onSubmit={ this.onSubmitForm }>
                        <RegisterForm
                            locale={locale}
                            updateState={ this.handleChange }
                            state={newUser}
                        />

                        <br />
                        <Button variant="contained"
                            color="primary"
                            type="submit"
                            disabled={ isFetching }
                            className={  classes.button }
                            >{ isFetching ? locale.wording.loading : locale.wording.register }
                        </Button>
                    </form>
                </Paper>
        </div>
        </div>

        <div className={ classes.section_4 }>
            <Typography variant="h2" className={ classes.headline }>
                    {locale.wording.pricing}
            </Typography>
            <Grid container spacing={24}>

                <Grid item xs={12} md={4}>
                    <Paper className={ classes.paper }>
                        <p className={classes.pricingTitle}>{locale.home_page.pricing.block_001.title}</p>
                        <div style={{}}>
                            <Typography variant="caption" className={ classes.feature }><CheckIcon className={classes.icon} />&nbsp;&nbsp;{locale.home_page.pricing.block_001.feature_1}</Typography>
                            <Typography variant="caption" className={ classes.feature }><CheckIcon className={classes.icon} />&nbsp;&nbsp;{locale.home_page.pricing.block_001.feature_2}</Typography>
                            <Typography variant="caption" className={ classes.feature }><CheckIcon className={classes.icon} />&nbsp;&nbsp;{locale.home_page.pricing.block_001.feature_3}</Typography>
                            <Typography variant="caption" className={ classes.feature }><CheckIcon className={classes.icon} />&nbsp;&nbsp;{locale.home_page.pricing.block_001.feature_4}</Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={ classes.paper }>
                        <p className={classes.pricingTitle}>{locale.home_page.pricing.block_002.title}</p>
                        <div style={{}}>
                        <Typography variant="caption" className={ classes.feature }><CheckIcon className={classes.icon} />&nbsp;&nbsp;{locale.home_page.pricing.block_001.feature_1}</Typography>
                        <Typography variant="caption" className={ classes.feature }><CheckIcon className={classes.icon} />&nbsp;&nbsp;{locale.home_page.pricing.block_002.feature_2}</Typography>
                        <Typography variant="caption" className={ classes.feature }><CheckIcon className={classes.icon} />&nbsp;&nbsp;{locale.home_page.pricing.block_002.feature_3}</Typography>
                        <Typography variant="caption" className={ classes.feature }><CheckIcon className={classes.icon} />&nbsp;&nbsp;{locale.home_page.pricing.block_002.feature_4}</Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={ classes.paper } >
                        <p className={classes.pricingTitle}>{locale.home_page.pricing.block_003.title}</p>
                        <div style={{textAlign: 'center'}}>
                        <Typography variant="caption" >
                        {locale.home_page.pricing.block_003.feature_1}

                        </Typography>
                        <br />
                        <Typography variant="body2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="/public/contact-us"
                                    >
                                    {locale.wording.contact_us}
                                </Button>
                        </Typography>
                        </div>
                    </Paper>
                </Grid>

            </Grid>
        </div>

        <div className={classes.section_5}>

            <Grid container spacing={24}>
                <Grid item xs={12} sm={6} md={6}>
                    <div align="center">
                        <img className={ classes.section_5_img } src={`${DEFAULT_URL}/img/block001.jpg`} alt="left" />
                    </div>

                </Grid>
                <Grid item xs={12} sm={6} md={6} style={{display: 'flex', alignItems: "center"}}>
                    <div>
                    <Typography variant="h2">
                            {locale.home_page.block_title_002}
                    </Typography><br />
                    <Typography variant="body2">
                            {locale.home_page.block_paragraphe_002}
                    </Typography>
                    </div>

                </Grid>
            </Grid>
            <br /><br /><br />
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6} md={6} style={{display: 'flex', alignItems: "center"}}>
                <div>
                    <Typography variant="h2">
                            {locale.home_page.block_title_003}
                    </Typography><br />
                    <Typography variant="body2">
                            {locale.home_page.block_paragraphe_003}
                    </Typography>
                </div>

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <div align="center">
                        <img className={ classes.section_5_img } src={`${DEFAULT_URL}/img/block002.jpg`} alt="right" />
                    </div>

                </Grid>
            </Grid>


        </div>
        <div className={classes.footer}>
            <Typography align="center" variant="caption" style={{color: "#303030"}}>
                &copy;{new Date().getFullYear()}&nbsp;Apx Development Limited<br />
                All rights reserved.&nbsp;
                <a href="https://api.nomadledger.com/terms.pdf" rel="noopener noreferrer" target="_blank">Terms and conditions</a>, features, support, pricing, and service options subject to change without notice.
            </Typography>
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
