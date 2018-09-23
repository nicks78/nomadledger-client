import React  from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';



const phone = [
    { name_fr: "France",  name_en:"France", dial_code:"+33", code:"FR"},
    { name_fr: "La réunion",  name_en:"Réunion",dial_code:"+262",code:"RE"},
    { name_fr: "Martinique",  name_en:"Martinique",dial_code:"+596",code:"MQ"},
    { name_fr: "Royaume-Uni",  name_en:"United Kingdom",dial_code:"+44",code:"GB"},
    { name_fr: "Italie",  name_en:"Italy",dial_code:"+39",code:"IT"},
    { name_fr: "Finlande",  name_en:"Finland",dial_code:"+358",code:"FI"},
    { name_fr: "Irlande",  name_en:"Ireland",dial_code:"+353",code:"IE"},
    { name_fr: "Malte",  name_en:"Malta",dial_code:"+356",code:"MT"},
    { name_fr: "Maurice",  name_en:"Mauritius",dial_code:"+230",code:"MU"},
    { name_fr: "Mayotte",  name_en:"Mayotte",dial_code:"+262",code:"YT"},
    { name_fr: "Monaco",  name_en:"Monaco",dial_code:"+377",code:"MC"},
    { name_fr: "Portugal",  name_en:"Portugal",dial_code:"+351",code:"PT"},
    { name_fr: "États-Unis",  name_en:"United States",dial_code:"+1",code:"US"},
    { name_fr: "Canada",  name_en:"Canada",dial_code:"+1", code:"CA"},
    { name_fr: "Pologne",  name_en:"Poland",dial_code:"+48",code:"PL"},
    { name_fr: "Suède",  name_en:"Sweden",dial_code:"+46",code:"SE"},
    { name_fr: "Suisse",  name_en:"Switzerland",dial_code:"+41",code:"CH"},
    { name_fr: "Turquie",  name_en:"Turkey",dial_code:"+90",code:"TR"},
    { name_fr: "Singapour",  name_en:"Singapore",dial_code:"+65",code:"SG"},
    { name_fr: "Hong Kong",  name_en:"Hong Kong",dial_code:"+852",code:"HK"},
    { name_fr: "Vietnam",  name_en:"Viet Nam",dial_code:"+84",code:"VN"},
    { name_fr: "Cambodge", name_en:"Cambodia",dial_code:"+855",code:"KH"},
    { name_fr: "Maroc",  name_en:"Morocco",dial_code:"+212",code:"MA"},
    { name_fr: "Sénégal",  name_en:"Senegal",dial_code:"+221",code:"SN"},
    { name_fr: "Tunisie",  name_en:"Tunisia",dial_code:"+216",code:"TN"},
    { name_fr: "Liban",  name_en:"Lebanon",dial_code:"+961",code:"LB"},
]

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

const PhoneCode = (props) => {

    var lg = props.locale.lang === 'en' ? 'name_en' : 'name_fr';
    const {classes} = props

    return (
      <div>
          <TextField
            id="standard-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={ props.value || ''}
            onChange={props.handleAction('phone_code')}
            SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
            helperText={props.locale.form.helperText.phone_code}
            margin="normal"
            >
            {phone.map((option, index) => (
                <MenuItem key={index} value={option.dial_code}>
                    {option[lg]}
                </MenuItem>
            ))}
            </TextField>
      </div>
    )
}

const ApxPhoneCode =  withStyles(styles)(PhoneCode)

export { ApxPhoneCode };