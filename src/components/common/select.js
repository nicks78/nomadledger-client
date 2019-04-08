import React  from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    textField: {
        width: '100%',
        marginTop: '7px',
        marginBottom: '3px',
        '& span': {
            color: theme.palette.secondary.main
        },
        '& svg': {
            color: theme.palette.secondary.main
        }
    },
    menu: {
        width: 'auto',
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
const Select = (props) => {

    const {classes, arrayField, field, helperText, required, variant} = props

    const selected = (event) => {
        
        var value = event.target.value;
        for(var i =0; i < arrayField.length ; i++){

            if(value === arrayField[i]['fr'] || value === arrayField[i]['en']){
                event.target.value =  arrayField[i]
            }
        }
        return props.handleAction(event)   
    }

    return (
          <TextField
            id={field}
            select
            label={props.locale.wording[field]}
            className={classes.textField}
            
            name={field}
            required={ required || false }
            value={ props.value || ''}
            onChange={ (evt) => { selected(evt) } }
            SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
            helperText={props.locale.helperText[helperText]}
            margin="dense"
            variant={variant || "filled"}
            >
            {
                arrayField && arrayField.length > 0 ?
                    arrayField.map((option, index) => (
                    
                
                    <MenuItem key={index} value={ option[localStorage.getItem('locale')]}>
                        <span style={{color: option.color || 'inherit'}} >{option[props.locale.lang]} {option.value && '(' + option.value +')'}</span>
                    </MenuItem>
                ))
                : null 
            }
            </TextField>
    )
}

const ApxSelect =  withStyles(styles)(Select)

export default ApxSelect;

