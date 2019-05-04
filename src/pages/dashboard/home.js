import React, { Component } from 'react'
import {connect} from 'react-redux'
import { resetTask} from '../../redux/task/actions'
import { getData } from '../../redux/stat/actions'
import { getAllTask, updateStatus } from '../../redux/task/actions'
import {Grid, Typography, withStyles, Paper} from '@material-ui/core'
import BarCharts from '../../components/common/barCharts'
import BarHorizontal from '../../components/common/barHorizontal'
import PieCharts from '../../components/common/pie'
import ApxPaper from '../../components/common/paper'
import {cvtNumToUserPref} from '../../utils/help_function'
import Spinner from '../../components/common/spinner'
import StatusTask from '../task/statusTask'

// Calculate total net profit
function calNetProfit(mainStat){
  var total = 0;
  if(mainStat){
      var obj = mainStat.datasets.find(obj => obj.id === 4);

      function getSum(total, num) {
        return total + num;
      }

      total = obj.data.reduce(getSum,0)
  }

  return total;
}

class Home extends Component {

    state = {
        reducer: 'STAT',
        net_profit: 0,
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

        const {classes, tasks, isFetching, pieQuote, mainStat, expensesBy, locale, currency, isFetchingTask} = this.props
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        if(isFetching || isFetchingTask ){
            return <Spinner />
        }

        return (
            <div>
        <ApxPaper>
            <Typography variant="h1" align="center">  { cvtNumToUserPref( calNetProfit(mainStat)) }  { currency.value } </Typography>
            <Typography variant="caption" align="center" style={{ marginTop: 5, paddingBottom: 24 }}>{locale.subheading.label_net_profit} - { mainStat && mainStat.fiscal_year  }</Typography>

            <Grid container spacing={0} className={ classes.charts }>

                <Grid  item xs={12} sm={8} md={8}>
                  <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px", color: "#303030" }}>
                      { locale.wording.statistics }
                  </Typography>
                    {
                        mainStat ?
                            <BarCharts chartData={ mainStat } id="mainStat" currency={ currency.value || "-" }/>
                        : null
                    }
                </Grid>
                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px", color: "#303030" }}>
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
            <Grid container spacing={24}>

            <Grid item xs={12} sm={8} md={8} >
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
                <Grid item xs={12} sm={4} md={4}>
                <Paper className={ classes.paper }>
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
                            :   <Typography variant="body1" style={{padding: 10}}>
                                    {locale.subheading.label_not_task_found}
                                </Typography>
                        }

                        </div>
                        </Paper>
                </Grid>
            </Grid>
        </div>
    )
  }
}


const styles = theme => ({

    charts: {
        padding: 10,
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
      [theme.breakpoints.down('sm')]: {
          boxShadow: 'none',
          borderRadius: 0
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
