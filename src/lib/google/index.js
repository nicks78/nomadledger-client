//src/lib/google/index.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import xml from 'xml-js'
import {Button} from '@material-ui/core';
import Tooltips from '../../components/common/tooltips'
import Icon from './icon'


import { extractTitleFromEntry,
extractEmailFromEntry,
extractPhoneNumberFromEntry,
extractOrganizationFromEntry,
extractFamilyNameFromEntry,
extractGivenNameFromEntry } from './utils'

const SCOPE = 'https://www.googleapis.com/auth/contacts.readonly'
const MAX_RESULTS = '999' // TODO Make this parametable or paginate

class GoogleContacts extends Component {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.handleImportContacts = this.handleImportContacts.bind(this)
    this.handleParseContacts = this.handleParseContacts.bind(this)
    this.state = {
      hovered: false,
      active: false
    }
  }

  componentDidMount() {
    const { jsSrc } = this.props
    ;((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0]
      const fjs = element
      let js = element
      js = d.createElement(s)
      js.id = id
      js.src = jsSrc
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs)
      } else {
        d.head.appendChild(js)
      }
      js.onload = cb
    })(document, 'script', 'google-contacts')
  }

  handleImportContacts(res) {
    const { onFailure } = this.props

    if (res) {
      const authResponse = res.getAuthResponse()
      window.gapi.load('client', () => {
        window.gapi.client
          .request({
            path: '/m8/feeds/contacts/default/full',
            params: { 'max-results': MAX_RESULTS },
            headers: {
              'GData-Version': '3.0',
              Authorization: `Bearer ${authResponse.access_token}`
            }
          })
          .then(response => this.handleParseContacts(response), err => onFailure(err))
      })
    }
  }

  handleParseContacts(response) {
    const { onSuccess } = this.props

    // Now let's parse the XML...
    const options = { ignoreDeclaration: true, ignoreComment: true, compact: true }
    const parsed = xml.xml2js(response.body, options)

    console.log("PARSED", parsed)

    // Iterate over each contact.
    const results = []
    const author = parsed.feed.author && parsed.feed.author.email && parsed.feed.author.email._text
    Object.keys(parsed.feed.entry).forEach(key => {
      if (
        parsed.feed.entry[key] &&
        parsed.feed.entry[key]['gd:email'] &&
        parsed.feed.entry[key]['gd:email']._attributes &&
        parsed.feed.entry[key]['gd:email']._attributes.address
      ) {
        results.push({
          authorGmail: author,
          fullName: extractTitleFromEntry(parsed.feed.entry[key]),
          firstname: extractGivenNameFromEntry(parsed.feed.entry[key]),
          lastname: extractFamilyNameFromEntry(parsed.feed.entry[key]),
          email: extractEmailFromEntry(parsed.feed.entry[key]),
          phoneNumber: extractPhoneNumberFromEntry(parsed.feed.entry[key]),
          company_name: extractOrganizationFromEntry(parsed.feed.entry[key])
        })
      }
    })

    onSuccess(results)
  }

  signIn(e) {
    const {
      clientId,
      cookiePolicy,
      loginHint,
      hostedDomain,
      redirectUri,
      discoveryDocs,
      onRequest,
      onFailure,
      uxMode,
      accessType,
      responseType,
      prompt,
      onSuccess
    } = this.props

    const params = {
      client_id: clientId,
      cookie_policy: cookiePolicy,
      login_hint: loginHint,
      hosted_domain: hostedDomain,
      discoveryDocs,
      ux_mode: uxMode,
      redirect_uri: redirectUri,
      scope: SCOPE,
      access_type: accessType
    }

    if (responseType === 'code') {
      params.access_type = 'offline'
    }

    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const _signIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        const options = { prompt }
        onRequest()
        if (responseType === 'code') {
          auth2.grantOfflineAccess(options).then(res => onSuccess(res), err => onFailure(err))
        } else {
          auth2.signIn(options).then(res => this.handleImportContacts(res), err => onFailure(err))
        }
      }

      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(_signIn)
        } else {
          _signIn()
        }
      })
    }
  }

  render() {
    const { buttonText, children, render, icon, locale, isCreating } = this.props

    if (render) {
      return render({ onClick: this.signIn })
    }

    return (
              <Tooltips title={ locale.helperText.import_contact}><Button  disabled={isCreating} variant="contained" style={{backgroundColor: "rgb(66, 133, 244)", color: "white", fontSize: 13}}  icon={icon} key={2} onClick={this.signIn}>
                <Icon key={1} active={this.state.active} />
                  &nbsp;&nbsp;{children || buttonText}
              </Button></Tooltips>
        )
    }
}

GoogleContacts.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  jsSrc: PropTypes.string,
  onRequest: PropTypes.func,
  buttonText: PropTypes.node,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  disabledStyle: PropTypes.object,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  responseType: PropTypes.string,
  type: PropTypes.string,
  accessType: PropTypes.string,
  render: PropTypes.func,
  theme: PropTypes.string,
  icon: PropTypes.bool
}

GoogleContacts.defaultProps = {
  type: 'button',
  tag: 'button',
  buttonText: 'Import from Gmail',
  accessType: 'online',
  prompt: 'consent',
  cookiePolicy: 'single_host_origin',
  uxMode: 'popup',
  disabled: false,
  disabledStyle: {
    opacity: 0.6
  },
  theme: 'light',
  onRequest: () => {},
  jsSrc: 'https://apis.google.com/js/api.js'
}

export default GoogleContacts
