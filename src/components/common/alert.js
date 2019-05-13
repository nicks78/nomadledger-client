import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {en, fr} from '../../redux/locale'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error'

const styles = theme => ({
    root: {
        top: 0,
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

    const {classes} = props ;

    var locale = localStorage.getItem('locale') === 'fr' ? fr : en;

    return (
        <Paper className={ classes.root }>
            <Typography className={ classes.text }><ErrorIcon className={ classes.icon}/>&nbsp;{ locale.message[props.message]}</Typography>
        </Paper>
  );
}

const ApxAlert = withStyles(styles)(Alert)

export default ApxAlert;
