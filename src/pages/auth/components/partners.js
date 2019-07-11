//src/pages/auth/components/partners.js
import React from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {withStyles } from '@material-ui/core'

const  Partners = (props) => {

    const { classes, locale, isMobile } = props

    return (
        <div className={classes.PartnersWrapper}>
            <img src={`${DEFAULT_URL}/img/partners/whatzhat.png`} width="120" alt="whatzhat" />
            <img src={`${DEFAULT_URL}/img/partners/apx.png`} width="90" alt="apx-dev" />
            <img src={`${DEFAULT_URL}/img/partners/acte.png`} width="140" alt="acte-solution"/>
            <img src={`${DEFAULT_URL}/img/partners/MyAssistantOnLine.png`} width="120" alt="myassistant"/>

        </div>
    )
}

const styles = theme => ({
    PartnersWrapper: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        WebkitFilter: "grayscale(1)",
        filter: "grayscale(1)" 
    }
})
  

export default withStyles(styles)(Partners);
