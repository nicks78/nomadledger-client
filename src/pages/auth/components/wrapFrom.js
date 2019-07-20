//src/pages/auth/components/wrapFrom.js

import React from 'react'
import { withStyles, Paper } from '@material-ui/core';


const WrapForm = (props) => {

    const {classes} = props

    return (
        <Paper className={classes.paper}>
            {props.children}
        </Paper>
    )
}


const styles = theme => ({
    paper: {
        width: '35%',
        margin: '0 auto',
        padding: 24,
        overflow: 'hidden',
        minHeight: 400,
        [theme.breakpoints.down('sm')]: {
            padding: 12,
            width: '100%',
            boxShadow: 'none',
            borderRadius: 0,

        }
    },
})

export default withStyles(styles)(WrapForm)
