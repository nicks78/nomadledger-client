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

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { fontSize } = this.props

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
          <MenuItem onClick={this.handleClose}>Action-1</MenuItem>
          <MenuItem onClick={this.handleClose}>Action-2</MenuItem>
          <MenuItem onClick={this.handleClose}>Action-3</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default BtnMenu;