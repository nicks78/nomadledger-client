import React from 'react'
import { Typography, withStyles } from '@material-ui/core';


const Footer = (props) => {

  const { classes, locale } = props

  return (
    <div className={classes.footer}>
      <Typography componet="span" align="center" style={{ color: "#8B8B8B", fontSize: "0.7em" }} variant="caption">&copy;2016-{new Date().getFullYear()}&nbsp;<a href="https://apx-dev.com" rel="noopener noreferrer" target="_blank">Apx Development Limited</a></Typography>
      <Typography align="center" variant="caption" style={{ color: "#8B8B8B", fontSize: "0.7em" }} dangerouslySetInnerHTML={{ __html: locale.home_page.footer_paragraphe }} />
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
