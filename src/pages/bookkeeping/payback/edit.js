//manager/src/pages/quote/editInvoice.js

import React from 'react'
import {connect} from 'react-redux'
import { createState , updateDocument, getDocument, resetState} from '../../../redux/book/actions'
import { convertToCurrency, getListItem} from '../../../redux/book/itemActions'
import { withStyles } from '@material-ui/core';
import Form from '../common/form'
import ApxAlert from '../../../components/common/alert'
import Spinner from '../../../components/common/spinner'

class EditPayback extends React.Component {

    state = {
        reducer: "PAYBACK"
    }

    componentWillUnmount(){
        this.props.resetState(this.state.reducer)
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        this.props.getDocument(this.state.reducer, id);
    }
    
    handleDropDown = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        if(name === "currency") {
            // Update each items with the correct currency rate
            for (let i = 0; i < this.props.listItems.length; i++) {
                this.props.convertToCurrency(this.state.reducer, value, this.props.listItems[i])
            }
        }
        this.props.createState( this.state.reducer, name, value)
    }



    render(){

    const { isFetching, locale, classes, payback, listItems, vat, message, isError, currency, status } = this.props;

    if(isFetching || payback === null ){
        return <Spinner />
    }

    return (
            <div className={ classes.root}>

                { isError ? <ApxAlert message={message} type="danger"/> : null }
                <Form 
                    formTitle="edit_payback"
                    data={payback}
                    vat={vat}
                    list={listItems}
                    locale={locale}
                    currency={currency}
                    status={status}
                    handleSubmit={this.props.updateDocument}
                    handleDropDown={ this.handleDropDown }
                    getListItem={this.props.getListItem}
                    createState={this.props.createState}
                    reducer={this.state.reducer}
                    btnLabel={locale.wording.update}
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
        isFetching: state.book.payback.isFetching,
        isError: state.book.payback.isError,
        locale: state.locale.locale,
        message: state.book.payback.message,
        payback: state.book.payback.item,
        listItems: state.book.payback.item ? state.book.payback.item.list_items : [],
        vat: state.account.company.item ? state.account.company.item.vat : [],
        status: state.helper.items.status_payback,
        currency: state.helper.items.currency
    }
}

const StyledEditPayback = withStyles(styles)(EditPayback)

export default connect(mapStateToProps, { getListItem, convertToCurrency, updateDocument, getDocument, createState, resetState })(StyledEditPayback);