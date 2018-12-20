import React  from 'react'
import { NavLink } from "react-router-dom";
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
import Logo from '../../logo.png';
import Bg from '../../utils/img/bg.jpg'

const Styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'rgb(250,250,250)',
        fontSize: '10%!important'
    },
    active: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        '& span': {
            color: theme.palette.secondary.main + '!important',
            fontWeight: 'bold'
        },
        '& svg': {
            color: theme.palette.secondary.main + '!important'
        }
    },
    listText: {
       '& span': {
           color: theme.palette.grey.main
       },
       '& svg': {
        color: theme.palette.grey.main
        }
    },
    icon: {
        color: theme.palette.grey.main
    },
    header: { 
        padding: '24px', 
        textAlign: 'center', 
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover'
    },
    nested: {
        '& span': {
           color: theme.palette.grey.dark
       },
    },

});

class MainMenu extends React.Component {

    state = {
        open: false,
    }

    handleClick = () => {
        this.setState(state => ({ open: !this.state.open }));
    }

    render() {
    const { classes, locale } = this.props;
 
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
                            <ListItem button component={NavLink} className={ classes.nested } to="/bookkeeping/quote" activeClassName={classes.active}>
                                <ListItemText inset  primary={ locale.quote.name }/>
                            </ListItem>
                            <ListItem button component={NavLink} className={ classes.nested } to="/bookkeeping/invoice" activeClassName={classes.active}>
                                <ListItemText inset  primary={ locale.invoice.name }/>
                            </ListItem>
                            <ListItem button component={NavLink} className={ classes.nested } to="/bookkeeping/payback" activeClassName={classes.active}>
                                <ListItemText inset  primary={ locale.payback.name }/>
                            </ListItem>
                        </List>
                    </Collapse>
             
                <ListItem button component={NavLink}  to="/service" activeClassName={classes.active}>
                    <ListItemIcon>
                        <HeadsetMicIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.service.name } />
                </ListItem>
                <ListItem button component={NavLink}  to="/product" activeClassName={classes.active}>
                    <ListItemIcon>
                        <StoreIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.product.name } />
                </ListItem>
                
                <ListItem button component={NavLink}  to="/expense" activeClassName={classes.active}>
                    <ListItemIcon>
                        <ReceiptIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.expense.name } />
                </ListItem>

                
                <ListItem button component={NavLink}  to="/task" activeClassName={classes.active}>
                    <ListItemIcon>
                        <ListAltIcon  />
                    </ListItemIcon>
                    <ListItemText className={ classes.listText } primary={ locale.task.name } />
                </ListItem>
            </List>
            <Divider style={{borderColor: 'white'}}/>
            <List component="nav">
                <ListItem button component={NavLink}  to="/archive" activeClassName={classes.active}>
                    <ListItemText primary={ locale.archive.name } />
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
