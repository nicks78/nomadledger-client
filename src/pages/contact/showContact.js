//manager/src/pages/client/showContact.js

import React  from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
      flex: 1,
      marginTop: theme.margin.unit,
      padding: theme.padding.unit
  }
})

const ShowContact = (props) => {
    const { classes } = props
    return (
      <Paper className={ classes.root }>
          {props.contact.company}
      </Paper>
    )
}

export default withStyles(styles)(ShowContact);