//src/pages/auth/components/partners.js
import React from 'react'
import {Link} from 'react-router-dom'
import {DEFAULT_URL} from '../../../redux/constant'
import {withStyles, Typography } from '@material-ui/core'

const  Partners = (props) => {

    const { classes, locale, isMobile } = props

    return (
        <div className={classes.PartnersWrapper}>
            <img src={`${DEFAULT_URL}/img/logo.png`} width="80" />
            <img src={`${DEFAULT_URL}/img/logo.png`} width="80" />
            <img src={`${DEFAULT_URL}/img/logo.png`} width="80" />
            <img src={`${DEFAULT_URL}/img/logo.png`} width="80" />

        </div>
    )
}

const styles = theme => ({
    PartnersWrapper: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        filter: "gray", /* IE6-9 */
        webkitFilter: "grayscale(1)", /* Google Chrome, Safari 6+ & Opera 15+ */
        filter: "grayscale(1)" /* Microsoft Edge and Firefox 35+ */
    }
})
  

export default withStyles(styles)(Partners);
