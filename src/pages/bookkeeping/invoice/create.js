//manager/src/pages/bookkeeping/invoice/create.js

import React from 'react'
import {connect} from 'react-redux'
import { createState, createDocument} from '../../../redux/book/actions'
import { convertToCurrency, getListItem} from '../../../redux/book/itemActions'
import { withStyles } from '@material-ui/core';
import {  ApxAlert, Spinner} from '../../../components/common'
import Form from '../common/form'


class CreateInvoice extends React.Component {

    handleDropDown = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        if(name === "currency") {
            // Update each items with the correct currency rate
            for (let i = 0; i < this.props.listItems.length; i++) {
                this.props.convertToCurrency("INVOICE", value, this.props.listItems[i])
            }
        }
        this.props.createState( "INVOICE", name, value)
    }

    render(){

    const { isFetching, locale, classes, newInvoice, listItems, vat, message, isError } = this.props;

    if(isFetching){
        return <Spinner/>
    }

    return (
            <div className={ classes.root}>

                { isError ? <ApxAlert message={message} /> : null }
                <Form 
                    formTitle="new_invoice"
                    data={newInvoice}
                    vat={vat}
                    list={listItems}
                    locale={locale}
                    handleSubmit={this.props.createDocument}
                    handleDropDown={ this.handleDropDown }
                    getListItem={this.props.getListItem}
                    createState={this.props.createState}
                    reducer="INVOICE"
                    btnLabel={locale.button.save}
                    date_1="created_at"
                    date_2="due_at"

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
        isError: state.book.invoice.isError,
        isFetching: state.book.invoice.isFetching,
        locale: state.locale.locale,
        newInvoice: state.book.invoice.item || {},
        message: state.book.invoice.message,
        listItems: state.book.invoice.item.list_items,
        vat: state.account.company.item ? state.account.company.item.vat : [],
    }
}

const StyledCreateInvoice = withStyles(styles)(CreateInvoice)

export default connect(mapStateToProps, { createState, getListItem, convertToCurrency, createDocument })(StyledCreateInvoice);