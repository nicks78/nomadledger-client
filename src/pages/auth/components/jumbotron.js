//src/pages/auth/jumbotron.js

import React  from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {Link} from 'react-router-dom'
import {Typography, withStyles, Button} from '@material-ui/core';

const Jumbotron = (props) => {

    const {locale, classes, isMobile} = props

    return (
      <div className={classes.root}>
          <div id="jumbotron" className={classes.jumbotron}>
            <div className={classes.title}>
              <img src={`${DEFAULT_URL}img/logo.png`} alt="logo" width="100"/>
              <Typography variant="h1" style={{ fontSize: 40 }} dangerouslySetInnerHTML={{__html: locale.company_name}}></Typography>
              <Typography variant="h3" style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.6 }} dangerouslySetInnerHTML={{__html: locale.home_page.title_01}}></Typography>
              <Button component={Link} to="/login" variant="contained" className={classes.btn} type="submit">Try it for free</Button>
            </div>
            {
              !isMobile ?
              <div className={classes.homeillu}>
                  <img src={`${DEFAULT_URL}img/svg/Nomad-Ledger_home-illu.svg`} height="450" style={{ marginLeft: -20}} alt="elipse"/>
              </div>
              : null 
            }
          </div>
          <div>
          </div>

      </div>
      
    )
}


const styles = theme => ({
    root: {
      backgroundImage: `url(${DEFAULT_URL}img/element/Vague1.png)`,
      backgroundRepeat: ' no-repeat',
      backgroundSize: "contain"
    },
    jumbotron: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    title: {
      marginLeft: 30
    },
    homeillu: {
      marginTop: -50,
      backgroundImage: `url(${DEFAULT_URL}img/element/Ellipse.png)`,
      backgroundRepeat: ' no-repeat',
      backgroundPosition: "0px -90px",
      backgroundSize: "contain"
    },
    btn: {
      marginTop: 24,
      backgroundColor: theme.palette.yellow.dark,
      color: 'white',
      width: 150
    },
})

export default withStyles(styles)(Jumbotron)
