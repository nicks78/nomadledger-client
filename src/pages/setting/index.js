//src/pages/account/index.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Paper, Typography, Grid, Divider } from '@material-ui/core';
import AddCategory from './addCategory'
import AddVat from './addVat'
import AddContactGroup from './addContactGroup'
import HelpIcon from '@material-ui/icons/HelpOutlined'
import Tooltips from '../../components/common/tooltips';


const styles = theme => ({
    title: {
        marginBottom: 24
    },
    icon: {
        position: 'relative',
        top: '6px',
        right: '5px',
        color: 'rgba(0,0,0,.54)'
    },
    iconHelp: {
        color: theme.palette.yellow.light
    },
    paper: {
        padding: 24,
        [theme.breakpoints.down("sm")]: {
            padding: 12
        }
    },
})



class Setting extends Component {

    render() {

        const { classes, locale } = this.props

        return (
            <div>
                <Typography variant="h1" align="center" className={classes.title}>
                    {locale.subheading.param_company}
                </Typography>
                <Grid container spacing={24}
                    direction="row"
                    justify="space-between"
                    alignItems="stretch">

                    <Grid item xs={12} md={6} sm={6}>
                        <Paper className={classes.paper} elevation={1}>
                            <Typography variant="body1">
                                {locale.subheading.my_vat}&nbsp;<Tooltips title={locale.helperText.account_vat} aria-label="vat"><HelpIcon className={classes.iconHelp} /></Tooltips>
                            </Typography>
                            <Divider className={classes.divider} />
                            <AddVat />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <Paper className={classes.paper} elevation={1}>
                            <Typography variant="body1">
                                {locale.subheading.contact_group}&nbsp;<Tooltips title={locale.helperText.account_group} aria-label="group"><HelpIcon className={classes.iconHelp} /></Tooltips>
                            </Typography>
                            <Divider className={classes.divider} />
                            <AddContactGroup />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper} elevation={1}>
                            <Typography variant="body1"  >
                                {locale.subheading.my_categories}&nbsp;<Tooltips title={locale.helperText.account_category} aria-label="category"><HelpIcon className={classes.iconHelp} /></Tooltips>
                            </Typography>
                            <Divider className={classes.divider} />
                            <AddCategory />
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
    }
}

const styledSetting = withStyles(styles)(Setting);

export default connect(mapStateToProps)(styledSetting);
