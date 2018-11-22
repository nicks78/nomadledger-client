//manager/src/components/common/rightDrawer.js

import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/CloseOutlined'
import {Divider, Typography, IconButton} from '@material-ui/core';

const styles = theme => ({
    drawer: {
        backgroundColor: theme.palette.grey.light,
        height: '100%',
        minWidth: '300px',
        maxWidth: '450px',
    },
    icon: {
        color: 'red',
        float: 'right',
    },
    span: {
        marginTop: 44,
        paddingLeft: 20,
    }
})

const RightDrawer = (props) => {

    const { classes, toggleDrawer, side, open, title } = props

    return (
        <Drawer anchor={side} open={ open } onClose={ toggleDrawer(side, false) }>
            <div className={ classes.drawer }>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={ classes.span }>
                    <Typography color="textPrimary" variant="title">{title}</Typography>
                    
                </div>
                
                <div>
                    <IconButton className={  classes.icon } onClick={ toggleDrawer(side, false) }><CloseIcon /></IconButton>
                </div>
            </div>
            <Divider style={{marginTop: 10}}/>
                <div>
                    {props.children}
                </div>
            </div>
        </Drawer>
    )
}

const ApxRightDrawer = withStyles(styles)(RightDrawer)

export {ApxRightDrawer};
