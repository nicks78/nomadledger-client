//manager/src/pages/quote/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import { getBookList } from '../bookkeeping/actions'
import { getTotal } from '../../redux/actions'
import { withStyles, Button, Hidden ,Table, TableHead, TableBody, Checkbox, Paper, TableCell, TableRow,} from '@material-ui/core';
import {ApxTableToolBar, Spinner, ApxAlert} from '../../components/common'
// import {RichEditor} from '../../components/common'
import Pagination from '../../lib/pagination'


class Quote extends Component {

    state = {
        showExpense: false,
        reducer: "QUOTE",
        selected: [],
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null ){
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
            this.setState({ selected: this.props.listContacts.map(n => n._id) });
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
    
    const {listQuote, isFetching, isError,  locale, classes} = this.props
    const { selected, rowCount, reducer } = this.state

    if(isFetching){
        return <Spinner />
    }
    if(isError){
        return <ApxAlert message="Erreur message" />
    }

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/bookkeeping/quote/add" variant="contained" color="secondary"  className={  classes.button }>Create quote</Button>
            </Hidden>
            <Paper>

            <ApxTableToolBar
                        numSelected={selected.length}
                        title={locale.table.title_contact}
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

                        </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                listQuote.map(( expense, index) => {
                                    const isSelected = this.isSelected(expense._id);
                                    return  <TableRow key={index} selected={isSelected}>
                                                <TableCell padding="checkbox" onClick={ event => { this.onSelectedField(event, expense._id) } } >
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>

                                            </TableRow>
                                })
                            }
                            
                        </TableBody>
                    </Table>
                    <Pagination
                        total={this.props.total}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        label={locale.table.label_rows_per_page}
                        label2={locale.table.of}
                        reducer={reducer}
                        onGetItemList={ this.props.getItemList }
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
        marginRight: 10
    },

})

const mapStateToProps = (state) => {
    return {
        isFetching: state.book.quote.isFetching,
        isCreating: state.book.quote.isCreating,
        isError: state.book.quote.isError,
        listQuote: state.book.quote.list,
        receivedAt: state.book.quote.receivedAt,
        locale: state.locale.locale,
        newQuote: state.book.quote.tmp_state,
        total: state.library.quote.total,
        quote: state.book.quote.item
    }
}

const StyledQuote = withStyles(styles)(Quote)

export default connect(mapStateToProps, {  getBookList, getTotal  })(StyledQuote);