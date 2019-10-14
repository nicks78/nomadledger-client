//src/pages/account/index.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Paper, Grid } from '@material-ui/core';
import { getAccount, createState, updateDocument } from '../../redux/account/actions'
import User from './user'
import Company from './company'
import ApxAlert from '../../components/common/alert'
import Spinner from '../../components/common/spinner'


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 18
  },
  paper: {
    height: "100%"
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  icon: {
    position: 'relative',
    top: '6px',
    right: '5px',
    color: 'rgba(0,0,0,.54)'
  },
  iconHelp: {
    color: theme.palette.yellow.light
  },
  paddingContent: {
    padding: 24,
    [theme.breakpoints.down("sm")]: {
      padding: 12
    }
  },
})



class Account extends Component {

  componentDidMount() {
    this.props.getAccount("USER")
    this.props.getAccount("COMPANY")
  }

  handleFormEdit = (event, reducer) => {
    var name = event.target.name;
    var value = event.target.value

    if (name === "autoRenewal") {
      value = event.target.checked;
    }

    // Temporary save data into redux store
    this.props.createState(reducer, name, value)
  }


  render() {

    const { classes, company, user, userIsFetching, companyIsFetching, locale } = this.props

    if (userIsFetching || companyIsFetching) {
      return <Spinner />
    }

    if (user === null || company === null) {
      return <ApxAlert message="error_404" />
    }
    return (
      <div>
        <Grid container className={classes.root} spacing={16}>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className={classes.paddingContent}>
                <Company handleFormEdit={this.handleFormEdit} />
              </div>
            </Paper>
          </Grid>

        </Grid>


        <Grid container spacing={24}
          direction="row"
          justify="space-between"
          alignItems="stretch">

          <Grid item xs={12} md={6} sm={6}>
            <Paper className={classes.paper}>
              <div className={classes.paddingContent}>
                <User handleFormEdit={this.handleFormEdit} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    companyIsFetching: state.account.company.isFetching,
    companyReceivedAt: state.account.company.receivedAt,
    company: state.account.company.item,

    userIsFetching: state.account.user.isFetching,
    userReceivedAt: state.account.user.receivedAt,
    user: state.account.user.item,

    locale: state.locale.locale,
  }
}

const styledAccount = withStyles(styles)(Account);

export default connect(mapStateToProps, { getAccount, createState, updateDocument })(styledAccount);
