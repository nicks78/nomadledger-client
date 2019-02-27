//manager/src/pages/quote/CreateQuote.js

import React from 'react'
import {connect} from 'react-redux'
import { createState, createDocument} from '../../../redux/book/actions'
import { convertToCurrency, getListItem} from '../../../redux/book/itemActions'
import { withStyles } from '@material-ui/core';
import Spinner from '../../../components/common/spinner'
import ApxAlert from '../../../components/common/alert'
import Form from '../common/form'


class CreateQuote extends React.Component {

    handleDropDown = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        if(name === "currency") {
            // Update each items with the correct currency rate
            for (let i = 0; i < this.props.listItems.length; i++) {
                this.props.convertToCurrency("QUOTE", value, this.props.listItems[i])
            }
        }
        this.props.createState( "QUOTE", name, value)
    }

    render(){

    const { isFetching, locale, classes, newQuote, listItems, vat, message, isError } = this.props;

    if(isFetching){
        return <Spinner/>
    }

    return (
            <div className={ classes.root}>

                { isError ? <ApxAlert message={message} /> : null }

                <Form 
                    formTitle="new_quote"
                    data={newQuote}
                    vat={vat}
                    list={listItems}
                    locale={locale}
                    handleSubmit={this.props.createDocument}
                    handleDropDown={ this.handleDropDown }
                    getListItem={this.props.getListItem}
                    createState={this.props.createState}
                    reducer="QUOTE"
                    btnLabel={locale.button.save}
                    date_1="created_at"
                    date_2="expired_at"

                />
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit
    },
})

const mapStateToProps = (state) => {
    return {
        isError: state.book.quote.isError,
        isFetching: state.book.quote.isFetching,
        locale: state.locale.locale,
        newQuote: state.book.quote.item || {},
        message: state.book.quote.message,
        listItems: state.book.quote.item.list_items,
        vat: state.account.company.item ? state.account.company.item.vat : [],
    }
}

const StyledCreateQuote = withStyles(styles)(CreateQuote)

export default connect(mapStateToProps, { createState, getListItem, convertToCurrency, createDocument })(StyledCreateQuote);