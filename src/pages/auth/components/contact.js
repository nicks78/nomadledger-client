//src/pages/auth/components/appBar.js
import React from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {withStyles, Typography} from '@material-ui/core'

const  AppBar = (props) => {

    const { classes, locale, isMobile } = props

    return (
        <div className={classes.root} >
            <div>
                <img src={`${DEFAULT_URL}img/${isMobile ? "logo" : "logo-full" }.png`} alt="logo-full" width={isMobile ? "80" : "246"} />
            </div>
            <div>
                <Typography variant="body1">{locale.home_page.contact.contact_us}</Typography>
                <a href="mailto:contact@nomadledger.com"  className="link" style={{fontSize: "0.8rem"}}>contact@nomadledger.com</a>
            </div>
            <div>
                <Typography variant="body1">{locale.home_page.contact.follow_us}</Typography>
                <div className={ classes.socialContainer }>
                    <a target="_blank" href="https://www.facebook.com/NomadLedger-2385240291708965" rel="noopener noreferrer"><img src={`${DEFAULT_URL}img/facebook-512.png`} alt="logo-facebook" width="15" /></a>
                </div>
            </div>
        </div>
    )
}

const styles = theme => ({

    root: {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: 200,
      marginRight: 200,
      [theme.breakpoints.down('md')]:{
        marginLeft: 0,
        marginRight: 0,
      }
    },
    socialContainer: {
        marginTop: 5
    }
  })
  

export default withStyles(styles)(AppBar);
