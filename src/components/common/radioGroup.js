import React from 'react'
import { withStyles, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';


/**
 * 
 * @param arrayObject of field name
 * @param value selected field
 * @param locale translation json
 * @func  => handle change  
 */
const RadioGroups = (props) => {


    const { arrayObject, value, action, classes } = props;


    const _selected = (event) => {
        var value = event.target.value
        var name = event.target.name
        for (let i = 0; i < arrayObject.length; i++) {
            if(arrayObject[i].code === value ){
                var newevent = { target: { value : arrayObject[i], name: name } }
                action(newevent);
                return
            }
        }
    }

    return (<RadioGroup
                aria-label="Status"
                name="status"
                className={classes.group}
                value={value}
                onChange={(event) => { _selected(event) }}
            >
            {
                arrayObject && arrayObject.length > 0 ?
                arrayObject.map((radio, index) => {
                    return  <FormControlLabel   
                                key={index} 
                                value={ radio.code } 
                                control={ <Radio style={{ color: radio.color }}/> } 
                                label={ radio[localStorage.getItem('locale')] } 
                            />
                })
                : null 
            }
        </RadioGroup>
    )
}

const styles = theme => ({
    group: {
        display: 'inline-block',
        width: '100%'
    },
    label: {
        color: 'green'
    }

})

const ApxRadioGroup = withStyles(styles)(RadioGroups)

export default ApxRadioGroup;
