import React  from 'react'
import { NavLink } from "react-router-dom";
import { DEFAULT_IMG } from '../../redux/constant'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import GroupIcon from '@material-ui/icons/GroupOutlined';
import StoreIcon from '@material-ui/icons/StoreOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMicOutlined';
import CachedIcon from '@material-ui/icons/CachedOutlined';
import ListAltIcon from '@material-ui/icons/ListAltOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceOutlined'
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import Hidden from '@material-ui/core/Hidden';
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
    listText: {
        borderRadius: "0px 50px 50px 0px",
       '& span': {
           color: '#303030',
           fontWeight: 400,
       },
       '& svg': {
          color: '#303030',
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
        this.setState( state => ({ open: !this.state.open }));
    }

    render() {
    const { classes, locale, company } = this.props;

    return (
        <div className={classes.root}>
            <Hidden mdUp>
                <div className={classes.header}>
                    <img src={company.logo_company && company.logo_company.full_path !== "" ? company.logo_company.full_path : DEFAULT_IMG} alt="logo" height="40" width="auto" />
                    <Typography variant="h3">{ company.company_name }</Typography>
                </div>
            </Hidden>
            <List component="nav" disablePadding className={classes.listText}>
                <ListItem button component={NavLink} className={classes.listText} onClick={ this.props.closeDrawer } to="/dashboard" activeClassName={classes.active}>
                    <ListItemIcon >
                        <InsertChartIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.home.name } />
                </ListItem>

                <Divider className={classes.divider}/>

                    <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/invoice" activeClassName={classes.active}>
                        <ListItemIcon>
                            <AccountBalanceIcon  />
                        </ListItemIcon>
                        <ListItemText className={ classes.listText } primary={ locale.invoice.name } />
                    </ListItem>
                    <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/quote" activeClassName={classes.active}>
                        <ListItemIcon>
                            <AssignmentIcon  />
                        </ListItemIcon>
                        <ListItemText className={ classes.listText } primary={ locale.quote.name } />
                    </ListItem>
                    <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/refund" activeClassName={classes.active}>
                        <ListItemIcon>
                            <CachedIcon  />
                        </ListItemIcon>
                        <ListItemText className={ classes.listText } primary={ locale.refund.name } />
                    </ListItem>

              <Divider className={classes.divider}/>

                <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/expense" activeClassName={classes.active}>
                    <ListItemIcon>
                        <ReceiptIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.expense.name } />
                </ListItem>


              <Divider className={classes.divider}/>

                <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/service" activeClassName={classes.active}>
                    <ListItemIcon>
                        <HeadsetMicIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.service.name } />
                </ListItem>
                <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/product" activeClassName={classes.active}>
                    <ListItemIcon>
                        <StoreIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.product.name } />
                </ListItem>

              <Divider className={classes.divider}/>

                <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/contact" activeClassName={classes.active}>
                    <ListItemIcon>
                        <GroupIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.contact.name } />
                </ListItem>

                <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/task" activeClassName={classes.active}>
                    <ListItemIcon>
                        <ListAltIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.task.name } />
                </ListItem>
            </List>
            <Divider style={{backgroundColor: "rgba(0, 0, 0, 0.12)"}}/>
            <List component="nav">
                <ListItem button component={NavLink}  className={classes.listTextSecondary}  onClick={ this.props.closeDrawer } to="/archive" activeClassName={classes.active}>
                    <ListItemText  primary={ locale.archive.name } />
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
