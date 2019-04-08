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
import ApxForm from '../../components/common/form'
import Spinner from '../../components/common/spinner'
import withWidth from '@material-ui/core/withWidth';



const styles = theme => ({
    appBar: {
        padding: 10,
        backgroundColor: theme.palette.secondary.main,
        overflow: "hidden"
    },
    jumbotron: {
        height: 500,
        backgroundColor: 'rgb(44,47,50)',
        overflow: "hidden",
        [theme.breakpoints.down('sm')]: {
            height: 250
        }
        
    },
    jumbotron_1: {
        float: 'left',
        width: '35%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%' 
        }
    },
    companyName: {
        color: "white",
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: "none" 
        }
    },
    textIntro: {
        [theme.breakpoints.down('sm')]: {
            display: "none" 
        }
    },
    img_01: {
        backgroundImage: `url(${DEFAULT_URL}img/background_1.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        paddingTop: 80,
        paddingBottom: 100,
        width: "120%",
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
            paddingBottom: 0,
            width: "100%", 
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    },
    logo:{
        display: "inline-block",
        margin: "0 auto",
        verticalAlign: "middle"
    },
    logoMobile:{
        [theme.breakpoints.up('sm')]: {
            display: 'none' 
        }
    },
    jumbotron_2: {
        backgroundImage: `url(${DEFAULT_URL}img/background_2.jpg)`,
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        height: "100%",
        backgroundPosition: "top",
        marginLeft: '30%',
        [theme.breakpoints.down('sm')]: {
            display: 'none' 
        }
    },
    title: {
        color: "white", 
        marginBottom: 12,
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
        marginBottom: 24,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            boxShadow: 'none',
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
        color: "green"
    },
    paper: {
        height: 200,
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
                { name: 'email', type:"email", required: true },
                { name: 'password',type:"password", required: true},
            ]
    }

    var loc = localStorage.getItem("locale");
    return (
      <div className={ classes.container}>

      <div className={classes.appBar} >
            <Button style={{ float: 'right', paddingLeft: 0, paddingRight: 5 }} onClick={ () => { this.props.initLocale( loc === "fr" ? "en" : "fr" )} }>{localStorage.getItem("locale")}</Button>
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
                {locale.wording.login}
            </Button>
            
      </div>

      <div className={classes.jumbotron}>
            <div className={classes.jumbotron_1}>

            <div style={{ marginLeft: 30 }}>
                 
                <Typography className={classes.companyName} variant="h1">
                    <img src={`${DEFAULT_URL}img/logo.png`} alt="logo" height="80" width="auto"  className={classes.logo}/>
                    <span>{locale.company_name}</span>
                </Typography>
            </div>

                <div className={ classes.img_01 }>
                <Typography align="center" variant="h1" className={classes.title}>
                    <img src={`${DEFAULT_URL}img/logo.png`} alt="logo" height="80" width="auto"  className={classes.logoMobile}/><br />
                        {locale.home_page.title_01}
                </Typography>
                    <div id="textIntro" className={classes.textIntro}>
                        <Typography align="justify" variant="body2" style={{color: "white"}}>
                            {locale.home_page.paragraphe_01}
                        </Typography>
                    </div>


                </div>
               
            </div>
            <div className={classes.jumbotron_2}>

            <div className={classes.wrapForm}>               
            </div>
            </div>
    </div>
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
            {
                !isFetching ? 
                <Paper className={ classes.form }>
                    <Typography variant="overline">
                            {locale.home_page.form_title}
                    </Typography>
                    <form onSubmit={ this.onSubmitForm }>
                    <ApxForm 
                        formField={form.fields} 
                        formHandler={ this.handleChange } 
                        locale={ locale } 
                        xs={12} 
                        md={12} 
                        objData={ newUser }
                    />
                    <br />
                        <Button variant="contained" 
                            color="primary"  
                            type="submit"
                            className={  classes.button } 
                            >{ locale.wording.register }
                        </Button>
                    </form>
                </Paper>
            : <Spinner />
            }
        </div>
        </div>


        <div className={ classes.section_4 }>
            <Typography variant="h2" className={ classes.headline }>
                    {locale.wording.pricing}
            </Typography>
            <Grid container spacing={24}>

                <Grid item xs={12} md={4}>
                    <Paper className={ classes.paper }>
                        <p className={classes.pricingTitle}>FREE TRIAL</p>
                        <Typography variant="body2" align="left"><CheckIcon className={classes.icon} />Full access</Typography>
                        <Typography variant="body2" align="left"><CheckIcon className={classes.icon} />No credit card ask</Typography>
                        <Typography variant="body2" align="left"><CheckIcon className={classes.icon} /></Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={ classes.paper }>
                        <p className={classes.pricingTitle}>2€/MONTH</p>
                        <Typography variant="body2" align="left"><CheckIcon className={classes.icon} />Customize your app</Typography>
                        <Typography variant="body2" align="left"><CheckIcon className={classes.icon} />Set up to your server</Typography>
                        <Typography variant="body2" align="left"><CheckIcon className={classes.icon} />Add more function</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={ classes.paper }>
                        <p className={classes.pricingTitle}>SELF HOSTED</p>
                        <Typography variant="body2" align="left"><CheckIcon className={classes.icon} />Customize your app</Typography>
                        <Typography variant="body2" align="left"><CheckIcon className={classes.icon} />Set up to your server</Typography>
                        <Typography variant="body2" align="left"><CheckIcon className={classes.icon} />Add more function</Typography>
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
                <a href="https://apx-dev.com" rel="noopener noreferrer" target="_blank">Terms and conditions</a>, features, support, pricing, and service options subject to change without notice.
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