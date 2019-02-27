//manager/src/pages/client/form.js

import React  from 'react'
import TextField from '@material-ui/core/TextField';
import ApxSelect from './select'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit
    },
    textField: {
        width: '100%',
        marginTop: '0px',
        // float: 'left',
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
                                        label={locale.form.field[cp.name]}
                                        className={ classes.textField}
                                        value={objData[cp.name] || ''}
                                        onChange={ formHandler }
                                        margin="dense"
                                        />
                                </Grid>
                    }else{
                        return <Grid item xs={xs} sm={md} key={index}>
                                    <TextField
                                        id={cp.name}
                                        required={ cp.required || false }
                                        type={cp.type}
                                        name={cp.name}
                                        label={locale.form.field[cp.name]}
                                        className={ classes.textField}
                                        value={objData[cp.name] || ''}
                                        onChange={ formHandler }
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
