import React from 'react';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Modal from '../../pages/account/modal';
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
      avatar: {
        backgroundColor: theme.palette.primary.light,
        cursor: 'pointer',
      },
      icon: {
        fontSize: '16 !important',
        cursor: 'pointer'
      }
});

const Tag = (props) => {

  const {classes, actionTag, label, variant, color, obj, type, edit } = props
 
  return (
          <Chip
            label={label}
            avatar={ edit ? <Avatar className={ classes.avatar } ><Modal obj={obj} type={type} /></Avatar> : null  }
            onDelete={actionTag}
            color={ color || "primary" }
            variant={variant || 'default'}
            className={classes.chip}
          />              
  );
}

const ApxTag =  withStyles(styles)(Tag)

export default ApxTag ;