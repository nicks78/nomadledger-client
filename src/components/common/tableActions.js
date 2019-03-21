//manager/src/components/common/tableActions.js

import React  from 'react'
import { Link } from "react-router-dom";
import { withStyles, TableCell } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeOutlined'

const TableActions = (props) => {

    const { actionDelete, actionEdit, actionCheck, actionView, classes } = props

    return  <TableCell className={classes.root}>
                { actionEdit ? <Link to={actionEdit}><EditIcon  className={classes.iconButton}  style={{ color: '#0077c5' }}/></Link> : null }
                { actionDelete ?<Link to="/bookkeeping/quote/add"><DeleteIcon className={classes.iconButton} style={{ color: 'red' }} /></Link>: null }
                { actionCheck ? <Link to="/bookkeeping/quote/add"><CheckIcon className={classes.iconButton} style={{ color: 'green' }}/> </Link>: null }
                { actionView ? <Link to={actionView}><RemoveRedEyeIcon className={classes.iconButton} style={{ color: 'green' }} /> </Link>: null }
                
            </TableCell>

}
const styles  = theme => ({
    root: {
        textAlign: 'center',
        '& :hover': {
            opacity: 0.7
        }
    },
    iconButton: {
        cursor: 'pointer',
        fontSize: '18px',
        marginRight: '10px',
    }
})

const ApxTableActions = withStyles(styles)(TableActions)

export default ApxTableActions;