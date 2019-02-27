import React from 'react';
import { withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        position: 'relative',
        padding: 24,
        overflow: "hidden",
        [theme.breakpoints.down('sm')]: {
            boxShadow: 'none',
            padding: 12,
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

export default  ApxPaper ;