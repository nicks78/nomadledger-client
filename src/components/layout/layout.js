import React  from 'react'
import { withStyles } from '@material-ui/core/styles';
import {API_ENDPOINT} from '../../redux/constant'
import { Link } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../logo.png';
import MainMenu from './menu'
import {ApxCopyright} from '../common'
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const drawerWidth = 240;

// Style object
const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    
    drawerPaper: {
        position: 'relative',
        height: '100vh',
        backgroundColor: 'rgb(250,250,250)',
        width: drawerWidth,
        marginTop: '0px',
        [theme.breakpoints.up('md')]: {
            marginTop: '66px',
        },
        boxShadow: '2px 0 10px -8px black'
    },
    
    navIconHide: {
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
    
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        background: 'rgb(250,250,250)',
        boxShadow: 'none',
        border: '1px solid transparent',
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        [theme.breakpoints.up('md')]: {
          width: '100%', //`calc(100% - ${drawerWidth}px)`,
        },
    },
    title: {
        flex: 1,
        marginLeft: '20px',
        fontSize: '20px',
        fontWeight: "700",
        color: theme.palette.grey.dark
    },
    content: {
        flexGrow: 1,
        overflowY: 'auto',
        backgroundColor: 'rgb(238,238,238)',// theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        [theme.breakpoints.down('sm')]: {
            margin: 0,
            padding: 0
        },
    },
    avatar: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover img': {
            width: '120%',
            transition: 'all 0.2s ease',

        }
    },
    hamburger: {
        color: theme.palette.secondary.main
    },
    lang: {
        color: theme.palette.secondary.main,
        marginLeft:  15,
        cursor: 'pointer',
        fontSize: 14,
        '&:hover': {
            color: theme.palette.secondary.dark,
            fontWeight: 600
        }
    }
})

class Layout extends React.Component {
    state = {
        mobileOpen: false,
        anchorEl: null,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    render() {

    const { classes, locale, user } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <div className={ classes.root}>
            <AppBar className={classes.appBar} >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.navIconHide}
                    >
                    <MenuIcon className={ classes.hamburger }/>
                </IconButton>
                <Hidden smDown>
                    <Typography >
                        <img src={Logo} alt="logo" height="50" width="auto" /> 
                    </Typography>
                </Hidden>
                
                <Typography className={classes.title}>
                <Hidden smDown>Apx BookKeeping Solutions</Hidden>
                </Typography>

                <Typography>
                <Avatar
                    component="span"
                    onClick={ this.handleMenu }
                    alt="Nicolas"
                    src={`${API_ENDPOINT}image/view${ user.avatar.path||  '/default/default_avatar.png' }`}
                    className={ classes.avatar }
                />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem component={Link} onClick={this.handleClose}  to="/account" >My account</MenuItem>
                  <MenuItem onClick={this.props.logout}>Deconnexion</MenuItem>
                </Menu>
                </Typography>
                    <Typography variant="overline" className={classes.lang} onClick={ () => { this.props._onChangeLocale(locale.lang === 'fr' ? 'en' : 'fr') } }>{ locale.lang === 'fr' ? 'EN' : 'FR' }</Typography>
                </Toolbar>
            </AppBar>
            
            <Hidden mdUp>
                <Drawer
                
                variant="temporary"
                anchor="left"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <MainMenu locale={ locale }  />
                    <ApxCopyright />      
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                <MainMenu locale={ locale } />
                <ApxCopyright /> 
            </Drawer>
            </Hidden>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                    {this.props.children}
            </main>
            
        </div>
    )
  }
}



export default withStyles(styles)(Layout);
