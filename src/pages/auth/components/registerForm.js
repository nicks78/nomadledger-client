//src/pages/auth/components/registerForm.js
import React from 'react'
import { TextField, Grid, Checkbox, Typography, withStyles } from '@material-ui/core';


/*
* @params fonc
*
*/
const RegisterForm = (props) =>  {

    const {state, updateState, locale, classes} = props

    return (
      <div>

          <Grid container spacing={8}>

                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        name="firstname"
                        id="firstname"
                        value={ state.firstname || "" }
                        onChange={ updateState }
                        fullWidth
                        required
                        className={classes.textField}
                        label={ locale.wording.firstname }
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        name="lastname"
                        id="lastname"
                        onChange={ updateState }
                        fullWidth
                        required
                        className={classes.textField}
                        label={ locale.wording.lastname }
                        value={ state.lastname || "" }
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="company_name"
                        id="company_name"
                        onChange={ updateState }
                        fullWidth
                        required
                        className={classes.textField}
                        label={ locale.wording.company_name }
                        value={ state.company_name || "" }
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        id="email"
                        type="email"
                        onChange={ updateState }
                        fullWidth
                        required
                        className={classes.textField}
                        label={ locale.wording.email }
                        value={ state.email || "" }
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="password"
                        id="password"
                        type="password"
                        onChange={ updateState }
                        fullWidth
                        required
                        className={classes.textField}
                        inputProps={{ minLength: 8 }}
                        label={ locale.wording.password }
                        value={ state.password || "" }
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <p style={{display: "inline-flex", alignItems: "center"}}>
                      <Checkbox onChange={props.onAgreedToTerms} /><Typography variant="body1" component="span" dangerouslySetInnerHTML={{__html: locale.home_page.agreed_terms }} />
                    </p>
                </Grid>

          </Grid>

      </div>
    )
}


const styles = theme => ({
    textField: {
        '& fieldset': {
            borderRadius: 24,
            border: "none"
        },
        "& label": {
            marginLeft: 10
        },

        '& input': {
            backgroundColor: 'white',
            borderRadius: 24
        }
    }
})

export default withStyles(styles)(RegisterForm);
