//manager/src/pages/client/form.js

import React  from 'react'
import TextField from '@material-ui/core/TextField';
import { ApxSelect } from './'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit
    },
    textField: {
        // marginLeft: '10px',
        // marginRight: '10px',
        width: '100%',
        marginTop: '0px',
        float: 'left',
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
                                        value={ objData[cp.name] || '' } 
                                        handleAction={  formHandler } 
                                        locale={ locale }
                                        helperText={ cp.helperText }/>
                                </Grid>
                    }else if( cp.type === 'longtext' ){
                        return <Grid item xs={12} key={index}>
                                    <TextField
                                        id={cp.name}
                                        multiline
                                        rows="4"
                                        label={locale.form.field[cp.name]}
                                        className={ classes.textField}
                                        value={objData[cp.name] || ''}
                                        onChange={ formHandler(cp.name)}
                                        margin="normal"
                                        />
                                </Grid>
                    }else{
                        return <Grid item xs={xs} sm={md} key={index}>
                                    <TextField
                                        id={cp.name}
                                        required={ cp.required || false }
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
