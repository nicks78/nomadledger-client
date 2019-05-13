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
  success: {
    marginTop: 24,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 4,
    textAlign: "center",
    border: `1px solid #c3e6cb`,
    "& div":{
      color: "#155724",
      backgroundColor: "#d4edda",
    }
  },
  error: {
    marginTop: 24,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 4,
    textAlign: "center",
    border: `1px solid #f5c6cb`,
    "& div":{
      color: "#721c24",
      backgroundColor: "#f8d7da",
    }
  },
  info: {
    marginTop: 24,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 4,
    textAlign: "center",
    border: `1px solid #b8daff`,
    "& div":{
      color: "#004085",
      backgroundColor: "#cce5ff",
    }
  },
  warning: {
    marginTop: 24,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 4,
    textAlign: "center",
    border: `1px solid #ffeeba`,
    "& div":{
      color: "#856404",
      backgroundColor: "#fff3cd",
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
          autoHideDuration={ status === "info" || status === "warning"   ? 12000 : 6000}
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
