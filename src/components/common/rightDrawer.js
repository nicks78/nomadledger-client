//manager/src/components/common/rightDrawer.js

import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/CloseOutlined'
import {Divider, Typography, IconButton} from '@material-ui/core';

const styles = theme => ({
    drawer: {
        backgroundColor: '#fff',
        height: '100%',
        minWidth: '300px',
        maxWidth: '450px',
    },
    titleWrap: {
        display: 'flex', 
        justifyContent: 'space-between'
    },
    span: {
        marginTop: 44,
        paddingLeft: 20,
    },
    icon: {
        color: 'red',
        float: 'right',
    },
    divider:{
        marginTop: 10
    }
})

/**
 * 
 * @param side Which side to open (right/left)
 * @param open true/false
 * @param title Title of the drawer
 * @func toggleDrawer handle open/close the drawer
 */
const RightDrawer = (props) => {

    const { classes, toggleDrawer, side, open, title } = props

    return (
        <Drawer anchor={side} open={ open } onClose={ toggleDrawer(side, false) }>
            <div className={ classes.drawer }>
            <div className={ classes.titleWrap }>
                <div className={ classes.span }>
                    <Typography  variant="overline">{title}</Typography>
                    <Typography  variant="caption">Champs obligatoire</Typography>
                </div>
                
                <div>
                    <IconButton className={  classes.icon } onClick={ toggleDrawer(side, false) }><CloseIcon /></IconButton>
                </div>
            </div>
            <Divider className={ classes.divider }/>
                <div>
                    {props.children}
                </div>
            </div>
        </Drawer>
    )
}

const ApxRightDrawer = withStyles(styles)(RightDrawer)

export default ApxRightDrawer;
