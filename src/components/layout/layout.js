import React  from 'react'
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../logo.png';
import MainMenu from './menu'

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
        width: drawerWidth,
        marginTop: '66px',
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
        color: theme.palette.secondary,
        fontWeight: "500"
    },
    content: {
        flexGrow: 1,
        overflowY: 'auto',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    }
})

class Layout extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    render() {

    const { classes, locale } = this.props;

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
                    <MenuIcon />
                </IconButton>
                <Hidden smDown>
                    <Typography >
                        <img src={Logo} alt="logo" height="40" width="auto" /> 
                    </Typography>
                </Hidden>
                <Typography color="secondary" className={classes.title}>
                    PAX COMPTA.com
                </Typography>
                    <Button color="secondary" onClick={ () => { this.props._onChangeLocale(locale) } }>{ locale.lang === 'fr' ? 'EN' : 'FR' }</Button>
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
                <MainMenu locale={ locale }/>
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
