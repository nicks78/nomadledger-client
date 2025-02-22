//manager/src/pages/quote/editInvoice.js

import React from 'react'
import { connect } from 'react-redux'
import { createState, updateDocument, getDocument, resetState, downloadPdf } from '../../../redux/book/actions'
import { convertToCurrency, getListItem } from '../../../redux/book/itemActions'
import { withStyles, Fab } from '@material-ui/core';
import Form from '../common/form'
import Spinner from '../../../components/common/spinner'
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined'
import Modal from '../common/modal'

class EditRefund extends React.Component {

    state = {
        reducer: "REFUND",
        openModal: false
    }

    componentWillUnmount() {
        this.props.resetState(this.state.reducer)
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        this.props.getDocument(this.state.reducer, id);
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
        if (name === "vat" && this.props.refund.vat) {
            var vat_value = (this.props.refund.subtotal / 100) * value.indice;
            this.props.createState(this.state.reducer, "vat_value", vat_value)
        }

        this.props.createState(this.state.reducer, name, value)
    }



    render() {

        const { isFetching, locale, classes, refund, listItems, vat, currency, status, isUpdating } = this.props;

        if (isFetching) {
            return <Spinner />
        }

        if (refund === null) {
            return <p>Error</p>
        }

        return (
            <div className={classes.root}>
                <Modal type="vat" open={this.state.openModal} onCloseModal={this.closeModal} />
                <Form
                    formTitle="edit_refund"
                    data={refund}
                    vat={vat}
                    list={listItems}
                    locale={locale}
                    currency={currency}
                    status={status}
                    handleSubmit={this.props.updateDocument}
                    handleDropDown={this.handleDropDown}
                    getListItem={this.props.getListItem}
                    createState={this.props.createState}
                    reducer={this.state.reducer}
                    btnLabel={locale.wording.update}
                    isUpdating={isUpdating}
                    refund={true}
                    date_1="created_at"
                    date_2="due_at"
                />
                <Fab size="medium" color="primary" className={classes.icon}>
                    <CloudDownloadIcon onClick={() => { this.props.downloadPdf("REFUND", refund._id) }} />
                </Fab>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit
    },
    icon: {
        position: 'fixed',
        bottom: 15,
        right: 15
    }
})

const mapStateToProps = (state) => {
    return {
        isFetching: state.book.refund.isFetching,
        isUpdating: state.book.refund.isUpdating,
        locale: state.locale.locale,
        refund: state.book.refund.item,
        listItems: state.book.refund.item ? state.book.refund.item.list_items : [],
        vat: state.account.company.item ? state.account.company.item.vat : [],
        status: state.helper.items.status_refund,
        currency: state.helper.items.currency
    }
}

const StyledEditRefund = withStyles(styles)(EditRefund)

export default connect(mapStateToProps, { getListItem, convertToCurrency, updateDocument, getDocument, createState, resetState, downloadPdf })(StyledEditRefund);
