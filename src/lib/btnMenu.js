import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterListOutlined'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



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
    const { fontSize, menus } = this.props

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
                        style={{textTransform: 'capitalize'}}
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