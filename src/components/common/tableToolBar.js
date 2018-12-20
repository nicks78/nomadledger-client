import React from 'react';
import { 
withStyles, 
Toolbar,
Typography,
Tooltip,
Menu,
MenuItem,
IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterListOutlined'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
})

class EnhancedToolBar extends React.Component {

    state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };

    handleMobileMenuOpen = (event) => {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleProfileMenuOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    render(){

    const { numSelected, classes, selected } = this.props;

    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
   

    const renderMenu = (
      <Menu
        anchorEl={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        // onClose={}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );


    return (
      <Toolbar>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle2">
            {numSelected} {selected}
          </Typography>
        ) : (
          <Typography variant="subtitle2" id="tableTitle">
            {this.props.title}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
          
            <IconButton 
              aria-owns={isMenuOpen ? 'material-appbar' : undefined }
              aria-label="Filter list" onClick={this.handleProfileMenuOpen} >
              {renderMenu}
              <FilterListIcon onClick={this.handleMenuClose} />
              
            </IconButton>
          </Tooltip>
        )}
      </div>
      
    </Toolbar>
    )
  }

}

const ApxTableToolBar = withStyles(styles)(EnhancedToolBar);

export { ApxTableToolBar };