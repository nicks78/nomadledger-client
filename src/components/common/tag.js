import React from 'react';
import { withStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      chip: {
        marginBottom: 5,
        marginRight: 5,
      },
});

const Tag = (props) => {

  const {classes, actionTag, label, variant, color } = props
  
  return (
    <Chip
        label={label}
        onDelete={actionTag}
        color={ color || "primary" }
        variant={variant || 'default'}
        className={classes.chip}
      />
  );
}

const ApxTag =  withStyles(styles)(Tag)

export { ApxTag };