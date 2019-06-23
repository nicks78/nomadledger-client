//manager/src/pages/bookkeeping/refund/create.js

import React from 'react'
import {connect} from 'react-redux'
import { createState, createDocument, resetState, convertToOtherDocument} from '../../../redux/book/actions'
import { convertToCurrency, getListItem } from '../../../redux/book/itemActions'
import { withStyles } from '@material-ui/core';
import Spinner from '../../../components/common/spinner'
import Form from '../common/form'

class CreateRefund extends React.Component {

    state = {
        reducer: "REFUND"
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        if(id){
            this.props.convertToOtherDocument("INVOICE", id, "REFUND")
        }
    }

    componentWillUnmount(){
        this.props.resetState(this.state.reducer);
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

        if(name === "vat" && this.props.newRefund.vat){
            var vat_value =  (this.props.newRefund.subtotal / 100) * value.indice ;
            this.props.createState(this.state.reducer, "vat_value", vat_value )
        }

        this.props.createState( this.state.reducer, name, value)
    }

    render(){

    const { isFetching, locale, classes, newRefund, listItems, vat, currency, status } = this.props;
    const {reducer} = this.state;

    if(isFetching){
        return <Spinner/>
    }

    return (
            <div className={ classes.root}>
                <Form
                    formTitle="add_refund"
                    data={newRefund}
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
                    refund={true}
                    btnLabel={locale.wording.save}
                    date_1="created_at"
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
        isFetching: state.book.refund.isFetching,
        locale: state.locale.locale,
        newRefund: state.book.refund.item || {},
        listItems: state.book.refund.item.list_items,
        vat: state.account.company.item ? state.account.company.item.vat : [],
        status: state.helper.items.status_refund,
        currency: state.helper.items.currency
    }
}

const StyledCreateRefund = withStyles(styles)(CreateRefund)

export default connect(mapStateToProps, { createState, getListItem, convertToCurrency, createDocument, resetState, convertToOtherDocument })(StyledCreateRefund);
