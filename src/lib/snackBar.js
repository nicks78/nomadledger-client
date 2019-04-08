//src/components/common/snackBar.js

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {resetNotification} from '../redux/notification/actions'
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  snack: {
    marginTop: 24
  },
  success: {
    marginTop: 24,
    "& div":{
      color: "white",
      backgroundColor: "green",
    }
  },
  error: {
    marginTop: 24,
    "& div":{
      color: "white",
      backgroundColor: "red",
    }
  },
  info: {
    marginTop: 24,
    "& div":{
      color: "white",
      backgroundColor: "blue",
    }
  },
  warning: {
    marginTop: 24,
    "& div":{
      color: "white",
      backgroundColor: "amber",
    }
  },
});

class SimpleSnackbar extends React.Component {

  handleClose = (event, reason) => {
    this.props.resetNotification()
    if (reason === 'clickaway') {
      return;
    }
  }


  render() {
    const { classes, status, locale } = this.props;
    return (
      <div>
        <Snackbar
          className={ classes[status]}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.props.openSnack}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{  locale.message[this.props.text]}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  return {
      openSnack: state.notification.openSnack,
      text: state.notification.text
  }
}

const SnackBar = withStyles(styles)(SimpleSnackbar)

export default connect(mapStateToProps, { resetNotification })(SnackBar);
