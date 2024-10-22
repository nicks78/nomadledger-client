//manager/src/pages/quote/CreateQuote.js

import React from 'react'
import { connect } from 'react-redux'
import { createState, createDocument, resetState } from '../../../redux/book/actions'
import { convertToCurrency, getListItem } from '../../../redux/book/itemActions'
import { withStyles } from '@material-ui/core';
import Spinner from '../../../components/common/spinner'
import Form from '../common/form'
import Modal from '../common/modal'

class CreateQuote extends React.Component {

    state = {
        reducer: "QUOTE",
        openModal: false
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

        if (name === "vat" && value.btn) {
            this.setState({ openModal: true })
            return;
        }

        if (name === "currency") {
            // Update each items with the correct currency rate
            for (let i = 0; i < this.props.listItems.length; i++) {
                this.props.convertToCurrency(this.state.reducer, value, this.props.listItems[i])
            }
        }

        if (name === "vat" && this.props.newQuote.vat) {
            var vat_value = (this.props.newQuote.subtotal / 100) * value.indice;
            this.props.createState(this.state.reducer, "vat_value", vat_value)
        }


        this.props.createState(this.state.reducer, name, value)
    }

    render() {

        const { isFetching, locale, classes, newQuote, listItems, vat, currency, status } = this.props;

        if (isFetching) {
            return <Spinner />
        }

        return (
            <div className={classes.root}>
                <Modal type="vat" open={this.state.openModal} onCloseModal={this.closeModal} />
                <Form
                    formTitle="add_quote"
                    data={newQuote}
                    vat={vat}
                    list={listItems}
                    locale={locale}
                    currency={currency}
                    status={status}
                    handleSubmit={this.props.createDocument}
                    handleDropDown={this.handleDropDown}
                    getListItem={this.props.getListItem}
                    createState={this.props.createState}
                    reducer={this.state.reducer}
                    btnLabel={locale.wording.save}
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
        isFetching: state.book.quote.isFetching,
        locale: state.locale.locale,
        newQuote: state.book.quote.item || {},
        listItems: state.book.quote.item.list_items,
        vat: state.account.company.item ? state.account.company.item.vat : [],
        status: state.helper.items.status_quote,
        currency: state.helper.items.currency
    }
}

const StyledCreateQuote = withStyles(styles)(CreateQuote)

export default connect(mapStateToProps, { createState, getListItem, convertToCurrency, createDocument, resetState })(StyledCreateQuote);
