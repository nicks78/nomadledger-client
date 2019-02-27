import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Locale from '../../redux/locale'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error'

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        backgroundColor: theme.palette.error.main,
        padding: 10
    },
    text: {
        color: theme.palette.error.contrastText,
        textAlign: 'center'
    },
    icon: {
        position: 'relative',
        bottom: '-5px',
        fontSize: '18px'
    }
});

const Alert = (props) => {

    const {classes} = props  

    return (
        <Paper className={ classes.root }>
            <Typography className={ classes.text }><ErrorIcon className={ classes.icon}/>&nbsp;{ Locale[localStorage.getItem('locale')].message[props.message]}</Typography>
        </Paper>
  );
}

const ApxAlert = withStyles(styles)(Alert)

export default ApxAlert;