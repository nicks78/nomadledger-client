import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/EditOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'


const styles = theme => ({
    icon: {
        float: 'right',
    },
    editicon: {
        color: theme.palette.primary.main,
        width: '0.8em !important',
        height: '0.8em !important',
    },
    checkicon: {
        color: theme.palette.green,
        width: '0.8em !important',
        height: '0.8em !important',
    },
});

const ButtonEdit = (props) => {

  const {classes, showEdit, openEdit, updateDocument, style } = props
  
  return (
    <IconButton className={ classes.icon }  onClick={ showEdit ? updateDocument :  openEdit} style={style}>
        { showEdit ? <CheckIcon className={ classes.checkicon }/> : <EditIcon className={ classes.editicon }/> }
    </IconButton>
  );
}

const ApxButtonEdit =  withStyles(styles)(ButtonEdit)

export { ApxButtonEdit };