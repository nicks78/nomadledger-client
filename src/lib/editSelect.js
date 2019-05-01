//manager/src/lib/editSelect.js

import React from 'react'
import ApxSelect  from '../components/common/select'
import ApxtextIndexValue  from '../components/common/textIndexValue'

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

    const {arrayField, field, helperText, handleAction, locale, showEdit, label, value, variant, required, margin } = props

    if(showEdit){
        return  <div style={{marginBottom: margin || 15}}><ApxSelect
                    arrayField={arrayField}
                    field={field}
                    value={value}
                    helperText={helperText}
                    handleAction={ handleAction }
                    locale={locale}
                    required={required}
                    variant={variant}
                /></div>
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
