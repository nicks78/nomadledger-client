//src/pages/auth/components/appBar.js
import React from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {withStyles, Typography, Grid} from '@material-ui/core'

const  AppBar = (props) => {

    const { classes, locale, isMobile } = props

    return (
        <div className={classes.root} >
            <Grid container spacing={24}>

                <Grid item xs={12} md={4} sm={4}>
                <img src={`${DEFAULT_URL}img/${isMobile ? "logo" : "logo-full" }.png`} alt="logo-full" width={isMobile ? "80" : "246"} />
                </Grid>

                <Grid item xs={12} md={4} sm={4}>
                <Typography variant="body1">{locale.home_page.contact.contact_us}</Typography>
                <a href="mailto:contact@nomadledger.com" className="link" style={{fontSize: "0.8rem"}}>contact@nomadledger.com</a>
                </Grid>

                <Grid item xs={12} md={4} sm={4}>
                <Typography variant="body1">{locale.home_page.contact.follow_us}</Typography>
                <div className={ classes.socialContainer }>
                    <a target="_blank" href="https://www.facebook.com/NomadLedger-2385240291708965" rel="noopener noreferrer"><img src={`${DEFAULT_URL}img/facebook-512.png`} alt="logo-facebook" width="15" /></a>
                </div>
                </Grid>

            </Grid>
          
        </div>
    )
}

const styles = theme => ({

    root: {
        textAlign: "center"
    },
    socialContainer: {
        marginTop: 5
    }
  })
  

export default withStyles(styles)(AppBar);
