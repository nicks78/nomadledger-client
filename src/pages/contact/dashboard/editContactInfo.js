import React  from 'react'
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {country, phone_code} from '../../../utils/static_data'



const TextLabelValue = (props) => {

    var array = [];
    switch (props.field) {
        case "addresses_country":
            array = country
            break;
        case "phone":
            array = phone_code
            break;
        default:
            break;
    }

    var c ;
    if(props.type === 'select'){
        c = <TextField
            id="standard-select-country"
            helperText={props.locale.form.helperText.select_country_code}
            select
            name={props.field}
            onChange={ props.editProfile}
            value={props.value}
            style={{width: '100%'}}
            SelectProps={{
                
            }}
            margin="normal"
        >
         { array.map((option, index) => (
            <MenuItem key={index} value={option.value}>
                {option[`label_${props.locale.lang}`]} ({option.value})
            </MenuItem>
            ))}
        </TextField>
    }else{
        
        c = <Input
            defaultValue={props.value}
            name={props.field}
            onChange={props.editProfile}
            placeholder={props.label}
            style={{width: '100%'}}
            
        />
    }

    if(props.field === "phone"){
 
        return <div style={{clear: 'both'}}>
                {
                    props.edit ?
                    <div><TextField
                        id="standard-select-phone"
                        helperText={props.locale.form.helperText.select_phone_code}
                        select
                        value={props.selected}
                        name="phone_code"
                        style={{width: '100%'}}
                        onChange={ props.editProfile}
                        SelectProps={{
                        
                        }}
                        margin="normal"
                    >
                    { phone_code.map((option, index) => (
                        
                        <MenuItem key={index} value={option.value}>
                            {option[`label_${props.locale.lang}`]} ({option.value})
                        </MenuItem>
                        ))}
                    </TextField>
                    <Input
                        defaultValue={props.valuePhone}
                        placeholder={props.label}
                        onChange={props.editProfile}
                        name={props.field}
                        style={{width: '100%'}} /></div>
                    : 
                    <div>
                        <Typography variant="caption" component={"p"} href={props.href || ""}>
                            <span style={{float:'left', fontWeight: "bold"}}>{props.label} :<br /></span>
                        </Typography>
                        <Typography variant="caption" component={props.html_tag || "p"} href={props.href || ""}>
                            <span style={{float: "right"}}>{props.value}</span>
                        </Typography>
                    </div>
                }
        </div>


    }

    return (
        <div style={{clear: 'both'}}>
        {
            props.edit ?
                c 
            : 
            <div>
            <Typography variant="caption" component={"p"} href={props.href || ""}>
                <span style={{float:'left', fontWeight: "bold"}}>{props.label} :<br /></span>
            </Typography>
            <Typography variant="caption" component={props.html_tag || "p"} href={props.href || ""}>
                <span style={{float: "right"}}>{props.value}</span>
            </Typography>
            </div>
        }
        </div>

    )
}


export default TextLabelValue