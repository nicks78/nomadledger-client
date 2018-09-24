//manager/src/pages/client/form.js

import React  from 'react'
import TextField from '@material-ui/core/TextField';
import { ApxPhoneCode } from '.'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit
    },
    textField: {
        marginLeft: '10px',
        marginRight: '10px',
        width: '90%',
        marginTop: '0px',
        float: 'left',
    },
})

const Form = (props) => {
    
    const {formField, locale, objData, xs, md, classes, formHandler} = props;

    return ( <Grid container className={classes.root} spacing={8}>
            {
                formField.map((cp, index) => {
                    switch (cp.name) {
                        case 'phone_code':
                            return <Grid item xs={xs} sm={md} key={index}><ApxPhoneCode value={ objData.phone_code || '' } handleAction={  formHandler } locale={ locale }/></Grid>
                        case 'email':
                            return <Grid item xs={xs} sm={md} key={index}>
                            <TextField
                                id={index}
                                type="email"
                                label={locale.form.field[cp.name]}
                                className={ classes.textField}
                                value={objData[cp.name] || ''}
                                onChange={ formHandler(cp.name)}
                                margin="normal"
                            /></Grid>
                        default:
                            return <Grid item xs={12} sm={6} key={index}>
                                    <TextField
                                        id={index}
                                        type={cp.type}
                                        label={locale.form.field[cp.name]}
                                        className={ classes.textField}
                                        value={objData[cp.name] || ''}
                                        onChange={ formHandler(cp.name)}
                                        margin="normal"
                                    /></Grid>
                    } 
                })
            }
            </Grid>
    )
}

const ApxForm = withStyles(styles)(Form);

export {ApxForm};
