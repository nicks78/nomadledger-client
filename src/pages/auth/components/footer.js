import React from 'react'
import {Typography, withStyles} from '@material-ui/core';


const Footer = (props) => {

  const {classes, locale} = props

  return (
    <div className={classes.footer}>
        <Typography componet="span" align="center" style={{color: "#303030"}} variant="caption">&copy;2016-{ new Date().getFullYear() }&nbsp;Apx Development Limited</Typography>
        <Typography align="center" variant="caption" style={{color: "#303030"}} dangerouslySetInnerHTML={{__html: locale.home_page.footer_paragraphe }} />
    </div>
  )
}

const styles = theme => ({
  footer: {
      padding: 48,
      backgroundColor: theme.palette.lightGrey
  }
})

export default withStyles(styles)(Footer);
