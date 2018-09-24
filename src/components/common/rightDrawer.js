//manager/src/components/common/rightDrawer.js

import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseOutlined'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    drawer: {
        backgroundColor: theme.palette.grey.light,
        height: '100%'
    },
    icon: {
        color: 'red',
        float: 'right',
    },
    span: {
        marginTop: 44,
        marginLeft: 24,
    }
})

const RightDrawer = (props) => {

    const { classes, toggleDrawer, side, open, title } = props

    return (
        <Drawer anchor={side} open={ open } onClose={ toggleDrawer(side, false) }>
            <div className={ classes.drawer }>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={ classes.span }><Typography color="textSecondary" variant="title">{title}</Typography>
                
                </div>
                
                <div>
                    <IconButton className={  classes.icon } onClick={ toggleDrawer(side, false) }><CloseIcon /></IconButton>
                </div>
            </div>
                {props.children}
            </div>
        </Drawer>
    )
}

const ApxRightDrawer = withStyles(styles)(RightDrawer)

export {ApxRightDrawer};
