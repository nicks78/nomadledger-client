import React  from 'react'
import {Link} from 'react-router-dom'
import { Table, TableRow, TableBody, TableHead, TableCell , Typography} from '@material-ui/core';
import { cvtNumToUserPref } from '../../../utils/help_function'

const History = (props) => {

    const {item, locale } = props;
    var balance = item.subtotal || 0;
    const lang = localStorage.getItem('locale')

    return (
        <div style={{clear: "both"}}>
            <br />
            
            <Typography variant="h2" align="center">{ locale.subheading.event_history}</Typography>
            <br />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{locale.wording.ref}</TableCell>
                  <TableCell>{locale.wording.currency}</TableCell>
                  <TableCell>{locale.wording.subtotal}</TableCell>
                  <TableCell>{locale.wording.date}</TableCell>
                </TableRow>
              </TableHead>
               
                <TableBody>
                  { item.charges &&
                    item.charges.map((x, index) => {
                      balance = balance - x.subtotal
                      return  <TableRow key={index}>
                                  <TableCell>{x.ref}</TableCell>
                                  <TableCell>{x.currency.en}</TableCell>
                                  <TableCell>{ cvtNumToUserPref(x.subtotal || 0) }</TableCell>
                                  <TableCell>{ new Date(x.date).toLocaleDateString(lang) }</TableCell>
                              </TableRow>
                    })
                  }
                  <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{locale.wording.balance_due}</TableCell>
                        <TableCell>{ cvtNumToUserPref(balance || 0)} <Link className="link" to={`/invoice/create/${item._id}`} style={{float: 'right'}} color="primary" size="small" variant="contained">Facturer</Link></TableCell>
                    </TableRow>
              </TableBody>
            </Table>
        </div>
    )
}


export default History
