//manager/src/lib/editSelect.js

import React from 'react'
import { ApxSelect, ApxtextIndexValue } from '../components/common'


/**
 * 
 * @param arrayField List of options
 * @param field Name of the field in database
 * @param helperText Text helper for UI
 * @param locale List of translated text
 * @param label UI name of the field
 * @param value value of the field
 * @func handleAction handle selected option 
 */
const EditSelect = (props) => {
    
    const {arrayField, field, helperText, handleAction, locale, showEdit, label, value } = props
console.log(value)
    if(showEdit){
        return  <ApxSelect 
                    arrayField={arrayField}
                    field={field}
                    value={value}
                    helperText={helperText}
                    handleAction={ handleAction }
                    locale={locale}
                />
    }

    if(!showEdit){
        return (
            <ApxtextIndexValue 
                value={value}
                label={label}
            />
        )
    }
}

export default EditSelect;