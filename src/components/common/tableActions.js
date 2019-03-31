//manager/src/components/common/tableActions.js

import React  from 'react'
import { Link } from "react-router-dom";
import { withStyles, TableCell } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeOutlined'
import HighlightOff from '@material-ui/icons/HighlightOffOutlined'
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined'

const TableActions = (props) => {

    const { actionDelete, actionEdit, actionCheck, actionView, actionArchive,  classes } = props

    return  <TableCell className={classes.root}>
                { actionEdit ? <Link to={actionEdit}><EditIcon  className={classes.iconButton}  style={{ color: '#0077c5' }}/></Link> : null }
                { actionDelete ? <HighlightOff className={classes.icon} style={{ color: 'red' }} />: null }
                { actionCheck ? <CheckIcon className={classes.icon} style={{ color: 'green' }}/>: null }
                { actionView ? <Link to={actionView}><RemoveRedEyeIcon className={classes.iconButton} style={{ color: 'green' }} /> </Link>: null }
                { actionArchive ? <ArchiveIcon className={classes.icon} style={{ color: 'grey' }} /> : null }
                
            </TableCell>

}
const styles  = theme => ({
    root: {
        textAlign: 'center',
        '& :hover': {
            // opacity: 0.7
        }
    },
    iconButton: {
        cursor: 'pointer',
        fontSize: '18px',
        marginRight: '10px',
    },
    icon: {
        fontSize: '18px',
        marginRight: '10px',
    }
})

const ApxTableActions = withStyles(styles)(TableActions)

export default ApxTableActions;