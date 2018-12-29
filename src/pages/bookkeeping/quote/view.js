//manager/src/pages/bookkeeping/quote/view.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withStyles, Paper } from '@material-ui/core';
import { getDocument} from '../actions'

class View extends Component {

    componentDidMount(){
        var id = this.props.match.params.id;
        this.props.getDocument("QUOTE", id);
    }

    render() {

        const {quote, classes } = this.props
        return (
            <Paper className={classes.paper}>
                { quote.ref}
            </Paper>
        )
    }
}

const styles = theme => ({
    paper: {
        padding: 24,
        marginBottom: 24,
        overflow: 'hidden',
    },
})

const mapStateToProps = (state) => {

    return {
        isFetching: state.book.quote.isFetching,
        isError: state.book.quote.isError,
        message: state.book.quote.message,
        quote: state.book.quote.item,
        locale: state.locale.locale   
    }
}

const StyledView = withStyles(styles)(View)

export default connect(mapStateToProps, {  getDocument  })(StyledView);