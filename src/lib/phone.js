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

    const { field, fieldCode, handleAction, showEdit, label, valueCode, value , classes, reducer, country }= props

    const selected = (event) => {

        var value = event.target.value
        for(var i =0; i < country.length ; i++){
            if(value === country[i]._id){
                event.target.value =  country[i]
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
                        value={ valueCode._id}
                        onChange={ (evt) => { selected(evt) } }
                        SelectProps={{
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        margin="dense"
                        >
                        {country.map((option, index) => (
                            <MenuItem key={index} value={ option._id}>
                                {option[localStorage.getItem('locale')]} {option.dial_code && '(' + option.dial_code +')'}
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
                    href={`tel:${valueCode.dial_code}${value.replace('0', '')}`}
                    value={ '('+valueCode.dial_code +') ' +value}
                    label={label}
                />


        )
    }
}

const mapStateToProps = (state) => {

    return {
        country: state.helper.items.country || [],
    }
  }

const StyledPhone = withStyles(styles)(Phone)

export default connect(mapStateToProps)(StyledPhone);
