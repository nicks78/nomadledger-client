//manager/src/pages/bookkeeping/quote/form.js

import React  from 'react'
import { 
Paper, 
withStyles, 
Grid, 
Typography,
Button,
TextField,
InputAdornment 
 } from '@material-ui/core';

import ApxSelect  from '../../../components/common/select'
import ApxRichEditor from '../../../components/common/richEditor'
import ApxRadioGroup from '../../../components/common/radioGroup'
import {currency, status} from '../../../utils/static_data'
import AutoComplete from '../../../lib/autoComplete'
import ContactSection from './contactSection';
import Items from './items'
import DatePickers from '../../../lib/dayPicker'




const Form = (props) => {

    const { data, list, reducer, locale, classes, vat, btnLabel, date_1, date_2, formTitle, isUpdating } = props

    return  <div>
                <Paper className={classes.paper}>
                <Typography variant="h2" className={classes.title}>{locale.form.title[formTitle]}&nbsp;{ data.ref || '' }</Typography>
                    <Grid container spacing={24}>

                        <Grid item xs={12} md={5} style={{border: '1px solid rgba(235,235,235,1)', marginTop: '20px', borderRadius: 4}}>
                                <ContactSection 
                                    locale={locale}
                                    contact={data}
                                    reducer={reducer}
                                />
                        </Grid>
                        <Grid item xs={12} md={7}>

                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <TextField
                                        label={ locale.form.field[date_1] }
                                        id={date_1}
                                        disabled
                                        margin="dense"
                                        style={{width: '100%'}}
                                        value={ data[date_1] ? data[date_1].label : ""}
                                        variant="filled"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <DatePickers 
                                                        handleDate={ props.handleDropDown }
                                                        field={date_1}
                                                    /> 
                                            </InputAdornment>,
                                        }}
                                    />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                        label={ locale.form.field[date_2] }
                                        id={date_2}
                                        disabled
                                        margin="dense"
                                        style={{width: '100%'}}
                                        value={ data[date_2] ? data[date_2].label : ""}
                                        variant="filled"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <DatePickers 
                                                        handleDate={ props.handleDropDown }
                                                        field={date_2}
                                                    /> 
                                            </InputAdornment>,
                                        }}
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
                                    value={data.status ? data.status.code : '0'}
                                    arrayObject={ status[reducer]  }
                                />
                            </Grid>
                        </Grid>
                        
                        
                        </Grid>

                    </Grid>
                    <br/>
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
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            disabled={ isUpdating ? true : false }
                            onClick={ () => { props.handleSubmit(reducer)} }>
                            { isUpdating ? locale.button.loading : btnLabel}
                        </Button>
                    </div>
                </Paper>
            </div>
}


const styles = theme => ({
    title: {
        marginBottom: 24,
        marginLeft: -24,
        marginRight: -24,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 12,
        paddingBottom: 12,
        marginTop: -24,
        fontWeight: 500,
        backgroundColor: theme.palette.primary.light,
        color: 'white'
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

const ApxForm = withStyles(styles)(Form)

export default ApxForm;