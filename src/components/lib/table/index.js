//manager/src/components/lib/table/index.js

import React from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from './tablePagination';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.grey.light,
    color: theme.palette.common.grey,
    fontWeight: 400,
    fontSize: 16,   
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  link: {
    color: theme.palette.secondary.main,
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});


class ApxTable extends React.Component {

    handleNext = () => {
       
    }

    handlePrev = () => {
        
    }

    createSortHandler(){
      
    }

    render() {

      const { tableIndex, listData , reducer, classes} = this.props;


      const tableRow = 
        listData.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableCell><Link to={{ pathname: `/${reducer.toLowerCase()}/view/${row._id.toLowerCase()}`, state: { reducer: reducer } }}><span  className="link">{row.company_name}</span></Link></TableCell>
              <TableCell>{row.firstname}&nbsp;{row.lastname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell numeric>{row.phone}</TableCell>
            </TableRow>
          );
      })
      
        return (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {
                    tableIndex.map(( cell, index ) => {
                      return <CustomTableCell key={ index } numeric={cell.numeric }>{cell.label}</CustomTableCell>
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                  { tableRow }
              </TableBody>
            </Table>
            <TablePagination 
              handleNext={ this.handleNext }
              handlePrev={ this.handlePrev }
            />
          </Paper>
        )
    }
}
 

export default withStyles( styles )(ApxTable);
