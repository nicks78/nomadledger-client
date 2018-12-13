//manager/src/lib/pagination.js

import React, { Component } from 'react'
import { TablePagination} from '@material-ui/core';

export default class Pagination extends Component {

    state = {
        showService: false,
        selected: [],
        keyLocation: '',
        skip: 0, 
        limit: 5,
        page: 0,
        numSelected: 0,
        rowCount: 0,
    }


    handleChangePage = (event, page) => {
        var skip =  page * this.state.limit
        this.setState({page})
        this.props.onGetItemList(this.props.reducer, `?limit=${ this.state.limit }&skip=${ skip }`);
    }

    handleChangeRowsPerPage = (event) => {
        var num = event.target.value
        this.setState({
            limit: num,
            page: 0
        })
        this.props.onGetItemList(this.props.reducer, `?limit=${num }&skip=0`);
    }


    render() {

        const { rowsPerPageOptions, total, label, label2 } = this.props
        const {page, limit} = this.state

        return (
            <TablePagination
                    component="div"
                    count={total}
                    rowsPerPage={limit}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    labelRowsPerPage={label}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions || []}
                    labelDisplayedRows={({ from, to, count }) => from +"-"+to +" "+ label2 +" "+ count  }
            />
        )
    }
}
