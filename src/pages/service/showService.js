//manager/src/pages/service/showService.js

import React from 'react'
import {connect} from 'react-redux'
import { getItem, createState } from '../../redux/actions'
import { Paper, withStyles, Typography} from '@material-ui/core';
import {ApxAlert, Spinner} from '../../components/common'

class ShowService extends React.Component {

    componentDidMount(){
      var id = this.props.match.params.id;
      this.props.getItem("SERVICE", id)
    }



    render() {
      const {classes, service, isFetching, locale, isError, message} = this.props

      if( isFetching ){
        return <Spinner/>
      }
      if( service === null ){
        return <ApxAlert message="error_404" />
      }
      if( isError ){
        return <ApxAlert message={message} />
      }

      return (
        <Paper className={classes.paper}>
            <Typography variant="h2">
              { service.name}
            </Typography>
            
        </Paper>
      )
    }
}

const styles = theme => ({
    paper: {
      padding: 24,
    }
})

const mapStateToProps = (state) => {
  return {
      isFetching: state.library.service.isFetching,
      isError: state.library.service.isError,
      message: state.library.service.message,
      service: state.library.service.item,
      locale: state.locale.locale

  }
}

const StyledShowService = withStyles(styles)(ShowService)

export default connect(mapStateToProps, {  getItem, createState })(StyledShowService);