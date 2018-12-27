//manager/src/pages/quote/addQuote.js

import React from 'react'
import {connect} from 'react-redux'
import { createState , getListItem, convertToCurrency, createDocument} from '../actions'
import { 
Paper, 
withStyles, 
Grid, 
Typography,
Button 
 } from '@material-ui/core';

import { ApxSelect, ApxDatePicker, ApxRichEditor, ApxAlert} from '../../../components/common'
import {currency} from '../../../utils/static_data'
import AutoComplete from '../../../lib/autoComplete'
import ContactSection from '../common/contactSection';
import Items from '../common/items'

class AddQuote extends React.Component {

    
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

    const { locale, classes, newQuote, listItems, vat, message, isError } = this.props;

    return (
            <div className={ classes.root}>

                { isError ? <ApxAlert message={message} type="danger"/> : null }

                <Paper className={classes.paper}>
                    <Grid container spacing={24}>

                        <Grid item xs={12} md={5}>
                                <ContactSection 
                                    locale={locale}
                                    newQuote={newQuote}
                                    reducer="QUOTE"
                                />
                        </Grid>
                        <Grid item xs={12} md={7}>

                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <ApxDatePicker 
                                    handleDate={ this.handleDropDown }
                                    label={ locale.form.field.created_at }
                                    value={ newQuote.created_at ? newQuote.created_at.label : ""}  
                                    field="created_at"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <ApxDatePicker 
                                    handleDate={ this.handleDropDown }
                                    label={ locale.form.field.expired_at }
                                    value={ newQuote.expired_at ? newQuote.expired_at.label : ""}  
                                    field="expired_at"
                                />
                            </Grid>
                        </Grid>
                    
                        
                        
                        <br />
                        <ApxSelect 
                            arrayField={currency}
                            field="currency"
                            value={newQuote.currency && newQuote.currency[localStorage.getItem('locale')]}
                            helperText={locale.form.helperText.select_currency}
                            handleAction={ this.handleDropDown }
                            locale={locale}
                        />
                        
                        <ApxSelect 
                            arrayField={vat}
                            field="vat"
                            value={newQuote.vat && newQuote.vat[localStorage.getItem('locale')]}
                            helperText={locale.form.helperText.select_currency}
                            handleAction={ this.handleDropDown }
                            locale={locale}
                        />
                        
                        </Grid>

                    </Grid>
                </Paper>

                <Paper className={classes.paper}>
                <Typography variant="overline">{ locale.page.quote.info_comp }</Typography>
                <br />
                <ApxRichEditor
                    initText={ locale.form.field.textarea_quote }
                    reducer="QUOTE"
                    handleAction={ this.props.createState }
                />
                <br />
                <Typography variant="overline">{ locale.page.quote.items }</Typography>
                <br />


                    <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <AutoComplete
                                    disabled={ newQuote.currency && newQuote.company_name && newQuote.vat ? false : true }
                                    field="name"
                                    model="service"
                                    reducer="QUOTE"
                                    placeholder="Search a service"
                                    setSelectedObject={ this.props.getListItem }
                                />
                                
                            </Grid>

                            <Grid item xs={6}>
                                <AutoComplete 
                                    disabled={ newQuote.currency && newQuote.company_name && newQuote.vat ? false : true }
                                    field="name"
                                    model="product"
                                    reducer="QUOTE"
                                    placeholder="Search a product"
                                    setSelectedObject={ this.props.getListItem }
                                />
                            </Grid>
                    
                    </Grid>
                    
                    
                    
                    <br />
                    <Items 
                        listItems={listItems}
                        newData={newQuote}
                        reducer="QUOTE"
                    />
                    <br />
                    <div className={classes.btnSave}>
                        <Button variant="contained" color="secondary" onClick={ () => {this.props.createDocument("QUOTE")} }>{locale.button.save}</Button>
                    </div>
                </Paper>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit
    },
    paper: {
        padding: 24,
        marginBottom: 24,
        overflow: 'hidden',
    },
    btnSave: {
        float: 'right'
    }
})

const mapStateToProps = (state) => {
   
    return {
        isCreating: state.library.quote.isCreating,
        isError: state.library.quote.isError,
        locale: state.locale.locale,
        newQuote: state.library.quote.tmp_state,
        message: state.library.quote.message,
        quote: state.library.quote.item,
        listItems: state.book.quote.list_items,
        vat: state.account.company.item ? state.account.company.item.vat : [],
    }
}

const StyledAddQuote = withStyles(styles)(AddQuote)

export default connect(mapStateToProps, { createState, getListItem, convertToCurrency, createDocument })(StyledAddQuote);