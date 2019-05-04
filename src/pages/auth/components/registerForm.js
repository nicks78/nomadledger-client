//src/pages/auth/components/registerForm.js
import React from 'react'
import { TextField, Grid } from '@material-ui/core';


/*
* @params fonc
*
*/
const RegisterForm = (props) =>  {

    const {state, updateState, locale} = props

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
                        inputProps={{ minLength: 8 }}
                        label={ locale.wording.password }
                        value={ state.password || "" }
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>

          </Grid>

      </div>
    )
}



export default RegisterForm;
