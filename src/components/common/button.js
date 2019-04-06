import React from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 100
  },
});

const Buttons = (props) => {

  const {classes } = props

  return (
    <div>
      <Button 
          variant={props.variant} 
          type={ props.type || "button"}
          color={props.color} 
          onClick={ props.action } 
          className={classes.button}
          disabled={ props.disabled ? true :  false }
      >
          {props.title}
      </Button>
    </div>
  );
}

const ApxButton =  withStyles(styles)(Buttons)

export default ApxButton;