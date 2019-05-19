//manager/src/lib/editInput.js

import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import ApxtextIndexValue from '../components/common/textIndexValue'
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginTop: 0,
        fontWeight: 300,
        width: '100%'
    }
})


/**
 *
 * @param arrayField List of options
 * @param field Name of the field in database
 * @param helperText Text helper for UI
 * @param locale List of translated text
 * @func handleAction handle selected option
 */
const EditInput = (props) => {

    const { field, handleAction, showEdit, label, value , classes, required, disabled, helperText} = props

    if(showEdit){
        return <div style={{marginBottom: 15}}>
                <TextField
                    id={field}
                    label={label}
                    required={required}
                    className={classes.textField}
                    helperText={helperText}
                    value={value}
                    name={field}
                    disabled={disabled || false}
                    variant="outlined"
                    onChange={ handleAction  }
                    margin="dense"
                /></div>
    }

    if(!showEdit){
        return (
            <ApxtextIndexValue
                html_tag={props.html_tag}
                href={props.href}
                value={value}
                label={label}
            />
        )
    }
}

export default withStyles(styles)(EditInput);
