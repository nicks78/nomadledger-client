import React from 'react';
import { withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddOutlined'
import Fab from '@material-ui/core/Fab'

const styles = theme => ({
  fab: {
    position: 'absolute', 
    bottom: 10, 
    right: 10, 
  },
});

const Buttons = (props) => {

  const {classes, handleAction, side, open, color } = props

  return (
      <Fab color={color} aria-label="Add" className={classes.fab} onClick={ handleAction(side, open) }>
        <AddIcon />
      </Fab>
  )
}

const ApxButtonCircle =  withStyles(styles)(Buttons)

export default ApxButtonCircle