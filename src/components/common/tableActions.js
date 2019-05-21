//manager/src/components/common/tableActions.js

import React  from 'react'
import { Link } from "react-router-dom";
import { withStyles, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined'
import HighlightOff from '@material-ui/icons/HighlightOffOutlined'
import ModalSendMail from '../../pages/bookkeeping/common/modalSendMail'
import Tooltips from './tooltips'


const TableActions = (props) => {

    const { locale, reducer, handleAction, id, endpoint, loading,  edit, canceled, paid, item } = props;
    const ok = () => {
      var x = "paid";
      if(reducer === "QUOTE"){
        x = "approved"
      }else if(reducer === "REFUND"){
        x = "refund"
      }
      return x
    }


    return  <React.Fragment>
              {
                edit ?
                <Tooltips  title={locale.wording.edit} aria-label="edit">
                  <IconButton style={{ minWidth: 0 }} disabled={!edit || loading} component={Link} to={`/${reducer.toLowerCase()}/edit/${id}`} color="primary"><EditIcon  style={{ fontSize: 18}}/></IconButton>
                </Tooltips>
                :
                <Tooltips  title={locale.wording.preview} aria-label="edit">
                  <IconButton style={{ minWidth: 0 }} disabled={loading} component={Link} to={`/${reducer.toLowerCase()}/view/${id}`} color="primary"><RemoveRedEyeIcon  style={{ fontSize: 18}}/></IconButton>
                </Tooltips>
              }
              <ModalSendMail loading={loading} reducer={reducer} item={item} />
              <Tooltips  title={locale.wording[ok()]} aria-label="paid">
                <IconButton style={{ minWidth: 0 }} disabled={ paid || loading} onClick={ () => { handleAction(reducer, {paid: true, _id: id}, endpoint ) }} color="primary"><CheckIcon style={{ fontSize: 18, color: paid ? "rgba(0, 0, 0, 0.26)" : "forestgreen" }} /></IconButton>
              </Tooltips>
              <Tooltips  title={locale.wording.cancel} aria-label="cancel">
                <IconButton style={{ minWidth: 0 }} disabled={ canceled || loading} onClick={ () => { handleAction(reducer, {canceled: true, _id: id}, endpoint ) }} color="primary"><HighlightOff style={{ fontSize: 18,  color: canceled ? "rgba(0, 0, 0, 0.26)" : "crimson" }} /></IconButton>
              </Tooltips>
              <Tooltips  title={locale.wording.archive} aria-label="archive">
                <IconButton style={{ minWidth: 0 }} disabled={ loading} onClick={ () => { handleAction(reducer, {archive: true, _id: id}, endpoint ) }} color="primary"><ArchiveIcon style={{ fontSize: 18, color: "grey" }} /></IconButton>
              </Tooltips>
          </React.Fragment>

}
const styles  = theme => ({

})

const ApxTableActions = withStyles(styles)(TableActions)

export default ApxTableActions;

// <IconButton style={{ minWidth: 5 }} disabled={loading} onClick={ () => { handleAction(reducer, {pending: true, _id: id}, endpoint ) }} color="primary"><SendIcon style={{ fontSize: 18, color:  "darkorange" }} /></IconButton>
