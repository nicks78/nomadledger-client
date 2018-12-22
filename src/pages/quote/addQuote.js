//manager/src/pages/quote/addQuote.js

import React from 'react'
import {connect} from 'react-redux'
import { createState , setListItem, addRemoveQuantity, removeItem, discountPrice} from '../bookkeeping/actions'
import { 
Paper, 
IconButton, 
withStyles, 
Grid, 
Typography, 
Table, 
TableBody, 
TableHead, 
TableCell, 
TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import {cvtNumToUserPref} from '../../utils/help_function'
import { ApxtextIndexValue, ApxContenEditable,  ApxSelect, ApxDatePicker} from '../../components/common'
import {currency} from '../../utils/static_data'
import AutoComplete from '../../lib/autoComplete'
// import {checkNumFormatRegex } from '../../utils/help_function'



class AddQuote extends React.Component {

    
    handleDropDown = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.props.createState( "QUOTE", name, value)
    }

    getInput = (event, id) => {
        var fieldName = event.target.id
        var value = event.target.innerText

        // Update store
        this.props.discountPrice( "QUOTE", id, fieldName, value)
        // console.log(checkNumFormatRegex(value))

        
    }

    render(){

    const { locale, classes, newQuote, listItems} = this.props;

    
    
    var infoContact = ["company_name", "firstname", "lastname", "email"]
    return (
            <div className={ classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={24}>

                        <Grid item xs={12} md={6}>
                            <AutoComplete 
                                field="company_name"
                                model="contact"
                                reducer="QUOTE"
                                placeholder="Search a contact"
                                setSelectedObject={ this.props.createState }
                            />
                            <br />
                            {
                                infoContact.map((name, index) => {
                                    return  <ApxtextIndexValue 
                                                key={index}
                                                value={newQuote.company_name ? newQuote.company_name[name] : ''}
                                                label={locale.form.field[name]}
                                            />
                                })
                            }
                                <ApxtextIndexValue 
                                    value={newQuote.company_name ? newQuote.company_name.phone_code.value +" "+ newQuote.company_name.phone : ''}
                                    label={locale.form.field.phone}
                                />
                                <ApxtextIndexValue 
                                    value={newQuote.company_name ? newQuote.company_name.addresses_street +" "+ newQuote.company_name.addresses_zip  + " " + newQuote.company_name.addresses_city + " " + newQuote.company_name.addresses_country[localStorage.getItem('locale')] : ''}
                                    label={locale.form.field.addresses_street}
                                />
                        </Grid>
                        <Grid item xs={12} md={6}>
                    
                        <ApxDatePicker 
                            handleDate={ this.handleDropDown }
                            label={ locale.form.field.created_at }
                            value={ newQuote.created_at ? newQuote.created_at.label : ""}  
                            field="created_at"
                        />
                        <ApxDatePicker 
                            handleDate={ this.handleDropDown }
                            label={ locale.form.field.expired_at }
                            value={ newQuote.expired_at ? newQuote.expired_at.label : ""}  
                            field="expired_at"
                        />
                        <br />
                        <ApxSelect 
                            arrayField={currency}
                            field="currency"
                            value={newQuote.currency && newQuote.currency[localStorage.getItem('locale')]}
                            helperText={locale.form.helperText.select_currency}
                            handleAction={ this.handleDropDown }
                            locale={locale}
                        />
                        
                        </Grid>

                    </Grid>
                </Paper>

                <Paper className={classes.paper}>
                    <Typography variant="subtitle2">Items</Typography>

                    <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <AutoComplete
                                    // disabled={ newQuote.currency && newQuote.company_name ? "" : "disabled" }
                                    field="name"
                                    model="service"
                                    reducer="QUOTE"
                                    placeholder="Search a service"
                                    setSelectedObject={ this.props.setListItem }
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <AutoComplete 
                                    disabled={ newQuote.currency && newQuote.company_name ? false : true }
                                    field="name"
                                    model="product"
                                    reducer="QUOTE"
                                    placeholder="Search a product"
                                    setSelectedObject={ this.props.setListItem }
                                />
                            </Grid>
                    
                    </Grid>
                    
                    
                    
                    <br />
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Réference</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Price { newQuote.currency && newQuote.currency.value }</TableCell>
                            <TableCell style={{textAlign: "center"}}>Quantity</TableCell>
                            <TableCell align="right">Discount</TableCell>
                            <TableCell align="right">Total { newQuote.currency && newQuote.currency.value }</TableCell>
                            <TableCell align="center">Remove</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {   
                            listItems.map(( item, index) => {
                                
                                return  <TableRow key={index}>
                                            <TableCell>{ item.tmp.ref}</TableCell>
                                            <TableCell>{ item.tmp.name }</TableCell>
                                            <TableCell>{ cvtNumToUserPref(item.total_ht)}</TableCell>
                                            <TableCell style={{textAlign: "center"}}>
                                            
                                            
                                            <ArrowDropUpIcon onClick={ () => { this.props.addRemoveQuantity("QUOTE", item._id, "up")}} /><br />
                                            { item.quantity }<br />
                                            <ArrowDropDownIcon onClick={ () => { this.props.addRemoveQuantity("QUOTE", item._id, "down")}} />
                                            
                                            </TableCell>
                                            <TableCell><ApxContenEditable value={item.discount} id={item._id} actionInput={this.getInput} name="discount" /></TableCell>
                                            <TableCell>{ cvtNumToUserPref(item.total) }</TableCell>
                                            <TableCell ><IconButton onClick={ () => { this.props.removeItem("QUOTE", item)}} ><DeleteIcon color="secondary"/></IconButton></TableCell>
                                            
                                        </TableRow>
                            })
                            }
                           
                        </TableBody>
                    </Table>
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
        marginBottom: 24
    },
    table: {
        
    }
})

const mapStateToProps = (state) => {

    return {
        isCreating: state.library.quote.isCreating,
        isError: state.library.quote.isError,
        locale: state.locale.locale,
        newQuote: state.library.quote.tmp_state,
        quote: state.library.quote.item,
        listItems: state.book.quote.list_items,
    }
}

const StyledAddQuote = withStyles(styles)(AddQuote)

export default connect(mapStateToProps, { createState, setListItem, addRemoveQuantity, removeItem, discountPrice })(StyledAddQuote);