//src/lib/btnMenu.js

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterListOutlined'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GetAppIcon from '@material-ui/icons/GetApp'

/**
 * @menus array of object
 *
 *
 */
class BtnMenu extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };

  handleAction = (menu) => {
    this.setState({ anchorEl: null });
    this.props.onChangeQuery( menu )
  }

  render() {
    const { anchorEl } = this.state;
    const { fontSize, menus, toExcel } = this.props

    return (
      <div style={{ display: "inline-flex" }}>
        <IconButton
          aria-owns={anchorEl ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <FilterListIcon style={{ fontSize: fontSize || 24 }}/>
        </IconButton>
        {toExcel ? <IconButton  onClick={ this.props.onDownload }><GetAppIcon /></IconButton> : null }
        <Menu
          id={Date.now()}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          style={{maxHeight: 400}}
        >
        {
            menus.map(( menu, index) => {
                return <MenuItem
                        key={index}
                        style={{textTransform: 'capitalize', color: menu.color || "#303030"}}
                        onClick={ () => this.handleAction( menu ) }>{menu[localStorage.getItem('locale')]}
                      </MenuItem>
            })
        }
        </Menu>
      </div>
    );
  }
}

export default BtnMenu;
