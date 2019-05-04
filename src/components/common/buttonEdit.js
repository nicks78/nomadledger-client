import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/EditOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';



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
    lightTooltip: {
      color: 'white',
      fontWeight: 400,
      maxWidth: 500,
      textAlign: 'center',
      padding: '5px 5px 5px 5px',
      fontSize: 12,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,1)',
  }
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
    <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}><IconButton className={ classes.icon }  onClick={ showEdit ? updateDocument :  openEdit} style={style} >
        {
            !isUpdating ?
            showEdit ? <CheckIcon className={ classes.checkicon }/> : <EditIcon className={ classes.editicon }/>
            :  <CircularProgress className={ classes.circular }color="secondary" />
        }
    </IconButton></Tooltip>
  );
}

const ApxButtonEdit =  withStyles(styles)(ButtonEdit)

export default ApxButtonEdit;
