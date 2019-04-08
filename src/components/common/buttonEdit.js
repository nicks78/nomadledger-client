import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/EditOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    icon: {
        float: 'right',
        // backgroundColor: "green"
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
    circular: {
        width: '15px !important', 
        height: '15px !important'
    },
});

const ButtonEdit = (props) => {

  const {classes, showEdit, openEdit, updateDocument, style, isUpdating } = props
  
  return (
    <IconButton className={ classes.icon }  onClick={ showEdit ? updateDocument :  openEdit} style={style} >
        {
            !isUpdating ? 
            showEdit ? <CheckIcon className={ classes.checkicon }/> : <EditIcon className={ classes.editicon }/>
            :  <CircularProgress className={ classes.circular }color="secondary" />
        }   
    </IconButton>
  );
}

const ApxButtonEdit =  withStyles(styles)(ButtonEdit)

export default ApxButtonEdit;