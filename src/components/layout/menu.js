import React from 'react'
import { NavLink } from "react-router-dom";
import { DEFAULT_IMG } from '../../redux/constant'
import PropTypes from 'prop-types';
import { withStyles, List, ListItem, ListItemIcon, ListItemText, Divider, Hidden } from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import GroupIcon from '@material-ui/icons/GroupOutlined';
import StoreIcon from '@material-ui/icons/StoreOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMicOutlined';
import CachedIcon from '@material-ui/icons/CachedOutlined';
import ListAltIcon from '@material-ui/icons/ListAltOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceOutlined'
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import DeckIcon from '@material-ui/icons/DeckOutlined';
import LanguageIcon from '@material-ui/icons/LanguageOutlined';
import { Typography } from '@material-ui/core';

const Styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        // backgroundColor: theme.palette.darkGrey,
        fontSize: '10%!important'
    },
    active: {
        color: theme.palette.secondary.main,
        borderRadius: "0px 50px 50px 0px",
        backgroundColor: '#dfdedf',
        '& span': {
            color: `${theme.palette.secondary.main} !important`,

            fontWeight: '700 !important'
        },
        '& svg': {
            color: `${theme.palette.secondary.main} !important`,

        },

    },
    _active: {
        color: theme.palette.secondary.main,
        backgroundColor: '#dfdedf',
        '& span': {
            color: `${theme.palette.secondary.main} !important`,

            fontWeight: '700 !important'
        },
        '& svg': {
            color: `${theme.palette.secondary.main} !important`,
        },
    },
    listText: {
        borderRadius: "0px 50px 50px 0px",
        '& span': {
            color: theme.palette.primary.main,
            fontWeight: 400,
        },
        '& svg': {
            color: theme.palette.primary.main,
        },
        '& :focus': {
            color: theme.palette.secondary.main,
        },
        '& :hover': {
            borderRadius: "0px 50px 50px 0px",
            // backgroundColor: theme.palette.secondary.light,
        }
    },
    icon: {
        color: 'white',
    },
    header: {
        padding: '24px',
        textAlign: 'center',
        borderBottom: `1px solid rgba(0, 0, 0, 0.12)`
    },
    listTextSecondary: {
        '& span': {
            color: '#8c8c8c',
        },
        '& :focus': {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    divider: {
        backgroundColor: "rgba(230,230,230, 1)",
        width: "90%",
        marginTop: 5,
        marginBottom: 5
    }

});

class MainMenu extends React.Component {

    state = {
        open: true,
    }

    handleClick = () => {
        this.setState(state => ({ open: !this.state.open }));
    }

    components = {
        InsertChartIcon: InsertChartIcon,
        AccountBalanceIcon: AccountBalanceIcon,
        ListAltIcon: ListAltIcon,
        CachedIcon: CachedIcon,
        ReceiptIcon: ReceiptIcon,
        HeadsetMicIcon: HeadsetMicIcon,
        StoreIcon: StoreIcon,
        GroupIcon: GroupIcon,
        AssignmentIcon: AssignmentIcon,
        LanguageIcon: LanguageIcon,
        DeckIcon: DeckIcon
    }

    renderMenuBar = (menuName, iconName) => {
        const TagName = this.components[iconName];
        const { classes, closeDrawer, locale } = this.props
        return <ListItem button component={NavLink} className={classes.listText} onClick={closeDrawer} to={locale[menuName].url} activeClassName={classes.active}>
            <ListItemIcon >
                <TagName />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary={locale[menuName].name} />
        </ListItem>
    }

    render() {
        const { classes, locale, company } = this.props;

        return (
            <div className={classes.root}>
                <Hidden mdUp>
                    <div className={classes.header}>
                        <img src={company.logo_company && company.logo_company.full_path !== "" ? company.logo_company.full_path : DEFAULT_IMG} alt="logo" height="40" width="auto" />
                        <Typography variant="h3">{company.company_name}</Typography>
                    </div>
                </Hidden>
                <List component="nav" disablePadding className={classes.listText}>
                    {this.renderMenuBar('home', "InsertChartIcon")}

                    <Divider className={classes.divider} />
                    {this.renderMenuBar('invoice', "AccountBalanceIcon")}
                    {this.renderMenuBar('quote', "ListAltIcon")}
                    {this.renderMenuBar('refund', "CachedIcon")}

                    <Divider className={classes.divider} />
                    {this.renderMenuBar('expense', "ReceiptIcon")}

                    <Divider className={classes.divider} />
                    {this.renderMenuBar('service', "HeadsetMicIcon")}
                    {this.renderMenuBar('product', "StoreIcon")}

                    <Divider className={classes.divider} />
                    {this.renderMenuBar('contact', "GroupIcon")}
                    {this.renderMenuBar('coworking', "DeckIcon")}
                    {this.renderMenuBar('task', "AssignmentIcon")}

                </List>
                <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }} />
                <List component="nav" style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItem button component={NavLink} className={classes.listTextSecondary} onClick={this.props.closeDrawer} to="/template" activeClassName={classes._active}>
                        <ListItemText primary={locale.template.name} />
                    </ListItem>
                </List>

                <List component="nav" style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItem button component={NavLink} className={classes.listTextSecondary} onClick={this.props.closeDrawer} to="/archive" activeClassName={classes._active}>
                        <ListItemText primary={locale.archive.name} />
                    </ListItem>
                </List>

            </div>
        )
    }
}

MainMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(MainMenu);
