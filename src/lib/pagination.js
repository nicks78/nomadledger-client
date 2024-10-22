//manager/src/lib/pagination.js

import React, { Component } from 'react'
import { TablePagination} from '@material-ui/core';

export default class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            skip: 0,
            limit: this.props.limit || 10,
            page: 0,
            numSelected: 0,
            rowCount: 0,
        }
    }

    // Handle next or prev pages
    handleChangePage = (event, page) => {
        var skip =  page * this.state.limit;
        this.setState({page});

        this.props.onGetItemList(this.props.reducer, `list?limit=${ this.state.limit }&skip=${ skip }&${this.props.value}`);

    }

    handleChangeRowsPerPage = (event) => {
        var num = event.target.value
        this.setState({
            limit: num,
            page: 0
        })
        this.props.onGetItemList(this.props.reducer, `list?limit=${num }&skip=0&${this.props.value}`);
    }


    render() {

        const { rowsPerPageOptions, total, label, label2 } = this.props
        const {page, limit} = this.state;

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
