//src/pages/auth/components/googleSignUp.js
import React from 'react'
import {GOOGLE_CLIENTID} from '../../../redux/constant'
import { GoogleLogin } from 'react-google-login';

const GoogleSignUp = (props) => {

    const {responseGoogle, locale} = props

    return (
          <div style={{textAlign: "center"}}>
          <GoogleLogin
            clientId={GOOGLE_CLIENTID}
            buttonText={locale.wording.google_sign_up}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            theme="dark"
            style={{width: "100%"}}
          />
          </div>
    )
}

export default GoogleSignUp
