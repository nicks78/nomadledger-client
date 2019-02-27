//manager/src/components/common/textIndexValue.js

import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
    root: {
        clear: 'both'
    },
    spanWrapper: {
        lineHeight: '1.6em'
    },
    value: {
        float: "right",
    },
    label: {
        float: "left"
    }
});


/**
 * 
 * @param  value
 * @param label
 * @param html_tag
 * @param href
 */
const TextIndexValue = (props) => {

  const { classes, value, href, html_tag, label } = props

  return (
    <div className={classes.root}>
            <Typography className={ classes.spanWrapper } variant="caption" component="p">
            <span className={ classes.label }>{label} :</span>
        </Typography>
        <Typography className={ classes.spanWrapper } variant="body1" component={html_tag || "p"} href={href || null }>
            <span className={ classes.value }>{value}</span>
        </Typography>
        
    </div>
  );
}

const ApxtextIndexValue =  withStyles(styles)(TextIndexValue)

export { ApxtextIndexValue };