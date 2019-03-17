//manager/src/pages/quote/addQuote.js

import React from 'react'
import {connect} from 'react-redux'
import { createState , updateDocument, getDocument, resetState, downloadPdf} from '../../../redux/book/actions'
import { convertToCurrency, getListItem} from '../../../redux/book/itemActions'
import { withStyles, Fab } from '@material-ui/core';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeOutlined'
import Form from '../common/form'
import Spinner from '../../../components/common/spinner'
import ApxAlert from '../../../components/common/alert'

class EditQuote extends React.Component {

    componentWillUnmount(){
        this.props.resetState("QUOTE")
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        this.props.getDocument("QUOTE", id);
    }
    
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

    const { isFetching, locale, classes, quote, listItems, vat, message, isError, isUpdating, currency, status } = this.props;

    if(isFetching || quote === null ){
        return <Spinner />
    }

    return (
            <div className={ classes.root}>

                { isError ? <ApxAlert message={message} type="danger"/> : null }
                <Form 
                    formTitle="edit_quote"
                    data={quote}
                    vat={vat}
                    list={listItems}
                    locale={locale}
                    currency={currency}
                    status={status}
                    handleSubmit={this.props.updateDocument}
                    handleDropDown={ this.handleDropDown }
                    getListItem={this.props.getListItem}
                    createState={this.props.createState}
                    reducer="QUOTE"
                    isUpdating={isUpdating}
                    btnLabel={locale.button.update}
                    date_1="created_at"
                    date_2="expired_at"
                />
                <Fab size="medium" color="primary" className={classes.icon}>
                    <RemoveRedEyeIcon onClick={ () => {this.props.downloadPdf("QUOTE", quote._id)} } />
                </Fab>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        flex: 1,
        position: 'relative',
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
        isFetching: state.book.quote.isFetching,
        isUpdating: state.book.quote.isUpdating,
        isError: state.book.quote.isError,
        locale: state.locale.locale,
        message: state.book.quote.message,
        quote: state.book.quote.item,
        listItems: state.book.quote.item ? state.book.quote.item.list_items : [],
        vat: state.account.company.item ? state.account.company.item.vat : [],
        status: state.helper.items.status_quote,
        currency: state.helper.items.currency
    }
}

const StyledEditQuote = withStyles(styles)(EditQuote)

export default connect(mapStateToProps, { getListItem, convertToCurrency, updateDocument, getDocument, createState, resetState, downloadPdf })(StyledEditQuote);