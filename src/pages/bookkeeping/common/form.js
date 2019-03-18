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
import AutoComplete from '../../../lib/autoComplete'
import ContactSection from './contactSection';
import Items from './items'
import DatePickers from '../../../lib/dayPicker'




const Form = (props) => {

    const { data, list, reducer, locale, classes, vat, btnLabel, date_1, date_2, formTitle, isUpdating, currency, status } = props

    return  <div>
                <Paper className={classes.paper}>
                <Typography variant="h2" className={classes.title}>{locale.subheading[formTitle]}&nbsp;{ data.ref || '' }
                </Typography>

                    <Grid container spacing={24}>

                        <Grid item xs={12} sm={6} md={6}>
                            <div style={{border: '1px solid rgb(238,238,238)', borderRadius: 1, marginTop: 8}}>
                                <ContactSection 
                                    locale={locale}
                                    contact={data}
                                    reducer={reducer}
                                />
                            </div>
                                
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>

                            <Grid container spacing={8}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                            label={ locale.wording[date_1] }
                                            id={date_1}
                                            disabled
                                            margin="dense"
                                            style={{width: '100%'}}
                                            value={ data[date_1] ? data[date_1].label : ""}
                                            variant="filled"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                    <DatePickers 
                                                            value={ data[date_1] ? data[date_1].intl_format : ""}
                                                            handleDate={ props.handleDropDown }
                                                            field={date_1}
                                                        /> 
                                                </InputAdornment>,
                                            }}
                                        />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                            label={ locale.wording[date_2] }
                                            id={date_2}
                                            disabled
                                            margin="dense"
                                            style={{width: '100%'}}
                                            value={ data[date_2] ? data[date_2].label : ""}
                                            variant="filled"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                    <DatePickers 
                                                            value={ data[date_2] ? data[date_2].intl_format : ""}
                                                            handleDate={ props.handleDropDown }
                                                            field={date_2}
                                                        /> 
                                                </InputAdornment>,
                                            }}
                                        />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <ApxSelect 
                                        arrayField={currency}
                                        field="currency"
                                        value={data.currency && data.currency[localStorage.getItem('locale')]}
                                        helperText={locale.helperText.select_currency}
                                        handleAction={ props.handleDropDown }
                                        locale={locale}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <ApxSelect 
                                        arrayField={vat}
                                        field="vat"
                                        value={data.vat && data.vat[localStorage.getItem('locale')]}
                                        helperText={locale.helperText.select_currency}
                                        handleAction={ props.handleDropDown }
                                        locale={locale}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={ locale.wording.follow_up_date }
                                        id="follow_up_date"
                                        disabled
                                        fullWidth
                                        margin="dense"
                                        value={ data.follow_up_date ? data.follow_up_date.label : ""}
                                        variant="filled"
                                        style={{width: '98%'}}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <DatePickers 
                                                        value={ data.follow_up_date ? data.follow_up_date.intl_format : ""}
                                                        handleDate={ props.handleDropDown }
                                                        field="follow_up_date"
                                                    /> 
                                            </InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ApxRadioGroup 
                                        action={  props.handleDropDown }
                                        value={data.status ? data.status.code : '0'}
                                        arrayObject={ status  }
                                    />
                                </Grid>
                            </Grid>
                        
                        
                        </Grid>

                    </Grid>
                    <br/>
                <Typography variant="overline">{ locale.subheading.info_comp }</Typography>
                <br />
                <ApxRichEditor
                    initText={ data.infos || locale.wording.textarea_quote }
                    reducer={reducer}
                    handleAction={  props.createState }
                />
                <br />
                <Typography variant="overline">{ locale.subheading.items }</Typography>
                <br />

                    <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <AutoComplete
                                    disabled={ data.currency && data.contact_id && data.vat ? false : true }
                                    field="name"
                                    state="name"
                                    model="service"
                                    reducer={reducer}
                                    placeholder={locale.wording.search_service}
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
                                    placeholder={locale.wording.search_product}
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
                            color="primary" 
                            disabled={ isUpdating ? true : false }
                            onClick={ () => { props.handleSubmit(reducer)} }>
                            { isUpdating ? locale.wording.loading : btnLabel}
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