//manager/src/pages/client/form.js

import React  from 'react'
import TextField from '@material-ui/core/TextField';
import ApxSelect from './select'
import {Grid, InputAdornment, withStyles} from '@material-ui/core';
import DatePickers from '../../lib/dayPicker'


const styles = theme => ({
    root: {
        flex: 1,
        // marginBottom: theme.margin.unit
    },
    textField: {
        width: '100%',
        fontWeight: 300,
        marginTop: 0,
        "& span": {
          color: `${theme.palette.secondary.main} !important`
        }
    },
})

const Form = (props) => {

    const {formField, locale, objData, xs, md, classes, formHandler} = props;

    return ( <Grid container className={classes.root} spacing={8}>
            {
                formField.map((cp, index) => {
                    if (cp.type === "select") {

                        return <Grid item xs={xs} sm={md} key={index}>
                                    <ApxSelect
                                        arrayField={ cp.selections }
                                        field={cp.name}
                                        value={ objData[cp.name] && objData[cp.name][localStorage.getItem('locale')]  }
                                        handleAction={  formHandler }
                                        locale={ locale }
                                        required={ cp.required || false }
                                        helperText={ cp.helperText }/>
                                </Grid>
                    }else if( cp.type === 'longtext' ){
                        return <Grid item xs={12} key={index}>
                                    <TextField
                                        id={cp.name}
                                        required={ cp.required || false }
                                        multiline
                                        rows="4"
                                        name={cp.name}
                                        inputProps={{ maxLength: cp.length || 3000 }}
                                        label={locale.wording[cp.name]}
                                        className={ classes.textField}
                                        value={objData[cp.name] || ''}
                                        onChange={ formHandler }
                                        variant="outlined"
                                        margin="dense"
                                        />
                                </Grid>
                    }else if(cp.type === 'date'){
                        return  <Grid item xs={12} key={index}>
                                    <TextField
                                        label={locale.wording[cp.name]}
                                        id={cp.name}
                                        disabled
                                        style={{width: '100%'}}
                                        value={  objData[cp.name] ? objData[cp.name].label : ''}
                                        className={classes.test}
                                        variant="outlined"
                                        margin="dense"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <DatePickers
                                                        value={ objData[cp.name] ? objData[cp.name].label : '' }
                                                        handleDate={ formHandler }
                                                        field={cp.name}
                                                    />
                                            </InputAdornment>,
                                        }}
                                    />


                                </Grid>
                    }else{
                        return <Grid item xs={xs} sm={md} key={index}>
                                    <TextField
                                        id={cp.name}

                                        inputProps={{ maxLength: cp.length || 256 }}
                                        required={ cp.required || false }
                                        type={cp.type}
                                        name={cp.name}
                                        label={locale.wording[cp.name]}
                                        className={ classes.textField}
                                        value={objData[cp.name] || ''}
                                        onChange={ formHandler }
                                        variant="outlined"
                                        margin="dense"
                                    /></Grid>
                    }
                })


            }


            </Grid>
    )
}

const ApxForm = withStyles(styles)(Form);

export default ApxForm;
