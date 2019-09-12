import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetTask } from '../../redux/task/actions'
import { getData, resetStat } from '../../redux/stat/actions'
import { getAllTask, updateStatus } from '../../redux/task/actions'
import { Grid, Typography, withStyles, Paper, Button } from '@material-ui/core'
import BarCharts from '../../components/common/barCharts'
import BarHorizontal from '../../components/common/barHorizontal'
import BarYear from '../../components/common/barYear'
import PieCharts from '../../components/common/pie'
import { cvtNumToUserPref } from '../../utils/help_function'
import Spinner from '../../components/common/spinner'
import StatusTask from '../task/statusTask'
import EmptyChart from './components/emptyChart'

class Home extends Component {

    state = {
        reducer: 'STAT',
        net_profit: 0,
        width: window.innerWidth
    }

    componentDidMount() {
        this.props.getData("mainStat", "");
        this.props.getData("pieQuote", "compare/quote/success-onhold-rejected");
        this.props.getData("expensesBy", "sum/expenses/bycategory");
        this.props.getData("yearly", "sum/yearly-stat?locale=" + localStorage.getItem('locale'))
        this.props.getAllTask("daily", "dailyTask");

        window.addEventListener("resize", this.catchWidth)
    }

    catchWidth = () => {
        this.setState({ width: window.innerWidth })
    }

    componentWillUnmount() {
        this.props.resetTask();
        this.props.resetStat("mainStat")
        this.props.resetStat("pieQuote")
        this.props.resetStat("expensesBy")
    }

    render() {

        const { classes, tasks, isFetching, pieQuote, mainStat, expensesBy, yearly, locale, currency, isFetchingTask } = this.props
        const { width } = this.state
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const isMobile = width <= 500
        const showStat = mainStat ? mainStat.sumExpenses || mainStat.count : false

        if (isFetching || isFetchingTask) {
            return <Spinner />
        }
        if (!pieQuote || !mainStat || !expensesBy || !yearly) {
            return <Spinner />
        }

        return (
            <div>
                <Grid container spacing={isMobile ? 4 : 24} className={classes.gridContainer}>
                    <Grid item xs={6} md={6} sm={6}>
                        <Paper className={classes.paperHeader} style={{ backgroundColor: "white" }}>
                            <Typography variant="h2" align="center" style={{ color: "#fab746", marginBottom: 10, fontWeight: 500, fontSize: 30 }} >  {cvtNumToUserPref(mainStat ? mainStat.turnover : 0)}  {currency.value} </Typography>
                            <Typography variant={isMobile ? "body2" : "h3"} align="center" style={{ fontWeight: 700, color: "#484848" }}>{locale.subheading.label_revenue}  {mainStat && mainStat.fiscal_year}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} sm={6}>
                        <Paper className={classes.paperHeader} style={{ backgroundColor: "white" }}>
                            <Typography variant="h2" align="center" style={{ color: "#0c3c5e", marginBottom: 10, fontWeight: 500, fontSize: 30 }}>  {cvtNumToUserPref(mainStat ? mainStat.sumExpenses : 0)}  {currency.value} </Typography>
                            <Typography variant={isMobile ? "body2" : "h3"} align="center" style={{ fontWeight: 700, color: "#484848" }}>{locale.wording.expense}s  {mainStat && mainStat.fiscal_year}</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={24} className={classes.charts}>

                    <Grid item xs={12} sm={8} md={8}>
                        <Paper className={classes.paper}>
                            <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px" }}>
                                {locale.wording.statistics}
                            </Typography>
                            {
                                showStat ?
                                    <BarCharts chartData={mainStat} id="mainStat" currency={currency.value || "-"} />
                                    : <EmptyChart user={this.props.user} locale={locale} />
                            }
                        </Paper>
                        <Paper className={classes.paper} style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <Typography variant="h2" align="center">{locale.subheading.label_daily_task}&nbsp;
                            <span style={{ textTransform: "capitalize" }}>{new Date().toLocaleDateString(localStorage.getItem("locale"), options)}</span>
                            </Typography>
                            <br />
                            <div>
                                {
                                    tasks.tasks ?
                                        tasks.tasks.map((task, index) => {
                                            return <div className={classes.task} key={index}>
                                                <StatusTask task={task} />
                                                <Typography variant="body1" className={classes.taskTitle} >
                                                    {task.subject}

                                                </Typography>
                                                <Typography variant="caption">
                                                    {task.short_desc}
                                                </Typography>

                                            </div>
                                        })
                                        : <Typography variant="caption" style={{ padding: 10 }} align="center">
                                            {locale.subheading.label_not_task_found}
                                        </Typography>
                                }
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                        <Paper className={classes.paper} style={{ minHeight: "auto" }}>
                            <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px" }}>
                                {locale.wording.pending_invoice}
                            </Typography>
                            <Typography variant="h1" align="center" style={{ padding: "0px 12px 12px 12px", fontSize: 30, fontWeight: 500, color: "rgb(98, 193, 197)" }}>
                                {cvtNumToUserPref(mainStat.sumPending)}&nbsp;{currency.value}
                            </Typography>
                        </Paper>
                        <Paper className={classes.paper} >
                            <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px" }}>
                                {locale.wording.conversions} &nbsp;({locale.wording.quote})
                            </Typography>
                            <div>
                                {
                                    pieQuote.total ?
                                        <PieCharts
                                            chartData={pieQuote}
                                            locale={locale}
                                        />
                                        : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 24 }}>
                                            <div style={{ textAlign: "center" }}>
                                                <Typography variant="caption">{locale.dashboard.empty_quote}</Typography>
                                                <Button component={Link} to="/quote/create"
                                                    variant="contained" color="primary"
                                                    className={classes.button}>
                                                    {locale.quote.btn_create}
                                                </Button>
                                            </div>
                                        </div>
                                }
                            </div>
                        </Paper>

                        <Paper className={classes.paper} >
                            <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px" }}>
                                {locale.subheading.label_yearly_stat}
                            </Typography>
                            {
                                yearly ?
                                    <BarYear chartData={yearly} id="yearly" currency={currency.value || "-"} />
                                    : null
                            }
                        </Paper>
                        <Paper className={classes.paper}>
                            <Typography variant="h2" align="center" style={{ padding: "0px 12px 12px 12px" }}>
                                {locale.subheading.label_graph_expense}
                            </Typography>
                            {
                                expensesBy ?
                                    <BarHorizontal chartData={expensesBy} id="expensesBy" currency={currency.value || "-"} />
                                    : null
                            }
                        </Paper>
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
        backgroundColor: "rgba(58,58,58,.12)",
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
        padding: 24,
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
        position: "relative",
        overflow: "hidden",
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
    },
    picto: {
        position: "absolute",
        width: 100,
        right: 50,
        opacity: 0.5,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    button: {
        color: 'white !important',
        backgroundColor: theme.palette.yellow.dark,
        marginRight: 10,
        marginTop: 12,
        marginBottom: theme.margin.unit,
        '& :hover': {
            color: 'white !important',
        }
    }

})


const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
        isFetchingTask: state.task.isFetching,
        mainStat: state.stat.mainStat || null,
        expensesBy: state.stat.expensesBy || null,
        pieQuote: state.stat.pieQuote || null,
        yearly: state.stat.yearly || null,
        tasks: state.task.dailyTask || {},
        currency: state.account.company.item ? state.account.company.item.currency : {},
        status: state.helper.items.status_task,
        user: state.account.user.item
    }
}


const StyledHome = withStyles(styles)(Home)

export default connect(mapStateToProps, { getData, resetStat, getAllTask, resetTask, updateStatus })(StyledHome);
