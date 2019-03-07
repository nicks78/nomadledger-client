import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Locale from '../../redux/locale'
import Snackbar from '@material-ui/core/Snackbar';


const styles = theme => ({
    error: {
        '& div': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText
        }
    }
});

const SnackBar = (props) => {

    const {classes, message, isError} = props  

    return (
        <Snackbar
          className={classes.error}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={ isError }
          autoHideDuration={20}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{Locale[localStorage.getItem('locale')].message[message]}</span>}
        />
  );
}

const ApxSnackBar = withStyles(styles)(SnackBar)

export default ApxSnackBar;