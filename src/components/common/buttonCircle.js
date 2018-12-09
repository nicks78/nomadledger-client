import React from 'react';
import { withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddOutlined'
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    position: 'absolute', 
    bottom: 10, 
    right: 10, 
    width: "60px", 
    height: '60px', 
    borderRadius: '50%', 
    display:'block'
  },
});

const Buttons = (props) => {

  const {classes, handleAction, side, open, color, variant } = props

  return (
    <Button 
        variant={color} 
        color={variant}
        className={ classes.button }  
        onClick={ handleAction(side, open) }> <AddIcon/> </Button>
  );
}

const ApxButtonCircle =  withStyles(styles)(Buttons)

export { ApxButtonCircle };