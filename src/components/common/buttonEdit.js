import React from 'react';
import { withStyles, Fab } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/EditOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltips from './tooltips';



const styles = theme => ({
    editicon: {
        color: "white",
        width: '0.8em !important',
        height: '0.8em !important',
    },
    checkicon: {
        color: "white",
        width: '0.8em !important',
        height: '0.8em !important',
    },
    edit: {
      backgroundColor: theme.palette.primary.main,
      float: 'right',
    },
    check: {
      backgroundColor: theme.palette.green,
      float: 'right',
    },
    circular: {
        width: '15px !important',
        height: '15px !important'
    },

});

const helpText = {
  check: {
    en: "Click to update",
    fr: "Cliquer pour mettre à jour",

  },
  edit: {
    en: "Click to open edit panel",
    fr: "Cliquer pour ouvrir le panneau d'édition",
  }

}

const ButtonEdit = (props) => {

  const {classes, showEdit, openEdit, updateDocument, style, isUpdating } = props
  var text = showEdit ? helpText.check[localStorage.getItem('locale') || "fr"] : helpText.edit[localStorage.getItem('locale') || "fr"]

  return (
    <Tooltips title={text}>
      <Fab size="small" className={ !showEdit ? classes.edit : classes.check }   onClick={ showEdit ? updateDocument :  openEdit} style={style} >
        {
            !isUpdating ?
            showEdit ? <CheckIcon className={ classes.checkicon }/> : <EditIcon className={ classes.editicon }/>
            :  <CircularProgress className={ classes.circular }color="secondary" />
        }
    </Fab>
    </Tooltips>
  );
}

const ApxButtonEdit =  withStyles(styles)(ButtonEdit)

export default ApxButtonEdit;
