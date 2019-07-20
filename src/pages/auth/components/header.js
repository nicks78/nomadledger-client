//src/pages/auth/components/header.js

import React from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {Link} from 'react-router-dom'
import { Typography} from '@material-ui/core'

const Header = (props) => {

    const {locale} = props

    return (
        <div>
            <Typography variant="h1" align="center">
            <Link to="/"><img src={`${DEFAULT_URL}img/logo.png`} alt="logo" height="80" width="auto" /></Link><br />
                <span dangerouslySetInnerHTML={{__html: locale.company_name}}></span>
            </Typography><br />
        </div>
    )
}

export default Header;