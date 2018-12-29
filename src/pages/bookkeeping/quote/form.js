//manager/src/pages/bookkeeping/quote/form.js

import React  from 'react'
import { 
Paper, 
withStyles, 
Grid, 
Typography,
Button 
 } from '@material-ui/core';

import { ApxSelect, ApxDatePicker, ApxRichEditor, ApxRadioGroup } from '../../../components/common'
import {currency, status} from '../../../utils/static_data'
import AutoComplete from '../../../lib/autoComplete'
import ContactSection from '../common/contactSection';
import Items from '../common/items'




const Form = (props) => {

    const { data, list, reducer, locale, classes, vat, btnLabel } = props

    return  <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={24}>

                        <Grid item xs={12} md={5}>
                                <ContactSection 
                                    locale={locale}
                                    contact={data}
                                    reducer={reducer}
                                />
                        </Grid>
                        <Grid item xs={12} md={7}>

                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <ApxDatePicker 
                                    handleDate={ props.handleDropDown }
                                    label={ locale.form.field.created_at }
                                    value={ data.created_at ? data.created_at.label : ""}  
                                    field="created_at"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <ApxDatePicker 
                                    handleDate={  props.handleDropDown }
                                    label={ locale.form.field.expired_at }
                                    value={ data.expired_at ? data.expired_at.label : ""}  
                                    field="expired_at"
                                />
                            </Grid>
                        </Grid>

                        <br />
                        <Grid container spacing={24}>
                            <Grid item xs={12} md={6}>
                                <ApxSelect 
                                    arrayField={currency}
                                    field="currency"
                                    value={data.currency && data.currency[localStorage.getItem('locale')]}
                                    helperText={locale.form.helperText.select_currency}
                                    handleAction={ props.handleDropDown }
                                    locale={locale}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ApxSelect 
                                    arrayField={vat}
                                    field="vat"
                                    value={data.vat && data.vat[localStorage.getItem('locale')]}
                                    helperText={locale.form.helperText.select_currency}
                                    handleAction={ props.handleDropDown }
                                    locale={locale}
                                />
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <ApxRadioGroup 
                                    action={  props.handleDropDown }
                                    value={data.status ? data.status.label : 'draft'}
                                    arrayObject={status}
                                    locale={locale}
                                />
                            </Grid>
                        </Grid>
                        
                        
                        </Grid>

                    </Grid>
                </Paper>

                <Paper className={classes.paper}>
                <Typography variant="overline">{ locale.page.quote.info_comp }</Typography>
                <br />
                <ApxRichEditor
                    initText={ data.infos || locale.form.field.textarea_quote }
                    reducer={reducer}
                    handleAction={  props.createState }
                />
                <br />
                <Typography variant="overline">{ locale.page.quote.items }</Typography>
                <br />

                    <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <AutoComplete
                                    disabled={ data.currency && data.contact_id && data.vat ? false : true }
                                    field="name"
                                    state="name"
                                    model="service"
                                    reducer={reducer}
                                    placeholder={locale.form.field.search_service}
                                    setSelectedObject={  props.getListItem }
                                />
                                
                            </Grid>

                            <Grid item xs={6}>
                                <AutoComplete 
                                    disabled={ data.currency && data.contact_id && data.vat ? false : true }
                                    field="name"
                                    state="name"
                                    model="product"
                                    reducer={reducer}
                                    placeholder={locale.form.field.search_product}
                                    setSelectedObject={  props.getListItem }
                                />
                            </Grid>
                    
                    </Grid>
                    
                    <br />
                    <Items 
                        listItems={list}
                        newData={data}
                        reducer={reducer}
                    />
                    <br />
                    <div className={classes.btnSave}>
                        <Button variant="contained" color="secondary" onClick={ () => { props.handleSubmit(reducer)} }>{btnLabel}</Button>
                    </div>
                </Paper>
            </div>
}


const styles = theme => ({
    paper: {
        padding: 24,
        marginBottom: 24,
        overflow: 'hidden',
    },
    btnSave: {
        float: 'right'
    }
})

const ApxForm = withStyles(styles)(Form)

export default ApxForm;