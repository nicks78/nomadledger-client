import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Locale from '../../utils/locale'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error'

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        backgroundColor: theme.palette.error.main,
        padding: 15
    },
    text: {
        color: theme.palette.error.contrastText,
        textAlign: 'center'
    }
});

const Alert = (props) => {

    const {classes} = props  

    return (
        <Paper className={ classes.root }>
            <Typography className={ classes.text }><ErrorIcon/></Typography>
            <Typography className={ classes.text }>&nbsp;{ Locale[localStorage.getItem('locale')].message[props.message]}</Typography>
        </Paper>
  );
}

const ApxAlert = withStyles(styles)(Alert)

export {  ApxAlert };