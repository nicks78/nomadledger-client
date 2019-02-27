import React  from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    textField: {
        width: '100%',
        marginTop: '0px',
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
        
        var value = event.target.value
        for(var i =0; i < arrayField.length ; i++){
            if(value === arrayField[i]['fr'] || value === arrayField[i]['en']){
                event.target.value =  arrayField[i]
            }
        }
        return props.handleAction(event)   
    }

    return (
      <div >
          <TextField
            id={field}
            select
            label={props.locale.form.field[field]}
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
            helperText={props.locale.form.helperText[helperText]}
            margin="dense"
            variant={variant || 'standard'}
            >
            {
                arrayField.map((option, index) => (
                
            
                <MenuItem key={index} value={ option[localStorage.getItem('locale')]}>
                    {option[props.locale.lang]} {option.value && '(' + option.value +')'}
                </MenuItem>
            ))
            }
            </TextField>
      </div>
    )
}

const ApxSelect =  withStyles(styles)(Select)

export { ApxSelect };

