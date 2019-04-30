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
      fontWeight: 600,
      maxWidth: 500,
      textAlign: 'center',
      padding: '5px 5px 5px 5px',
      fontSize: 14,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,1)',
  }
});

const helpText = {
  fr: "Clique pour ouvrir le panel d'edition et reclique pour mettre à jour les informations ",
  en: "Click to open edit panel and click back to update informations"
}

const ButtonEdit = (props) => {

  const {classes, showEdit, openEdit, updateDocument, style, isUpdating } = props

  return (
    <Tooltip title={helpText[localStorage.getItem('locale') || "fr"]} classes={{ tooltip: classes.lightTooltip }}><IconButton className={ classes.icon }  onClick={ showEdit ? updateDocument :  openEdit} style={style} >
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
