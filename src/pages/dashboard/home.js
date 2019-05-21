import React, { Component } from 'react'
import {connect} from 'react-redux'
import { resetTask} from '../../redux/task/actions'
import { getData } from '../../redux/stat/actions'
import { getAllTask, updateStatus } from '../../redux/task/actions'
import {Grid, Typography, withStyles, Paper } from '@material-ui/core'
import BarCharts from '../../components/common/barCharts'
import BarHorizontal from '../../components/common/barHorizontal'
import PieCharts from '../../components/common/pie'
import ApxPaper from '../../components/common/paper'
import {cvtNumToUserPref} from '../../utils/help_function'
import Spinner from '../../components/common/spinner'
import StatusTask from '../task/statusTask'

class Home extends Component {

    state = {
        reducer: 'STAT',
        net_profit: 0,
        width: window.innerWidth
    }

    componentDidMount(){
        this.props.getData( "mainStat", "" );
        this.props.getData( "pieQuote", "compare/quote/success-onhold-rejected" );
        this.props.getData( "expensesBy", "sum/expenses/bycategory" );
        this.props.getAllTask("daily", "dailyTask");

        window.addEventListener("resize", this.catchWidth)
    }

    catchWidth = () => {
      this.setState({width: window.innerWidth})
    }

    componentWillUnmount(){
        this.props.resetTask()
    }

    render() {

        const {classes, tasks, isFetching, pieQuote, mainStat, expensesBy, locale, currency, isFetchingTask} = this.props
        const {width} = this.state
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const isMobile = width <= 500
        if(isFetching || isFetchingTask ){
            return <Spinner />
        }

        return (
            <div>
              <Grid container spacing={isMobile ? 4 : 24} className={classes.gridContainer}>
                <Grid item xs={6} md={6} sm={6}>
                    <Paper className={classes.paperHeader}>
                      <Typography variant="h2" align="center" style={{color: "#00b500", marginBottom: 10, fontWeight: 600}} >  { cvtNumToUserPref( mainStat ? mainStat.turnover : 0 ) }  { currency.value } </Typography>
                      <Typography variant={isMobile ? "body2" : "h3"} align="center" style={{fontWeight: 300}}>{locale.subheading.label_revenue} - { mainStat && mainStat.fiscal_year  }</Typography>

                    </Paper>
                </Grid>
                <Grid item xs={6} md={6} sm={6}>
                    <Paper className={classes.paperHeader}>
                      <Typography variant="h2" align="center" style={{color: "#ff6a00", marginBottom: 10, fontWeight: 600}}>  { cvtNumToUserPref( mainStat ? mainStat.sumExpenses : 0 ) }  { currency.value } </Typography>
                      <Typography variant={isMobile ? "body2" : "h3"} align="center" style={{fontWeight: 300}}>{locale.wording.expense} - { mainStat && mainStat.fiscal_year  }</Typography>
                    </Paper>
                </Grid>
              </Grid>

            <Grid container spacing={24} className={ classes.charts }>

                <Grid  item xs={12} sm={8} md={8}>
                  <ApxPaper>
                  <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px", color: "#303030" }}>
                      { locale.wording.statistics }
                  </Typography>
                    {
                        mainStat ?
                            <BarCharts chartData={ mainStat } id="mainStat" currency={ currency.value || "-" }/>
                        : null
                    }
                    </ApxPaper>
                    <Paper className={classes.paper}>
                        <Typography variant="caption" className={ classes.taskHeader }>{locale.subheading.label_daily_task}&nbsp;
                            <span style={{textTransform: "capitalize"}}>{ new Date().toLocaleDateString(localStorage.getItem("locale"), options)  }</span>
                        </Typography>
                        <div>
                            {
                                tasks.tasks ?
                                tasks.tasks.map((task, index) => {
                                    return  <div className={classes.task} key={index}>
                                            <StatusTask task={task} />
                                            <Typography variant="body1" className={classes.taskTitle} >
                                                {task.subject}

                                            </Typography>
                                            <Typography variant="caption">
                                                    { task.short_desc }
                                            </Typography>

                                            </div>
                                })
                                :   <Typography variant="body1" style={{padding: 10}} align="center">
                                        {locale.subheading.label_not_task_found}
                                    </Typography>
                            }
                            </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4} md={4} >

                  <ApxPaper>
                    <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px", color: "#303030" }}>
                        { locale.wording.conversions } &nbsp;({ locale.wording.quote })
                    </Typography>
                     <div style={{ marginTop: "20%" }}>
                      {
                          pieQuote ?
                              <PieCharts
                                  chartData={ pieQuote }
                                  locale={locale}
                              />
                          : null
                      }
                      </div>
                    </ApxPaper>
                    <ApxPaper>
                      <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px", color: "#303030" }}>
                          { locale.subheading.label_graph_expense }
                      </Typography>
                        {
                            expensesBy ?
                                <BarHorizontal chartData={ expensesBy }  id="expensesBy" currency={ currency.value || "-" }/>
                            : null
                        }
                    </ApxPaper>
                </Grid>
            </Grid>
        </div>
    )
  }
}


const styles = theme => ({

    charts: {
        // padding: 10,
    },
    devis: {
        padding: 12
    },
    task: {
        clear: "both",
        overflow: 'hidden',
        padding: "15px 12px 15px 12px",
        borderBottom: `1px solid rgba(58,58,58,.22)`,
        [theme.breakpoints.down('sm')]: {
            borderBottom: "none"
        },
    },
    taskHeader: {
        padding: 15,
        borderRadius: "4px 4px 0px 0px",
        backgroundColor: 'rgba(44,47,50,1)',
        color: "white",
        borderBottom: `1px solid rgba(58,58,58,.22)`,
        [theme.breakpoints.down('sm')]: {
            borderBottom: "none",
            borderRadius: 0,
        },
    },
    taskTitle: {
        margin: 0,
        textTransform: "capitalize"
    },
    paper: {
      minHeight: 150,
      marginBottom: 24,
      [theme.breakpoints.down('sm')]: {
          boxShadow: 'none',
          borderRadius: 0
      },
    },
    tableHead: {
        backgroundColor: "rgb(238,238,238)"
    },
    paperHeader: {
      padding: 24,
      marginBottom: 12,
      [theme.breakpoints.down('sm')]: {
          boxShadow: 'none',
          padding: 12,
          marginBottom: 0,
          borderRadius: 0
      },
    },
    gridContainer: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: 24
      },
    }
})


const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
        isFetching: state.stat.isFetching,
        isFetchingTask: state.task.isFetching,
        mainStat: state.stat.mainStat || null,
        expensesBy: state.stat.expensesBy || null,
        pieQuote: state.stat.pieQuote || null,
        tasks: state.task.dailyTask || {},
        currency: state.account.company.item ? state.account.company.item.currency : {},
        status: state.helper.items.status_task
    }
}


const StyledHome = withStyles(styles)(Home)

export default connect(mapStateToProps, { getData, getAllTask, resetTask, updateStatus })(StyledHome);
