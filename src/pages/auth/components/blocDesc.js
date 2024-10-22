//src/pages/auth/components/blocDesc.js
import React  from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {Grid, withStyles, Paper, Typography} from '@material-ui/core';


const BlocDesc = (props) => {
    const { locale, classes, isMobile } = props
    return (
        <div className={ isMobile ? classes.mobile : classes.blocDesc}>
        <Typography 
            variant="h2" align="center" 
            className={ classes.title } 
            style={{  marginBottom: isMobile ? 10 : 100, marginTop: isMobile ? 50 : 0 }}
            dangerouslySetInnerHTML={{__html: locale.home_page.blocDesc.title}}/>
        <Grid container spacing={24}>

                <Grid item xs={12} md={4} sm={12}>
                    <Paper className={classes.paper}>
                        <img src={`${DEFAULT_URL}img/svg/Nomad-Ledger_mulit-currency.svg`} alt="" width="200"/>
                        <Typography variant="h3" className={classes.blocTitle} align="center">{locale.home_page.blocDesc.bloc_1_title}</Typography>
                        <Typography variant="body2" className={classes.blocPara} align="justify" dangerouslySetInnerHTML={{__html: locale.home_page.blocDesc.bloc_1_para}}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                    <Paper className={classes.paper} style={{marginTop: isMobile ? 0 : -48}}>
                        <img src={`${DEFAULT_URL}img/svg/Nomad-Ledger_invoice-quote.svg`} alt="" width="200"/>
                        <Typography variant="h3" className={classes.blocTitle} align="center">{locale.home_page.blocDesc.bloc_2_title}</Typography>
                        <Typography variant="body2" className={classes.blocPara} align="justify" dangerouslySetInnerHTML={{__html: locale.home_page.blocDesc.bloc_2_para }}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                    <Paper className={classes.paper}>
                        <img src={`${DEFAULT_URL}img/svg/Nomad-Ledger_task.svg`} alt="" width="200"/>
                        <Typography variant="h3" className={classes.blocTitle} align="center">{locale.home_page.blocDesc.bloc_3_title}</Typography>
                        <Typography variant="body2" className={classes.blocPara} align="justify" dangerouslySetInnerHTML={{__html: locale.home_page.blocDesc.bloc_3_para }}/>
                    </Paper>
                </Grid>
                
        </Grid>
        <div id="formAnchor"></div>
        </div>
    )
}

const styles = theme => ({
    blocDesc: {
        marginTop: 50, 
        marginBottom: 70,  
    },
    mobile: {
        marginTop: 0,
    },
    title: {
 
        color: theme.palette.primary.main,
    },
    blocTitle: {
        marginTop: 24
    },
    blocPara: {
        marginTop: 24,
        fontWeight: 400
    },
    paper: {
        textAlign: 'center',
        padding: 24,
        boxShadow: "0 0 38px 18px rgba(24,138,141,0.08)",
        height: 460
    }
})

export default withStyles(styles)(BlocDesc)
