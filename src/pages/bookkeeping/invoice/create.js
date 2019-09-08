//manager/src/pages/bookkeeping/invoice/create.js

import React from 'react'
import { connect } from 'react-redux'
import { createState, createDocument, resetState, convertToOtherDocument } from '../../../redux/book/actions'
import { convertToCurrency, getListItem } from '../../../redux/book/itemActions'
import { withStyles } from '@material-ui/core';
import Spinner from '../../../components/common/spinner'
import Form from '../common/form'
import Modal from '../common/modal'

class CreateInvoice extends React.Component {

    state = {
        reducer: "INVOICE",
        openModal: false
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        if (id) {
            this.props.convertToOtherDocument("QUOTE", id, "INVOICE")
        }

        this.props.createState(this.state.reducer, "terms", this.props.locale.helperText.payment_terms_invoice)
    }

    componentWillUnmount() {
        this.props.resetState(this.state.reducer);
    }

    closeModal = () => {
        this.setState({ openModal: false })
    }

    handleDropDown = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        var items = this.props.newInvoice.list_items

        if (name === "vat" && value.btn) {
            this.setState({ openModal: true })
            return;
        }

        if (name === "currency") {
            // Update each items with the correct currency rate
            for (let i = 0; i < items.length; i++) {
                this.props.convertToCurrency(this.state.reducer, value, items[i])
            }
        }

        if (name === "vat" && this.props.newInvoice.vat) {
            var vat_value = (this.props.newInvoice.subtotal / 100) * value.indice;
            this.props.createState(this.state.reducer, "vat_value", vat_value)
        }

        this.props.createState(this.state.reducer, name, value)
    }

    render() {

        const { isFetching, locale, classes, newInvoice, vat, currency, status } = this.props;
        const { reducer } = this.state;


        if (isFetching) {
            return <Spinner />
        }

        return (
            <div className={classes.root}>
                <Modal type="vat" open={this.state.openModal} onCloseModal={this.closeModal} />
                <Form
                    formTitle="add_invoice"
                    data={newInvoice}
                    vat={vat}
                    list={newInvoice.list_items}
                    currency={currency}
                    status={status}
                    locale={locale}
                    handleSubmit={this.props.createDocument}
                    handleDropDown={this.handleDropDown}
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
        isFetching: state.book.invoice.isFetching,
        locale: state.locale.locale,
        newInvoice: state.book.invoice.item || null,
        vat: state.account.company.item ? state.account.company.item.vat : [],
        status: state.helper.items.status_invoice,
        currency: state.helper.items.currency
    }
}

const StyledCreateInvoice = withStyles(styles)(CreateInvoice)

export default connect(mapStateToProps, { createState, getListItem, convertToCurrency, createDocument, resetState, convertToOtherDocument })(StyledCreateInvoice);
