import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { cvtNumToUserPref } from '../../../utils/help_function'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'



function header(classes, locale, currency, total, color, label) {
  return <Paper className={classes[color]} elevation={1}>
    <Typography variant="h1" align="center">{cvtNumToUserPref(total || 0)} {currency}</Typography>
    <Typography variant="h2" align="center">{locale.wording[label]}s</Typography>
  </Paper>
}


class StatContact extends Component {


  render() {

    const { total_invoice, total_refund, currency, classes, locale } = this.props;

    return (
      <Grid container spacing={24}>

        <Grid item xs={12} md={6} sm={6}>

          {header(classes, locale, currency, total_invoice, "revenues", "invoice")}
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          {header(classes, locale, currency, total_refund, "refunds", "refund")}
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({

  revenues: {
    padding: 15,
    "& h2": {
      color: "#484848",
    },
    '& h1': {
      color: theme.palette.yellow.dark,
      marginBottom: 12
    }
  },
  refunds: {
    padding: 15,
    "& h2": {
      color: "#484848",

    },
    '& h1': {
      color: "rgb(98, 193, 197)",
      marginBottom: 12
    }
  }

})


export default withStyles(styles)(StatContact);
