import React  from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        marginLeft: '10px',
        marginRight: '10px',
        width: '90%',
        marginTop: '0px',
        float: 'left',
    },
    menu: {
        width: 'auto'
    }
})

const Select = (props) => {

    var label = props.locale.lang === 'en' ? 'label_en' : 'label_fr';
    const {classes, arrayField, field, helperText} = props

    return (
      <div>
          <TextField
            id="standard-select"
            select
            label="Select"
            className={classes.textField}
            value={ props.value || ''}
            onChange={props.handleAction(field)}
            SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
            helperText={props.locale.form.helperText[helperText]}
            margin="normal"
            >
            {arrayField.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                    {option[label]}
                </MenuItem>
            ))}
            </TextField>
      </div>
    )
}

const ApxSelect =  withStyles(styles)(Select)

export { ApxSelect };