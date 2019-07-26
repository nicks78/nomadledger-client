import React from 'react'
import {Typography, withStyles} from '@material-ui/core';


const Footer = (props) => {

  const {classes, locale} = props

  return (
    <div className={classes.footer}>
        <Typography componet="span" align="center" style={{color: "#8B8B8B"}} variant="caption">&copy;2016-{ new Date().getFullYear() }&nbsp;Apx Development Limited</Typography>
        <Typography align="center" variant="caption" style={{color: "#8B8B8B"}} dangerouslySetInnerHTML={{__html: locale.home_page.footer_paragraphe }} />
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
