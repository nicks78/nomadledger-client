//manager/src/lib/phone.js

import React from 'react'
import {connect} from 'react-redux'
import { withStyles, Grid, TextField, MenuItem } from '@material-ui/core';
import ApxtextIndexValue from '../components/common/textIndexValue'

const styles = theme => ({
    textField: {
        marginTop: 0,
        marginBottom: 15,
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
const Phone = (props) => {

    const { field, fieldCode, handleAction, showEdit, label, valueCode, value , classes, reducer, phone_code }= props

    const selected = (event) => {

        var value = event.target.value
        for(var i =0; i < phone_code.length ; i++){
            if(value === phone_code[i]['fr'] || value === phone_code[i]['en']){
                event.target.value =  phone_code[i]
            }
        }
        return props.handleAction(event, reducer)
    }
    if(showEdit){
        return  <Grid container spacing={8}>
                    <Grid item xs={5}>
                    <TextField
                        id={fieldCode}
                        select
                        variant="outlined"
                        label={props.locale.wording.phone_code}
                        className={classes.textField}
                        name={fieldCode}
                        value={ valueCode[localStorage.getItem("locale")] || ''}
                        onChange={ (evt) => { selected(evt) } }
                        SelectProps={{
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        margin="dense"
                        >
                        {phone_code.map((option, index) => (

                            <MenuItem key={index} value={ option[localStorage.getItem('locale')]}>
                                {option.code} {option.value && '(' + option.value +')'}
                            </MenuItem>
                        ))}
                        </TextField>

                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            id={field}
                            label={label}
                            variant="outlined"
                            className={classes.textField}
                            value={value}
                            name={field}
                            onChange={ handleAction  }
                            margin="dense"
                        />
                    </Grid>
                </Grid>

    }

    if(!showEdit){
        return (

                <ApxtextIndexValue
                    html_tag="a"
                    href={`tel:${valueCode.value}${value.replace('0', '')}`}
                    value={ '('+valueCode.value +') ' +value}
                    label={label}
                />


        )
    }
}

const mapStateToProps = (state) => {

    return {
        phone_code: state.helper.items.phone_code || [],
    }
  }

const StyledPhone = withStyles(styles)(Phone)

export default connect(mapStateToProps)(StyledPhone);
