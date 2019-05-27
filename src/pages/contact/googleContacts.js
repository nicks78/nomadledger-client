//src/pages/auth/components/GoogleContacts.js
import React from 'react'
import {GOOGLE_CLIENTID} from '../../redux/constant'
import GoogleContacts from '../../lib/google';

const GoogleImportContacts = (props) => {

    const {responseGoogle, locale, isCreating} = props

    return (
          <div style={{textAlign: "center"}}>
          <GoogleContacts
            clientId={GOOGLE_CLIENTID}
            buttonText={locale.wording.google_import}
            onSuccess={responseGoogle}
            locale={locale}
            isCreating={isCreating}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            theme="dark"
            style={{width: "100%"}}
          />
          </div>
    )
}

export default GoogleImportContacts
