//manager/src/components/common/textIndexValue.js

import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        clear: 'both'
    },
    value: {
        float: "right",
    },
});

const TextIndexValue = (props) => {

  const { classes, value, href, html_tag, label } = props

  return (
    <div className={classes.root}>
        <Typography variant="body1" component={html_tag || "p"} href={href || null }>
            <span className={ classes.value }>{value}</span>
        </Typography>
        <Typography variant="caption" component="p">
            <span className={ classes.label }>{label} :<br /></span>
        </Typography>
        
    </div>
  );
}

const ApxtextIndexValue =  withStyles(styles)(TextIndexValue)

export { ApxtextIndexValue };