//manager/src/lib/editInput.js

import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {ApxtextIndexValue} from '../components/common'
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginTop: 0,
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
    
    const { field, handleAction, showEdit, label, value , classes} = props

    if(showEdit){
        return <TextField 
                    id={field}
                    label={label}
                    className={classes.textField}
                    value={value}
                    name={field}
                    onChange={ handleAction  }
                    margin="normal"
                />
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