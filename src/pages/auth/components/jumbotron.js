//src/pages/auth/jumbotron.js

import React  from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {Typography, withStyles} from '@material-ui/core';

const Jumbotron = (props) => {
    
    const {locale, classes} = props

    return (
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
                    <Typography variant="h1" style={{color: "white"}}> {locale.home_page.title_01}</Typography>
                    <Typography align="justify" variant="body2" style={{color: "white"}}>
                        {locale.home_page.paragraphe_01}
                    </Typography>
                </div>
            </div>
           
        </div>
        <div className={classes.jumbotron_2}>
        </div>
    </div>
    )
}


const styles = theme => ({
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
        [theme.breakpoints.up('sm')]: {
            display: 'none' 
        }
    },
})

export default withStyles(styles)(Jumbotron)
