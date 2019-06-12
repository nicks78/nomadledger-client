import React from 'react';
import { withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        position: 'relative',
        overflow: "hidden",
        [theme.breakpoints.down('sm')]: {
            boxShadow: 'none',
            padding: 12,
            borderRadius: 0
        },
    },

});

const Papers = (props) => {

    const {classes, styled} = props

    return (
        <Paper className={ classes.root } style={styled} >
            {props.children}
        </Paper>
  );
}

const ApxPaper = withStyles(styles)(Papers)

export default  ApxPaper ;
