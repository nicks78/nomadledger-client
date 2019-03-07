//manager/src/components/common/titleBar.js

import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ApxButtonEdit from './buttonEdit'

const styles = (theme) => ({

    banner: {
        padding: 15,
        borderRadius: 4,
        backgroundColor: 'rgb(238,238,238)',
        // border: `1px solid ${theme.palette.secondary.light}`
    },
    header: {
        textTransform: 'uppercase',
        color: theme.palette.secondary.main
    },
    checkicon: {
        color: theme.palette.green,
    }
    
});

const titleBar = (props) => {

    const { classes , showEdit, openAction, editAction } = props 

    return (
        <div className={ classes.banner }>
            <Typography variant="overline">
                { props.text }
            </Typography>

            <ApxButtonEdit 
                style={{top: '-33px', right: '-5px'}}
                updateDocument={editAction}
                openEdit={openAction} 
                showEdit={showEdit}
              />
        </div>
    )
}

const ApxTitleBar = withStyles(styles)(titleBar);

export default ApxTitleBar;

