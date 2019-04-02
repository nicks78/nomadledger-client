import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getData } from '../../redux/stat/actions'
import { getAllTask } from '../../redux/task/actions'
import {Grid, Typography, withStyles } from '@material-ui/core'
import BarCharts from '../../components/common/barCharts'
import PieCharts from '../../components/common/pie'
import ApxPaper from '../../components/common/paper'
import {cvtNumToUserPref} from '../../utils/help_function'


class Home extends Component {

    state = {
        showContact: false,
        reducer: 'STAT'
    }

    componentDidMount(){
        this.props.getData( "mainStat", "" );
        this.props.getData( "pieQuote", "compare/quote/success-onhold-rejected" );
        this.props.getAllTask("daily")
    }

    render() {

        const {classes, tasks, isFetching, pieQuote, mainStat, locale, currency} = this.props
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return (
        <ApxPaper className={classes.container}>
            <Typography variant="h1" align="center">  { cvtNumToUserPref( mainStat ? mainStat.profit : 0) }  { currency.value } </Typography>
            <Typography variant="caption" align="center" style={{ marginTop: 5 }}>{locale.subheading.label_annual_profit} - { mainStat && mainStat.fiscal_year  }</Typography>
            <br />
            <Grid container spacing={24}>
                <Grid  item xs={12} sm={8} md={8} >
                <div style={{ backgroundColor: "aliceblue", padding: 10 }}>
                    {
                    this.props.mainStat ? 
                        <BarCharts chartData={ mainStat } />
                    : null
                }
                </div>
                
                    
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Typography variant="overline" className={ classes.devis }>{locale.wording.quote}&nbsp;-&nbsp;
                        
                        <span>{ tasks.date ? new Date(tasks.date.date).toLocaleDateString("fr", options) : null }</span>
                    </Typography>
                    <div>
                    {
                        tasks.tasks && 
                        tasks.tasks.map((task, index) => {
                            return <p key={index}>{task.subject}</p>
                        })
                    }

                    </div>
                    
                </Grid>
            </Grid>
            <Grid container spacing={24}>
            
                    <Grid item xs={12} sm={4} md={4}>
                        
                    {
                            pieQuote ?
                                <PieCharts 
                                    chartData={ this.props.pieQuote }
                                    locale={locale}
                                />
                            : null 
                        }
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                    
                    </Grid>
            </Grid>
            
            
        </ApxPaper>
    )
  }
}


const styles = theme => ({
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
    },
    devis: {
        marginLeft: -24,
        padding: 12,
        backgroundColor: theme.palette.lightGrey
    }
})


const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
        isFetching: state.stat.isFetching,
        mainStat: state.stat.mainStat || null,
        pieQuote: state.stat.pieQuote || null,
        tasks: state.task.list || {},
        currency: state.account.company.item.currency || ""
    }
}


const StyledHome = withStyles(styles)(Home)

export default connect(mapStateToProps, { getData, getAllTask })(StyledHome);
