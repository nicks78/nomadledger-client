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
                <Typography variant="body1">CONTACT US</Typography>
                <a href="mailto:contact@nomadledger.com"  className="link" style={{fontSize: "0.8rem"}}>contact@nomadledger.com</a>
                <Typography variant="body2">Skype: nomadledger</Typography>
            </div>
            <div>
                <Typography variant="body1">FOLLOW US</Typography>
                <div className={ classes.socialContainer }>
                    <a target="_blank" href="https://facebook.com/" rel="noopener noreferrer"><img src={`${DEFAULT_URL}img/facebook-512.png`} alt="logo-facebook" width="15" /></a>
                </div>
            </div>
        </div>
    )
}

const styles = theme => ({

    root: {
      display: "flex",
    //   alignItems: "center",
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
