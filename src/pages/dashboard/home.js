import React, { Component } from 'react'
import {connect} from 'react-redux'
import { resetTask} from '../../redux/task/actions'
import { getData } from '../../redux/stat/actions'
import { getAllTask } from '../../redux/task/actions'
import {Grid, Typography, withStyles } from '@material-ui/core'
import BarCharts from '../../components/common/barCharts'
import BarHorizontal from '../../components/common/barHorizontal'
import PieCharts from '../../components/common/pie'
import ApxPaper from '../../components/common/paper'
import {cvtNumToUserPref} from '../../utils/help_function'
import Spinner from '../../components/common/spinner'


class Home extends Component {

    state = {
        showContact: false,
        reducer: 'STAT'
    }

    componentDidMount(){
        this.props.getData( "mainStat", "" );
        this.props.getData( "pieQuote", "compare/quote/success-onhold-rejected" );
        this.props.getData( "expensesBy", "sum/expenses/bycategory" );
        this.props.getAllTask("daily", "dailyTask");
    }

    componentWillUnmount(){
        this.props.resetTask()
    }

    render() {

        const {classes, tasks, isFetching, pieQuote, mainStat, expensesBy, locale, currency} = this.props
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        if(isFetching){
            return <Spinner />
        }

        return (
            <div>
        <ApxPaper>
            <Typography variant="h1" align="center">  { cvtNumToUserPref( mainStat ? mainStat.turnover : 0) }  { currency.value } </Typography>
            <Typography variant="caption" align="center" style={{ marginTop: 5, paddingBottom: 24 }}>{locale.subheading.label_annual_turnover} - { mainStat && mainStat.fiscal_year  }</Typography>
            
            <Grid container spacing={0} className={ classes.charts }>
                <Grid  item xs={12} sm={8} md={8}>
                    {
                        mainStat ? 
                            <BarCharts chartData={ mainStat } id="mainStat"/>
                        : null
                    }
                </Grid>
                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="body1" align="center" className={ classes.devis }>
                        { locale.wording.conversions } &nbsp;({ locale.wording.quote })
                    </Typography>

                   <div style={{ marginTop: "10%" }}>
                    {
                        pieQuote ?
                            <PieCharts 
                                chartData={ pieQuote }
                                locale={locale}
                            />
                        : null 
                    }
                    </div>                  
                </Grid>
            </Grid>
            </ApxPaper>
            <br />
            <ApxPaper>
            <Typography variant="h2" align="center">
                { locale.subheading.label_graph_expense }
            </Typography>
            <br />
            <Grid container className={classes.section_2}>
            <Grid xs={12} sm={8} md={8} >

                    {
                        expensesBy ? 
                            <BarHorizontal chartData={ expensesBy }  id="expensesBy"/>
                        : null
                    }
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Typography variant="caption" style={{ padding: 12, backgroundColor: 'rgba(44,47,50,1)', color: "white" }}>{locale.subheading.label_daily_task}&nbsp;
                        <span style={{textTransform: "capitalize"}}>{ tasks.date ? new Date(tasks.date.date).toLocaleDateString("fr", options) : null }</span>
                    </Typography>
                    <div>
                        {
                            tasks.tasks && 
                            tasks.tasks.map((task, index) => {
                                return   <div className={classes.task} key={index}>
                                <span className={ classes.status } style={{ backgroundColor: task.status.color,}}>{task.status.fr}</span>
                                            <Typography variant="body1" className={classes.taskTitle} >
                                                {task.subject}
                                                
                                            </Typography>
                                            <Typography variant="body2">
                                                    { task.short_desc }
                                            </Typography>
                                            
                                        </div>
                            })
                        }
                        {
                            tasks.tasks && 
                            tasks.tasks.map((task, index) => {
                                return   <div className={classes.task} key={index}>
                                <span className={ classes.status } style={{ backgroundColor: task.status.color,}}>{task.status.fr}</span>
                                            <Typography variant="body1" className={classes.taskTitle} >
                                                {task.subject}
                                                
                                            </Typography>
                                            <Typography variant="body2">
                                                    { task.short_desc }
                                            </Typography>
                                            
                                        </div>
                            })
                        }
                        {
                            tasks.tasks && 
                            tasks.tasks.map((task, index) => {
                                return   <div className={classes.task} key={index}>
                                <span className={ classes.status } style={{ backgroundColor: task.status.color}}>{task.status.fr}</span>
                                            <Typography variant="body1" className={classes.taskTitle} >
                                                {task.subject}
                                                
                                            </Typography>
                                            <Typography variant="body2">
                                                    { task.short_desc }
                                            </Typography>
                                            
                                        </div>
                            })
                        }
                        {
                            tasks.tasks && 
                            tasks.tasks.map((task, index) => {
                                return   <div className={classes.task} key={index}>
                                <span className={ classes.status } style={{ backgroundColor: task.status.color,}}>{task.status.fr}</span>
                                            <Typography variant="body1" className={classes.taskTitle} >
                                                {task.subject}
                                                
                                            </Typography>
                                            <Typography variant="body2">
                                                    { task.short_desc }
                                            </Typography>
                                            
                                        </div>
                            })
                        }

                        </div>
                </Grid>
            </Grid>

            
        </ApxPaper>
        </div>
    )
  }
}


const styles = theme => ({

    charts: {
        backgroundColor: "aliceblue", 
        padding: 10,
    },
    devis: {
        padding: 12
    },
    task: {
        clear: "both",
        overflow: 'hidden',
        padding: "12px",
        // backgroundColor: theme.palette.lightSecondary,
        borderBottom: `1px solid rgba(58,58,58,.22)`
    },
    taskTitle: {
        margin: 0,
        textTransform: "capitalize"
    },
    status: {
        borderRadius: 4, 
        color: "white", 
        padding: "1px 3px 1px 3px", 
        float: "right",
        bottom: 5, 
        right: 5, 
        fontSize: 11, 
        minWidth: 60, 
        textAlign: 'center'
    },
    section_2: {
        backgroundColor: theme.palette.lightSecondary,
    }
})


const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
        isFetching: state.stat.isFetching,
        mainStat: state.stat.mainStat || null,
        expensesBy: state.stat.expensesBy || null,
        pieQuote: state.stat.pieQuote || null,
        tasks: state.task.dailyTask || {},
        currency: state.account.company.item ? state.account.company.item.currency : {}
    }
}


const StyledHome = withStyles(styles)(Home)

export default connect(mapStateToProps, { getData, getAllTask, resetTask })(StyledHome);
