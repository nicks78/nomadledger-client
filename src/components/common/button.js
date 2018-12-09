import React from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const Buttons = (props) => {

  const {classes } = props

  return (
    <div>
      <Button variant={props.variant} color={props.color} onClick={ props.action } className={classes.button}>
          {props.title}
      </Button>
    </div>
  );
}

const ApxButton =  withStyles(styles)(Buttons)

export { ApxButton };