//manager/src/pages/client/showClient.js

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

const ShowClient = (props) => {
    const { classes } = props
    return (
      <Paper className={ classes.root }>
          {props.client.company.name}
      </Paper>
    )
}

export default withStyles(styles)(ShowClient);