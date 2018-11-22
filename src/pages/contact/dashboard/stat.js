import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'


class StatContact extends Component {
  render() {
    return (
        <Grid container spacing={8}>
        <Grid item xs={12} md={4}>
          <Paper style={{padding: 10, backgroundColor: '#26a69a'}} elevation={1}>
              <Typography style={{ color: 'white'}} variant="body1" component="h3">
                  Weeks sales
                </Typography>
            <Grid container>

                <Grid item xs={9}>
                <Typography variant="display1" component="h3">
                  
                </Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography style={{float: 'right', color: 'white'}} variant="body1" component="h5">
                  900€
                </Typography>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{padding: 10, backgroundColor: '#3B14CC'}} elevation={1}>
              <Typography style={{ color: 'white'}} variant="body1" component="h3">
                  Weeks sales
                </Typography>
            <Grid container>

                <Grid item xs={9}>
                <Typography variant="display1" component="h3">
                  
                </Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography style={{float: 'right', color: 'white'}} variant="body1" component="h5">
                  900€
                </Typography>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{padding: 10, backgroundColor: '#ec407a'}} elevation={1}>
              <Typography style={{ color: 'white'}} variant="body1" component="h3">
                  Weeks sales
                </Typography>
            <Grid container>

                <Grid item xs={9}>
                <Typography variant="display1" component="h3">
                  
                </Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography style={{float: 'right', color: 'white'}} variant="body1" component="h5">
                  900€
                </Typography>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        </Grid>
    )
  }
}


export default StatContact;