//manager/src/components/common/titleBar.js

import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {ApxButtonEdit} from './'

const styles = (theme) => ({

    banner: {
        padding: 15,
        borderRadius: 4,
        border: '1px solid #008489'
    },
    header: {
        textTransform: 'uppercase',
        color: theme.palette.primary.main
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

export { ApxTitleBar };

