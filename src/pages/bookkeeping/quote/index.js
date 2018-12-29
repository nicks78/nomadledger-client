//manager/src/pages/quote/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import {  getBookList } from '../actions'
import { getTotal } from '../../../redux/actions'
import { cvtNumToUserPref } from '../../../utils/help_function'
import { withStyles, Button, Hidden ,Table, TableHead, TableBody, Checkbox, Paper, TableCell, TableRow,} from '@material-ui/core';
import {ApxTableToolBar, ApxAlert, ApxTableActions} from '../../../components/common'
import Pagination from '../../../lib/pagination'

class Quote extends Component {

    state = {
        showExpense: false,
        reducer: "QUOTE",
        selected: [],
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null || this.props.updated ){
            this.props.getTotal(this.state.reducer);
            this.props.getBookList(this.state.reducer, "?limit=5&skip=0");
        }
        
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showExpense: false, keyLocation: nextProps.location.key })
        }
    }

    onSelectAllClick = (event) => {
        if (event.target.checked) {
            this.setState({ selected: this.props.listQuote.map(n => n._id) });
            return;
        }
        this.setState({ selected: [] });
    }

    onSelectedField = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {

            newSelected = newSelected.concat(selected, id);

        } else if (selectedIndex === 0) {

            newSelected = newSelected.concat(selected.slice(1));

        } else if (selectedIndex === selected.length - 1) {

            newSelected = newSelected.concat(selected.slice(0, -1));

        } else if (selectedIndex > 0) {

            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );

        }
    
        this.setState({ selected: newSelected });
    }

    isSelected = id =>  this.state.selected.indexOf(id) !== -1;

    handleOpenImage = () => {
        
    };
    
    render() {
    
    const {listQuote, isFetching, isError,  locale, classes, message} = this.props
    const { selected, rowCount, reducer } = this.state

    if(isError){
        return <ApxAlert message={message} />
    }

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/bookkeeping/quote/add" variant="contained" color="secondary"  className={  classes.button }>{locale.button.add_quote}</Button>
            </Hidden>
            <Paper>

            <ApxTableToolBar
                        numSelected={selected.length}
                        title={locale.table.title_quote}
                        selected={locale.table.selected}
                    />
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < rowCount}
                                checked={selected.length === this.props.listQuote.length}
                                onChange={this.onSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>{locale.table.reference}</TableCell>
                            <TableCell>{locale.table.client}</TableCell>
                            <TableCell>{locale.table.currency}</TableCell>
                            <TableCell>{locale.table.subtotal}</TableCell>
                            <TableCell>{locale.table.vat}</TableCell>
                            <TableCell>{locale.table.total}</TableCell>
                            <TableCell>{locale.table.status}</TableCell>
                            <TableCell>Actions</TableCell>

                        </TableRow>
                        </TableHead>
                        
                        <TableBody className={classes.tableBody}>
                            {   !isFetching ? 
                                listQuote.map(( quote, index) => {
                                    const isSelected = this.isSelected(quote._id);
                                    return  <TableRow key={index} selected={isSelected}>
                                                <TableCell padding="checkbox" onClick={ event => { this.onSelectedField(event, quote._id) } } >
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>
                                                <TableCell>{quote.ref}</TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${quote.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{quote.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell>{quote.currency.en}</TableCell>
                                                <TableCell>{cvtNumToUserPref(quote.total_ht)}</TableCell>
                                                <TableCell>{cvtNumToUserPref(quote.vat.amount)}</TableCell>
                                                <TableCell>{cvtNumToUserPref(quote.total)}</TableCell>
                                                <TableCell><span style={{color: quote.status.color }}>{ locale.table[quote.status.label] }</span></TableCell>
                                                <ApxTableActions 
                                                    actionDelete={false}
                                                    actionEdit={`/bookkeeping/quote/edit/${quote._id}`}
                                                    actionView={false}
                                                    actionCheck={false}

                                                />
                                            </TableRow>
                                })
                                : null                           
                            }
                            
                        </TableBody>

                    </Table>
                    <Pagination
                        total={this.props.total}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        label={locale.table.label_rows_per_page}
                        label2={locale.table.of}
                        reducer={reducer}
                        onGetItemList={ this.props.getBookList }
                    />
            </Paper>
      </div>
    )
  }
}

const styles = theme => ({

    root: {

    },
    button: {
        color: 'white !important',
        marginRight: 10,
        marginBottom: theme.margin.unit,
        '& :hover': {
            color: 'white !important', 
        }
    },
})

const mapStateToProps = (state) => {

    return {
        isFetching: state.book.quote.isFetching,
        updated: state.book.quote.updated,
        isError: state.book.quote.isError,
        message: state.book.quote.message,
        receivedAt: state.book.quote.receivedAt,
        locale: state.locale.locale,
        total: state.library.quote.total,
        listQuote: state.book.quote.list,
        rowsPerPageOptions: state.library.quote.rowsPerPageOptions,
    }
}

const StyledQuote = withStyles(styles)(Quote)

export default connect(mapStateToProps, {  getBookList, getTotal  })(StyledQuote);