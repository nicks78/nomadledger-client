import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';




const CustomTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.blue.light,
    color: theme.palette.common.black,
    fontWeight: 600,
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
});


const ApxTable = (props) => {

  return (
    <Paper className={styles.root}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Compagnie</CustomTableCell>
            <CustomTableCell>Nom/Prénom</CustomTableCell>
            <CustomTableCell numeric>Téléphone</CustomTableCell>
            <CustomTableCell>Email</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {props.tableRow}
        </TableBody>
      </Table>
    </Paper>
  );
}


export { ApxTable };