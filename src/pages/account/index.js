//src/pages/account/index.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withStyles, Paper, Typography, Grid, Divider } from '@material-ui/core';
import { getAccount, createState } from '../../redux/account/actions'
import User from './user'
import Company from './company'
import ApxAlert  from '../../components/common/alert'
import Spinner from '../../components/common/spinner'
import AddCategory from './addCategory'
import AddVat from './addVat'
import AddContactGroup from './addContactGroup'


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
  },
  titleBar: {
    padding: 15,
    borderRadius: 4,
    backgroundColor: 'rgb(238,238,238)',
    // border: `1px solid ${theme.palette.secondary.light}`
  }
})



class Account extends Component {

  componentDidMount(){
      this.props.getAccount("USER")
      this.props.getAccount("COMPANY")
  }

  handleFormEdit = (event, reducer) => {
    var name = event.target.name;
    var value = event.target.value
    
    // Temporary save data into redux store
    this.props.createState(reducer, name, value)
  }


  render() {

    const { classes, company, user, userIsFetching, companyIsFetching, locale } = this.props

    if( userIsFetching  || companyIsFetching   ){
      return <Spinner />
    }

    if( user === null || company === null  ){
      return <ApxAlert message="error_404" />
    }
    return (
      <div>
          <Grid container className={classes.root} spacing={16}>
             
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Company handleFormEdit={ this.handleFormEdit }/>
                </Paper>
                </Grid>
              
          </Grid>

          
          <Grid container spacing={24}> 
                <Grid item xs={12} md={8}>
                    <Grid container spacing={24}> 
                      <Grid item xs={12}>
                          <Paper className={classes.paper} elevation={1}>

                          <Typography variant="overline" className={classes.titleBar}>
                              {locale.subheading.param_company}
                          </Typography>
                          <br />
                          <Grid container spacing={24}> 
                              <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2"  >
                                    {locale.subheading.my_vat}
                                  </Typography>
                                  <Divider className={ classes.divider }/>
                                  <AddVat />
                              </Grid>
                              <br />
                              <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2"  >
                              {locale.subheading.contact_group}
                                </Typography>
                                <Divider className={ classes.divider }/>
                                  <AddContactGroup />
                              </Grid>
                              <Grid item xs={12}>
                              

                                <Typography variant="subtitle2"  >
                                {locale.subheading.my_categories}
                                </Typography>
                                <Divider className={ classes.divider }/>
                                <AddCategory />
                              </Grid>
                          </Grid>
                                

                          </Paper>
                      </Grid>
                    </Grid>
                </Grid>

              <Grid item xs={12} md={4}>
                  <Paper className={classes.paper} >
                    <User handleFormEdit={ this.handleFormEdit }/> 
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

export default connect(mapStateToProps, { getAccount, createState })(styledAccount);