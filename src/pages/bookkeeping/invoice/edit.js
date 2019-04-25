//manager/src/pages/quote/editInvoice.js

import React from 'react'
import {connect} from 'react-redux'
import { createState , updateDocument, getDocument, resetState, downloadPdf} from '../../../redux/book/actions'
import { convertToCurrency, getListItem} from '../../../redux/book/itemActions'
import { withStyles, Fab } from '@material-ui/core';
import Form from '../common/form'
import Spinner from '../../../components/common/spinner'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeOutlined'
import ApxBackBtn from '../../../components/common/backBtn'

class EditInvoice extends React.Component {

    state =  {
        reducer: "INVOICE"
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

    const { isFetching, locale, classes, invoice, listItems, vat, currency, status, isUpdating } = this.props;

    if( isFetching ){
        return <Spinner />
    }
    if( invoice === null ){
        return <p>Error</p>
    }

    return (
            <div className={ classes.root}>
              <div style={{display: "flex", padding: 12}}>
                  <ApxBackBtn styled={{ marginBottom: 0 }}/>
              </div>
                <Form
                    formTitle="edit_invoice"
                    data={invoice}
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
                    isUpdating={isUpdating}
                    btnLabel={locale.wording.update}
                    date_1="created_at"
                    date_2="due_at"
                />
                <Fab size="medium" color="primary" className={classes.icon}>
                    <RemoveRedEyeIcon onClick={ () => {this.props.downloadPdf("INVOICE", invoice._id)} } />
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
        bottom: 10,
        right: 10
    }
})

const mapStateToProps = (state) => {
    return {
        isFetching: state.book.invoice.isFetching,
        locale: state.locale.locale,
        isUpdating: state.book.invoice.isUpdating,
        invoice: state.book.invoice.item,
        listItems: state.book.invoice.item ? state.book.invoice.item.list_items : [],
        vat: state.account.company.item ? state.account.company.item.vat : [],
        status: state.helper.items.status_invoice,
        currency: state.helper.items.currency
    }
}

const StyledEditInvoice = withStyles(styles)(EditInvoice)

export default connect(mapStateToProps, { getListItem, convertToCurrency, updateDocument, getDocument, createState, resetState, downloadPdf })(StyledEditInvoice);
