import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getData } from '../../redux/stat/actions'
import {Grid, Typography, withStyles} from '@material-ui/core'
import BarCharts from '../../components/common/barCharts'
import ApxPaper from '../../components/common/paper'

class Home extends Component {

    state = {
        showContact: false,
        reducer: 'STAT'
    }

    componentDidMount(){
        console.log("YEAH")
        this.props.getData( "currencyStat", "" )
    }


    render() {

        const {classes} = this.props
        return (
        <ApxPaper className={classes.container}>
            <Typography variant="h1" align="center">  1 999 000 € </Typography>
            <Typography variant="body1" align="center">Annual profit</Typography>
            <br />
            <Grid container spacing={24}>
                <Grid item xs={8}>
                {
                    this.props.currencyStat ? 
                    <BarCharts chartData={this.props.currencyStat} />
                    : null
                }
                    
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="overline">TO DO LIST</Typography>
                </Grid>
            </Grid>
        </ApxPaper>
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


const mapStateToProps = (state) => {

    return {
        isFetching: state.stat.isFetching,
        currencyStat: state.stat.currencyStat || null
    }
}


const StyledHome = withStyles(styles)(Home)

export default connect(mapStateToProps, { getData })(StyledHome);
