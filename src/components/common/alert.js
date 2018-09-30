import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error'

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.error.main,
        padding: 20
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
            <Typography className={ classes.text }>&nbsp;{props.message}</Typography>
        </Paper>
  );
}

const ApxAlert = withStyles(styles)(Alert)

export {  ApxAlert };