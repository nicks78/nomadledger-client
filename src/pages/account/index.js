//src/pages/account/index.js

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import User from './user'
import Company from './company'
import Setting from './setting'



const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 18
  },
  paper: {
      padding: 24
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  icon: {
    position: 'relative',
    top: '6px',
    right: '5px',
    color: 'rgba(0,0,0,.54)'
  }
});



class Account extends Component {

  render() {

    const { classes } = this.props


    return (
      <div>
          <Grid container className={classes.root} spacing={16}>
             
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Company />
                </Paper>
                </Grid>
              
          </Grid>

          
          <Grid container spacing={24}> 
                <Grid item xs={12} md={8}>
                  <Paper className={classes.paper} elevation={1}>
                    <User /> 
                  </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                  <Paper className={classes.paper} >
                    <Setting/>
                  </Paper>
              </Grid>
          </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Account);