import React from 'react'
import {Typography, withStyles, Paper, Grid, Button} from '@material-ui/core';


const Footer = (props) => {

  const {classes, locale} = props

  return (
    <div className={classes.footer}>
        <Typography align="center" variant="caption" style={{color: "#303030"}}>
            &copy;{new Date().getFullYear()}&nbsp;Apx Development Limited<br />
            All rights reserved.&nbsp;
            <a href="https://api.nomadledger.com/terms.pdf" rel="noopener noreferrer" target="_blank">Terms and conditions</a>, features, support, pricing, and service options subject to change without notice.
        </Typography>
    </div>
  )
}

const styles = theme => ({
  footer: {
      padding: 48,
      backgroundColor: theme.palette.darkGrey
  }
})

export default withStyles(styles)(Footer);
