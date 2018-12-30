import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterListOutlined'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

  render() {
    const { anchorEl } = this.state;
    const { fontSize, menus, locale } = this.props

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <FilterListIcon style={{ fontSize: fontSize || 24 }}/>
        </IconButton> 
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        {
            menus.map(( menu, index) => {
                return <MenuItem key={index} onClick={ () => this.props.onChangeQuery( menu.code ) }>{locale.table[menu.label]}</MenuItem>
            })
        }
        </Menu>
      </div>
    );
  }
}

export default BtnMenu;