//manager/src/pages/quote/addQuote.js

import React from 'react'
import {connect} from 'react-redux'
import { createState , updateDocument, getDocument, resetState} from '../../../redux/book/actions'
import { convertToCurrency, getListItem} from '../../../redux/book/itemActions'
import { withStyles } from '@material-ui/core';
import Form from '../common/form'
import { ApxAlert, Spinner} from '../../../components/common'

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

    const { isFetching, locale, classes, quote, listItems, vat, message, isError } = this.props;

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
                    handleSubmit={this.props.updateDocument}
                    handleDropDown={ this.handleDropDown }
                    getListItem={this.props.getListItem}
                    createState={this.props.createState}
                    reducer="QUOTE"
                    btnLabel={locale.button.update}
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
        isError: state.book.quote.isError,
        locale: state.locale.locale,
        message: state.book.quote.message,
        quote: state.book.quote.item,
        listItems: state.book.quote.item ? state.book.quote.item.list_items : [],
        vat: state.account.company.item ? state.account.company.item.vat : [],
    }
}

const StyledEditQuote = withStyles(styles)(EditQuote)

export default connect(mapStateToProps, { getListItem, convertToCurrency, updateDocument, getDocument, createState, resetState })(StyledEditQuote);