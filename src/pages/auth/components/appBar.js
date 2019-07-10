//src/pages/auth/components/appBar.js
import React from 'react'
import {Link} from 'react-router-dom'
import {DEFAULT_URL} from '../../../redux/constant'
import {withStyles, Typography, IconButton} from '@material-ui/core'

const  AppBar = (props) => {

    const { classes, showAppbar, locale, initLocale, lang, isMobile } = props

    return (
        <div className={classes.appBarWrapper} style={{ visibility: showAppbar ? "visible" : "hidden", opacity: showAppbar ? 1 : 0 }} >
            <div className={classes.appBar}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={`${DEFAULT_URL}img/logo.png`} alt="logo" width="50"/> 

            {!isMobile &&  <Typography variant="h1" style={{ fontSize: 25 }} dangerouslySetInnerHTML={{__html: locale.company_name}}></Typography> }
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <a className="link" href="#formAnchor">Try it</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link className="link" to="/login"><strong>Sign In</strong></Link>&nbsp;
                <IconButton onClick={ () => { initLocale(lang === 'fr' ? 'en' : 'fr') }}>&nbsp;
                {
                    lang === "fr" ?
                    <img src={`${DEFAULT_URL}img/element/flag-french.png`} alt="flag-french" width="20"/>
                    : 
                    <img src={`${DEFAULT_URL}img/element/flag-british.png`} alt="flag-british" width="20"/>
                }
                </IconButton>

                
            </div>
            
          </div>
        </div>
    )
}

const styles = theme => ({
    appBarWrapper: {
      position: "fixed",
      zIndex: 9,
      width: "100%",
      backgroundColor: "white",
      boxShadow: "1px 2px 5px grey",
      transition: "visibility 0s, opacity 0.5s ease"

    },
    appBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      flexGrow: 1,
      overflow: "hidden"
    }
  })
  

export default withStyles(styles)(AppBar);
