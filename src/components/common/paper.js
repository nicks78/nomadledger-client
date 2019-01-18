import React from 'react';
import { withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        position: 'relative',
        overflow: "hidden",
        [theme.breakpoints.down('sm')]: {
            boxShadow: 'none',
            borderRadius: 0
        },
    },
    
});

const Papers = (props) => {

    const {classes} = props  

    return (
        <Paper className={ classes.root }>
            {props.children}
        </Paper>
  );
}

const ApxPaper = withStyles(styles)(Papers)

export {  ApxPaper };