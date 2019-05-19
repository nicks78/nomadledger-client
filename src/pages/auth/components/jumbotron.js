//src/pages/auth/jumbotron.js

import React  from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {Typography, withStyles} from '@material-ui/core';

const Jumbotron = (props) => {

    const {locale, classes} = props

    return (
        <div>
          <div id="jumbotron" className={classes.jumbotron}>
            <div className={classes.headerText}>
              <Typography className={ classes.title } variant="h1" dangerouslySetInnerHTML={{__html: locale.home_page.title_01 }} />
              <br />
              <Typography variant="h2" className={ classes.subtitle }>
                {locale.home_page.paragraphe_01}
              </Typography>
            </div>

            <div className={classes.headerImg}>
              <img src={`${DEFAULT_URL}img/header.png`} width="700" alt="header" />
            </div>
          </div>
          <svg width="100%" height="100%" viewBox="0 0 2481 198" version="1.1" xmlns="http://www.w3.org/2000/svg"
            style={{fillRule: "evenodd", clipRule:"evenodd" , strokeLinecap:"round" , strokeLinejoin:"round", strokeMiterLimit:"1.5", marginTop: -7}}>
            <g transform="matrix(1,0,0,1,0,-1410.5)">
             <path
               d="M5.777,1418.83C258.133,1443.55 510.673,1467.13 763.748,1483.27C932.34,1494.02 1101.29,1502.42 1270.27,1502.52C1433.76,1502.61 1597.22,1494.5 1760.32,1483.84C2001.05,1468.12 2241.21,1444.81 2481.17,1420.26"
               style={{fill:"rgb(243,243,243)",stroke:"rgb(243,243,243)",strokeWidth:"16.67px"}}/>
            </g>
          </svg>
        </div>
    )
}


const styles = theme => ({
  title: {
    color: theme.palette.secondary.main,
    fontWeight: 100,
    fontSize: 52
  },
  subtitle: {
    fontSize: 20,
    color: theme.palette.caption,
    textTransform: "none",
    lineHeight: "1.46429em",
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
    marginTop: 150,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: 0,
      textAlign: "center"
    }
  },
  headerImg: {
    width: "40%",
    marginTop: -10,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
})

export default withStyles(styles)(Jumbotron)
