import React  from 'react'
import { NavLink } from "react-router-dom";
import { DEFAULT_IMG } from '../../redux/constant'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import GroupIcon from '@material-ui/icons/GroupOutlined';
import StoreIcon from '@material-ui/icons/StoreOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMicOutlined';
import ListAltIcon from '@material-ui/icons/ListAltOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceOutlined'
import ExpandLess from '@material-ui/icons/ExpandLessOutlined';
import ExpandMore from '@material-ui/icons/ExpandMoreOutlined';
import Hidden from '@material-ui/core/Hidden';
import { Typography } from '@material-ui/core';

const Styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.darkGrey,
        fontSize: '10%!important'
    },
    active: {
        backgroundColor: theme.palette.secondary.main,
        '& span': {
            color: 'white',
            fontWeight: 'bold'
        },
        '& svg': {
            color: 'white', 
        },
       
    },
    listText: {
       '& span': {
           color: 'white', 
       },
       '& svg': {
        color: 'white',
        },
        '& :focus': {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    icon: {
        color: 'white', 
    },
    header: { 
        padding: '24px', 
        textAlign: 'center', 
        // backgroundColor: theme.palette.lightGrey,
        borderBottom: `1px solid #8c8c8c`
    },
    nested: {
        '& span': {
           color: 'white',
       },
    },
    listTextSecondary: {
        '& span': {
            color: '#8c8c8c', 
        },
         '& :focus': {
             backgroundColor: theme.palette.secondary.main,
         }
     },

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
                    <Typography variant="body1" style={{ color: 'white'}}>{ company.company_name }</Typography>
                </div>
            </Hidden>
            <List component="nav" disablePadding className={classes.listText}>
                <ListItem button component={NavLink} className={classes.listText} onClick={ this.props.closeDrawer } to="/home" activeClassName={classes.active}>
                    <ListItemIcon >
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.home.name } />
                </ListItem>

                <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/contact" activeClassName={classes.active}>
                    <ListItemIcon>
                        <GroupIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.contact.name } />
                </ListItem>

                <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                    <AccountBalanceIcon className={ classes.icon }/>
                </ListItemIcon>
                <ListItemText inset className={ classes.listText } primary={ locale.bookkeeping.name } />
                { this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                    <Collapse in={ this.state.open} timeout="auto" unmountOnExit>
                        <List >
                            <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/quote" activeClassName={classes.active}>
                                <ListItemText inset  primary={ locale.quote.name }/>
                            </ListItem>
                            <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/invoice" activeClassName={classes.active}>
                                <ListItemText inset  primary={ locale.invoice.name }/>
                            </ListItem>
                            <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/refund" activeClassName={classes.active}>
                                <ListItemText inset  primary={ locale.refund.name }/>
                            </ListItem>
                        </List>
                    </Collapse>
             
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
                
                <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/expense" activeClassName={classes.active}>
                    <ListItemIcon>
                        <ReceiptIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.expense.name } />
                </ListItem>

                
                <ListItem button component={NavLink} className={classes.listText}  onClick={ this.props.closeDrawer } to="/task" activeClassName={classes.active}>
                    <ListItemIcon>
                        <ListAltIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.task.name } />
                </ListItem>
            </List>
            <Divider style={{borderColor: 'white'}}/>
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
