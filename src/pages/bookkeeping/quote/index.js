//manager/src/pages/quote/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import {  getBookList } from '../actions'
import { getTotal } from '../../../redux/actions'
import { withStyles, Button, Hidden,  Paper, Table, TableHead, TableBody, Checkbox, TableCell, TableRow } from '@material-ui/core';
import {ApxTableToolBar, ApxAlert, ApxTableActions} from '../../../components/common'
import Pagination from '../../../lib/pagination'
import { cvtNumToUserPref } from '../../../utils/help_function'


class Quote extends Component {

    state = {
        showQuote: false,
        reducer: "QUOTE",
        status: '10',
        selected: []
    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer, `?status=${this.state.status}`);
        this.props.getBookList(this.state.reducer, `?limit=5&skip=0&status=${this.state.status}`);
    }

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            this.setState({ selected: this.props.listQuote.map(n => n._id) });
            return;
        }
        this.setState({ selected: [] });
    }

    handleSelectedField = (event, id) => {
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

    handleStatus = (value) => {
        this.setState({status: value});
        this.props.getTotal(this.state.reducer, `?status=${value || '10'}`);
        this.props.getBookList(this.state.reducer, `?limit=5&skip=0&status=${value || '10'}`);
    };
    
    render() {
    
    const {listQuote, isFetching, isError,  locale, classes, message} = this.props
    const { selected, rowCount, reducer } = this.state;
    const filter = [{label: "approved", code: '2'},{label: 'pending', code: '1'}, {label: "draft", code: '0'}, {label: 'paid', code: '4'}, {label: 'rejected', code: '3'},{label: "all", code: '10'}] 

    if(isError){
        return <ApxAlert message={message} />
    }

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/bookkeeping/quote/create" variant="contained" color="secondary"  className={  classes.button }>{locale.button.add_quote}</Button>
            </Hidden>
            <Paper>

                <ApxTableToolBar
                        numSelected={selected.length}
                        title={locale.table.title_quote}
                        selected={locale.table.selected}
                        menus={filter}
                        locale={locale}
                        onChangeQuery={ this.handleStatus }
                    />
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < rowCount}
                                checked={selected.length === listQuote.length}
                                onChange={this.handleSelectAllClick}
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
                                listQuote.map(( item, index) => {
                                    const isSelected = this.isSelected(item._id);
                                    return  <TableRow key={index} selected={isSelected}>
                                                <TableCell padding="checkbox" onClick={ event => { this.handleSelectedField(event, item._id) } } >
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>
                                                <TableCell>{item.ref}</TableCell>
                                                <TableCell><Link className="link" to={{ pathname: `/contact/view/${item.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{item.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell>{item.currency.en}</TableCell>
                                                <TableCell>{cvtNumToUserPref(item.total_ht)}</TableCell>
                                                <TableCell>{cvtNumToUserPref(item.vat.amount)}</TableCell>
                                                <TableCell>{cvtNumToUserPref(item.total)}</TableCell>
                                                <TableCell><span style={{color: item.status.color }}>{ locale.table[item.status.label] }</span></TableCell>
                                                <ApxTableActions 
                                                    actionDelete={false}
                                                    actionEdit={`/bookkeeping/quote/edit/${item._id}`}
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
                        status={this.state.status}
                        onGetItemList={ this.props.getBookList }
                    />
            </Paper>
      </div>
    )
  }
}

const styles = theme => ({

    tableHead: {
        backgroundColor: 'rgb(238,238,238)'
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