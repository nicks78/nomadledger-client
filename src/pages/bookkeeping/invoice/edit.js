//manager/src/pages/quote/editInvoice.js

import React from 'react'
import {connect} from 'react-redux'
import { createState , updateDocument, getDocument, resetState} from '../actions'
import { convertToCurrency, getListItem} from '../itemActions'
import { withStyles } from '@material-ui/core';
import Form from '../common/form'
import { ApxAlert, Spinner} from '../../../components/common'

class EditInvoice extends React.Component {

    componentWillUnmount(){
        this.props.resetState("INVOICE")
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        this.props.getDocument("INVOICE", id);
    }
    
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

    const { isFetching, locale, classes, invoice, listItems, vat, message, isError } = this.props;

    if(isFetching || invoice === null ){
        return <Spinner />
    }

    return (
            <div className={ classes.root}>

                { isError ? <ApxAlert message={message} type="danger"/> : null }
                <Form 
                    formTitle="edit_invoice"
                    data={invoice}
                    vat={vat}
                    list={listItems}
                    locale={locale}
                    handleSubmit={this.props.updateDocument}
                    handleDropDown={ this.handleDropDown }
                    getListItem={this.props.getListItem}
                    createState={this.props.createState}
                    reducer="INVOICE"
                    btnLabel={locale.button.update}
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
        isFetching: state.book.invoice.isFetching,
        isError: state.book.invoice.isError,
        locale: state.locale.locale,
        message: state.book.invoice.message,
        invoice: state.book.invoice.item,
        listItems: state.book.invoice.item ? state.book.invoice.item.list_items : [],
        vat: state.account.company.item ? state.account.company.item.vat : [],
    }
}

const StyledEditInvoice = withStyles(styles)(EditInvoice)

export default connect(mapStateToProps, { getListItem, convertToCurrency, updateDocument, getDocument, createState, resetState })(StyledEditInvoice);