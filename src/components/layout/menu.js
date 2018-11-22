import React  from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import GroupIcon from '@material-ui/icons/GroupOutlined';
import CallMadeIcon from '@material-ui/icons/CallMadeOutlined';
import StoreIcon from '@material-ui/icons/StoreOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMicOutlined';
import Hidden from '@material-ui/core/Hidden';
import Logo from '../../logo.png';
import Bg from '../../utils/img/bg.jpg'

const Styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        fontSize: '10%!important'
    },
    active: {
        color: theme.palette.secondary.light
    },
    listText: {
       '& span': {
           color: 'rgba(0,0,0,0.54)'
       }
    },
    header: { 
        padding: '24px', 
        textAlign: 'center', 
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover'
    }

});

const MainMenu = (props) => {
    const { classes, locale } = props;
 
    return (
        <div className={classes.root}>
            <Hidden mdUp>
                <div className={classes.header}>
                    <img src={Logo} alt="logo" height="40" width="auto" /> 
                    <p style={{marginBottom: '0px', color: 'white', fontWeight: '600'}}>APX DEV</p>
                </div>
            </Hidden>
            <List component="nav" disablePadding>
                <ListItem button component={NavLink}  to="/home" activeClassName={classes.active}>
                    <ListItemIcon >
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.home.name } />
                </ListItem>

                <ListItem button component={NavLink}  to="/contact" activeClassName={classes.active}>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.contact.name } />
                </ListItem>
             
                <ListItem button component={NavLink}  to="/service" activeClassName={classes.active}>
                    <ListItemIcon>
                        <HeadsetMicIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.service.name } />
                </ListItem>
                <ListItem button component={NavLink}  to="/product" activeClassName={classes.active}>
                    <ListItemIcon>
                        <StoreIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.product.name } />
                </ListItem>
                
                <ListItem button component={NavLink}  to="/expense" activeClassName={classes.active}>
                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.expense.name } />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <CallMadeIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.vat.name } />
                </ListItem>
            </List>
            <Divider />
            <List component="nav">
                <ListItem button>
                <ListItemText primary="Trash" />
                </ListItem>
                <ListItem button>
                <ListItemText primary="Spam" />
                </ListItem>
            </List>
        </div>
  );
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(MainMenu);
