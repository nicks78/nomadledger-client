import React, { Component } from 'react'
import {connect} from 'react-redux'
import {API_ENDPOINT} from '../../../utils/constant'
import { withStyles } from '@material-ui/core';
import {Spinner} from '../../../components/common'
import { getAccount } from '../actions'
// import EditContactInfo from '../../contact/dashboard/editContactInfo'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({

  banner: {
    backgroundColor: theme.palette.primary.light,
    padding: 15,
    borderRadius: 4
  },
  header_01: {
    color: 'white'
  },
  avatar: {
    width: 60,
    height: 60,
  },
  wrapper: {
    padding: 24
  }

})


class User extends Component {

  componentDidMount(){
    if(this.props.receivedAt === null ){
        this.props.getAccount("USER")
    }
  }



  render() {
    const {  user, locale, classes, isFetching } = this.props;

    if( isFetching  || user === null ){
      return <Spinner />
    }

    return (
      <div>
          <div className={ classes.banner}>
            <Typography variant="subheading" className={ classes.header_01}>
                { locale.page.header_01 }
            </Typography>
          </div>

          <div className={ classes.wrapper }>
            <Avatar
                component="p"
                onClick={ this.handleMenu }
                alt="Nicolas"
                src={`${API_ENDPOINT}image/view${ user.avatar || '/default/default_avatar.png' }`}
                className={ classes.avatar }
            />

          </div>

          
      </div>
    )
  }
}


const mapStateToProps = (state) => {

      return {
          isFetching: state.account.user.isFetching,
          isError: state.account.user.isError,
          receivedAt: state.account.user.receivedAt,
          locale: state.locale.locale,
          user: state.account.user.item, 
          progress: state.account.user.progress
      }
  }
  
  const styledUser = withStyles(styles)(User);
  
  export default connect(mapStateToProps, { getAccount })(styledUser);
