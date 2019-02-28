import React, { Component } from 'react'
import  {withStyles} from '@material-ui/core'
import {cvtNumToUserPref} from '../../../utils/help_function'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'


class StatContact extends Component {


  render() {

    const {total_quote, total_invoice, total_payback, currency, classes, locale} = this.props;

    return (
        <Grid container spacing={24}>
        <Grid item xs={12} md={4}>
          <Paper style={{padding: 10, backgroundColor: '#26a69a'}} elevation={1}>
                <Typography className={classes.typoTitle} variant="body1">
                  {locale.quote.name} ({locale.table.subtotal})
                </Typography>
            <Grid container>

                <Grid item xs={9}>
                <Typography variant="subtitle1">
                </Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography className={ classes.typoValue } variant="body1">
                  {cvtNumToUserPref(total_quote)} {currency}
                </Typography>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{padding: 10, backgroundColor: '#3B14CC'}} elevation={1}>
              <Typography className={classes.typoTitle} variant="body1">
                {locale.invoice.name} 
                </Typography>
            <Grid container>

                <Grid item xs={9}>
                <Typography variant="h1">
                  
                </Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography className={ classes.typoValue } variant="body1">
                  {total_invoice} {currency}
                </Typography>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{padding: 10, backgroundColor: '#ec407a'}} elevation={1}>
              <Typography className={classes.typoTitle} variant="body1">
                {locale.payback.name} 
                </Typography>
            <Grid container>

                <Grid item xs={9}>
                <Typography variant="h1">
                  
                </Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography className={ classes.typoValue } variant="body1">
                  {total_payback} {currency}
                </Typography>
                </Grid>
            </Grid>
          </Paper>
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
  }

})


export default withStyles(styles)(StatContact);