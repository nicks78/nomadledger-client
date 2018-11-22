//src/components/lib/table/tablePagination.js
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftOutlined'
import ChevronRightIcon from '@material-ui/icons/ChevronRightOutlined'


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    pagination: {
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 24
},
    pag: {
        color: theme.palette.secondary.light,
        cursor: 'pointer'
    }
  
  });


const TablePagination = (props) => {

    const {classes } = props

    return (
        <div className={ classes.pagination }>

           <div className={ classes.pag }>
             <ChevronLeftIcon onClick={ props.handlePrev } style={{ marginRight: 20 }}/>
             <ChevronRightIcon onClick={ props.handleNext } />
           </div>
           
         </div>
    )
  
}

export default withStyles(styles)(TablePagination);