import React, { Component } from 'react'
import  {withStyles} from '@material-ui/core'
import {cvtNumToUserPref} from '../../../utils/help_function'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'



function header(classes, locale, currency, total, color, label){
  return <Paper className={classes[color]} elevation={1}>
          <Typography className={classes.typoTitle} variant="body1">
            {locale.wording[label]}
            </Typography>
        <Grid container>

            <Grid item xs={9}>
            <Typography variant="subtitle1"></Typography>
            </Grid>

            <Grid item xs={3}>
            <Typography className={ classes.typoValue } variant="body1">
              { cvtNumToUserPref(total)} {currency}
            </Typography>
            </Grid>
        </Grid>
        </Paper>
}


class StatContact extends Component {


  render() {

    const { total_invoice, total_refund, currency, classes, locale} = this.props;

    return (
        <Grid container spacing={24}>

        <Grid item xs={12} md={6} sm={6}>

          { header(classes, locale, currency, total_invoice, "revenues", "invoice") }
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          { header(classes, locale, currency, total_refund, "refunds", "refund") }
        </Grid>
        </Grid>
    )
  }
}

const styles = theme => ({

  typoTitle: {
    color: 'white'
  },
  typoValue: {
    float: 'right',
    color: 'white',
    whiteSpace: 'nowrap'
  },
  revenues: {
    padding: 10, 
    background: 'linear-gradient(60deg, #3b78e7, #1930FF)'
  },
  refunds: {
    padding: 10,
    background: 'linear-gradient(60deg, #AD3428, #d23f31)'
  }

})


export default withStyles(styles)(StatContact);
