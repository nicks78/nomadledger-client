import React, { Component } from 'react'
import {Grid} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {BarCharts} from '../components/common'

class Home extends Component {
  render() {
    return (
        <div style={styles.container}>

            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={1}>
                    <Typography variant="display4" gutterBottom>
                        Number clients display4
                    </Typography>
                    <Typography variant="display3" gutterBottom>
                        Number invoices display3
                    </Typography>
                    <Typography variant="display2" gutterBottom>
                        Number devis display2
                    </Typography>
                    <Typography variant="display1" gutterBottom>
                        Monthly graph with income display1
                    </Typography>
                    <Typography variant="headline" gutterBottom>
                        Headline
                    </Typography>
                    <Typography variant="title" gutterBottom>
                        Title
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        Subheading
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Body 2
                    </Typography>
                    <Typography variant="body1" gutterBottom align="right">
                        Body 1
                    </Typography>
                    <Typography variant="caption" gutterBottom align="center">
                        Caption
                    </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={1}>
                        <Typography variant="headline" component="h3">
                            This is a sheet of paper.
                        </Typography>
                        <Typography component="p">
                            Paper can be used to build surface or other elements for your application.
                        </Typography>
                    </Paper>

                    <BarCharts />
                </Grid>
            </Grid>


            
        </div>
    )
  }
}


const styles = {
    container: {
    },
    sidebar: {
        height: '100vh',
        boxShadow: '2px 0 10px -5px black',
        zIndex: 3
    },
    content: {
        backgroundColor: 'rgb(240, 240, 240)',
        zIndex: 1,
    }
}


export default Home;