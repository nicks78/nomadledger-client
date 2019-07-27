//manager/src/pages/bookkeeping/quote/form.js

import React  from 'react'
import {
Paper,
withStyles,
Grid,
Typography,
Button,
TextField,
Checkbox,
FormControlLabel,
InputAdornment
 } from '@material-ui/core';

import ApxSelect  from '../../../components/common/select'
import ApxRichEditor from '../../../components/common/richEditor'
import AutoComplete from '../../../lib/autoComplete'
import ContactSection from './contactSection';
import Items from './items'
import DatePickers from '../../../lib/dayPicker'
import ApxBackBtn from '../../../components/common/backBtn'
import ApxTitleBar from '../../../components/common/titleBar'



const Form = (props) => {

    const { data, list, reducer, locale, classes, vat, btnLabel, date_1, date_2, formTitle, isUpdating, currency } = props
    const canBeUpdated = data.quote_id || data.refund_id ? false : true

    return  <div>

                <Paper className={classes.paper}>
                  <div style={{display: "flex"}}>
                      <ApxBackBtn styled={{ marginBottom: 0 }}/>
                  </div>
                <Typography variant="h1" className={classes.title} align="center">
                    {locale.subheading[formTitle] }
                    {
                        data.onRef ?
                        <span> { locale.wording.on } { data.quote_id ? locale.wording.quote : locale.wording.invoice } #{ data.onRef}</span>
                        : null
                    }

                </Typography>

                {props.children}
                <Typography variant="caption">{locale.message.required}</Typography>
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
                                <Grid item xs={12} sm={props.refund ? 12 : 6} md={props.refund ? 12 : 6}>
                                    <TextField
                                        label={ locale.wording[date_1] }
                                        id={date_1}
                                        disabled
                                        required
                                        margin="dense"
                                        className={ classes.inputDate }
                                        value={ data[date_1] ? data[date_1].label : ""}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <DatePickers
                                                        value={ data[date_1] ? data[date_1].intl_format : ""}
                                                        handleDate={ props.handleDropDown }
                                                        field={date_1}
                                                        canNotEdit={true}
                                                    />
                                            </InputAdornment>,
                                        }}
                                        />
                                </Grid>
                                {
                                    !props.refund ?
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            label={ locale.wording[date_2] }
                                            id={date_2}
                                            disabled
                                            required
                                            margin="dense"
                                            className={ classes.inputDate }
                                            value={ data[date_2] ? data[date_2].label : ""}
                                            variant="outlined"
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
                                    : null
                                }

                                <Grid item xs={12} md={6} sm={6}>
                                    <ApxSelect
                                        arrayField={currency}
                                        field="currency"
                                        disabled={!canBeUpdated}
                                        required={true}
                                        value={data.currency && data.currency[localStorage.getItem('locale')]}
                                        helperText={locale.helperText.select_currency}
                                        handleAction={ props.handleDropDown }
                                        locale={locale}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <ApxSelect
                                        arrayField={vat || []}
                                        field="vat"
                                        required={true}
                                        disabled={!canBeUpdated}
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
                                        margin="dense"
                                        value={ data.follow_up_date ? data.follow_up_date.label : ""}
                                        variant="outlined"
                                        className={ classes.inputDate }
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
                                {
                                    reducer !== "QUOTE" ?
                                        <Grid item xs={12}>
                                        <TextField
                                            label={ locale.wording.transaction_number }
                                            id="transaction_number"
                                            margin="dense"
                                            onChange={ (e) => { props.createState( reducer, "transaction_number", e.target.value ) } }
                                            style={{width: '100%', fontWeight: 300}}
                                            value={ data.transaction_number ||  ""}
                                            variant="outlined"
                                        />
                                        </Grid>
                                    : null
                                }
                                {
                                    reducer === "INVOICE" ?
                                        <Grid item xs={12}>
                                         <FormControlLabel
                                            control={
                                            <Checkbox
                                                checked={data.bank_detail || false}
                                                onChange={ (e) => { props.createState( reducer, "bank_detail", e.target.checked ) } }
                                                value={ locale.wording.bank_detail }
                                                color="primary"
                                            />
                                            }
                                            label={ locale.wording.bank_detail || ""}
                                        />
                                        </Grid>
                                    : null
                                }

                                {
                                    reducer === "REFUND" ?
                                        <Grid item xs={12}>
                                            <TextField
                                                label={ locale.wording.invoice_ref }
                                                id="invoice_ref"
                                                margin="dense"
                                                onChange={ (e) => { props.createState( reducer, "invoice_ref", e.target.value ) } }
                                                style={{width: '100%', fontWeight: 300}}
                                                value={ data.invoice_ref ||  ""}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    : null
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                    <br/>
                    {
                      data.response ?
                      <div className={classes.responseWrap}>

                        <Typography variant="h3" align="center" style={{marginBottom: 10, color: "black"}}>{locale.subheading.label_client_feedback}</Typography>
                        <Typography className={classes.response}  variant="body2" dangerouslySetInnerHTML={{__html: data.response }} />
                      </div>
                      : null
                    }
                  <br />
                <ApxTitleBar
                  text={locale.subheading.info_comp }
                  hideEdit={true}
                  styled={{ borderRadius: "4px 4px 0px 0px" }}
                />
                <ApxRichEditor
                    reducer={reducer}
                    field="infos"
                    initText={ data.infos || "" }
                    handleAction={ props.createState }
                /><br />

                <br />

                    <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <AutoComplete
                                    disabled={ data.currency && canBeUpdated && data.contact_id && data.vat ? false : true }
                                    field="name"
                                    state="name"
                                    model="service"
                                    reducer={reducer}
                                    placeholder={locale.wording.search_service_product}
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

                    <TextField
                        
                        id="terms"
                        style={{ backgroundColor: 'rgba(255,0,0,0.07)', clear: "both",  fontWeight: 300, marginTop: 24, color: "black"}}
                        rows={5}
                        fullWidth
                        multiline
                        margin="dense"
                        value={ data.terms }
                        onChange={ (e) => { props.createState( reducer, "terms", e.target.value ) } }
                        variant="outlined"
                    />
                    <br /><br />
                    <div className={classes.btnSave}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.btn}
                            disabled={ isUpdating || !data.currency || !data.vat || !data.contact_id ? true : false }
                            onClick={ () => { props.handleSubmit(reducer)} }>
                            { isUpdating ? locale.wording.loading : btnLabel }
                        </Button>
                    </div>
                </Paper>
            </div>
}


const styles = theme => ({
    title: {
        marginBottom: 24,
    },
    paper: {
        padding: 24,
        marginBottom: 24,
        overflow: 'hidden',
        [theme.breakpoints.down("sm")]: {
            paddingLeft: 12,
            paddingTop: 0,
            paddingRight: 12,
            boxShadow: 'none',
            borderRadius: 0
        }
    },
    btnSave: {
        float: 'right'
    },
    btn: {
        backgroundColor: theme.palette.yellow.dark,
        minWidth: 120
    },
    inputDate: {
      width: '100%',
      '& input': {
        color: theme.palette.darkGrey,
      },
      '& label':  {
        color: `${theme.palette.caption} !important`,
        fontWeight: 400
      },
      '& span':  {
        color: theme.palette.secondary.main
      }
    },
    responseWrap: {
      backgroundColor: theme.palette.grey.main,
      padding: 10
    },
    response: {
      border: `1px solid rgba(0, 0, 0, 0.24)`,
      minHeight: 80,
      paddingLeft: 5,
      backgroundColor: "white"
    },
})

const ApxForm = withStyles(styles)(Form)

export default ApxForm;
