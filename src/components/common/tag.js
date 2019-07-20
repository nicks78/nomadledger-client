import React from 'react';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Modal from '../../pages/account/modal';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/DeleteOutlined'



const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      chip: {
        marginBottom: 5,
        marginRight: 5,
        borderColor: "#ffb555",
        backgroundColor: theme.palette.thinBlue
      },
      avatar: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        cursor: 'pointer',
        width: 24,
        height: 24,
        marginLeft: "5px !important",
        marginTop: .5
      },
      icon: {
        fontSize: 18,
        color: 'red',
        cursor: 'pointer'
      }

});

const Tag = (props) => {

  const {classes, actionTag, label, obj, type, edit, canDelete } = props

  return (
          <Chip
            label={label}
            avatar={ edit ? <Avatar className={ classes.avatar } ><Modal obj={obj} type={type} /></Avatar> : null  }
            onDelete={canDelete ? actionTag : null}
            deleteIcon={ <DeleteIcon className={ classes.icon } />  }
            variant="default"
            className={classes.chip}
          />
  );
}

const ApxTag =  withStyles(styles)(Tag)

export default ApxTag ;
