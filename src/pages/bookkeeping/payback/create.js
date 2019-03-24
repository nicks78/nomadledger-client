//manager/src/pages/bookkeeping/invoice/create.js

import React from 'react'
import {connect} from 'react-redux'
import { createState, createDocument, resetState} from '../../../redux/book/actions'
import { convertToCurrency, getListItem } from '../../../redux/book/itemActions'
import { withStyles } from '@material-ui/core';
import ApxAlert from '../../../components/common/alert'
import Spinner from '../../../components/common/spinner'
import Form from '../common/form'


class CreatePayback extends React.Component {

    state = {
        reducer: "PAYBACK"
    }

    componentDidMount(){
        
    }

    // componentWillUnmount(){
    //     this.props.resetState(this.state.reducer);
    // }

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

    const { isFetching, locale, classes, newPayback, listItems, vat, message, isError, currency, status } = this.props;
    const {reducer} = this.state;

    if(isFetching){
        return <Spinner/>
    }

    return (
            <div className={ classes.root}>

                { isError ? <ApxAlert message={message} /> : null }
                <Form 
                    formTitle="add_invoice"
                    data={newPayback}
                    vat={vat}
                    list={listItems}
                    currency={currency}
                    status={status}
                    locale={locale}
                    handleSubmit={this.props.createDocument}
                    handleDropDown={ this.handleDropDown }
                    getListItem={this.props.getListItem}
                    createState={this.props.createState}
                    reducer={reducer}
                    btnLabel={locale.wording.save}
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
        isError: state.book.payback.isError,
        isFetching: state.book.payback.isFetching,
        locale: state.locale.locale,
        newPayback: state.book.payback.item || {},
        message: state.book.payback.message,
        listItems: state.book.payback.item.list_items,
        vat: state.account.company.item ? state.account.company.item.vat : [],
        status: state.helper.items.status_payback,
        currency: state.helper.items.currency
    }
}

const StyledCreatePayback = withStyles(styles)(CreatePayback)

export default connect(mapStateToProps, { createState, getListItem, convertToCurrency, createDocument, resetState })(StyledCreatePayback);