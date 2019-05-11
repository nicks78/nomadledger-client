//src/lib/btnMenu.js

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterListOutlined'
import MenuItem from '@material-ui/core/MenuItem';
import { Popover} from '@material-ui/core'
import Tooltips from '../components/common/tooltips'


/**
 * @param {*} menus array
 * @param {*} locale object
 * @param toExcel boolean
 * @param fontSize Number
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
    const { fontSize, menus, tooltipTitle } = this.props

    return (
      <div style={{ display: "inline-flex" }}>

        <Tooltips title={tooltipTitle}>
            <IconButton
            aria-owns={anchorEl ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <FilterListIcon style={{ fontSize: fontSize || 24 }}/>
          </IconButton>
        </Tooltips>

        <Popover
          id={Date.now()}
          anchorEl={anchorEl}
          style={{ backgroundColor: "rgb(0,0,0,0.34)", boxShadow: 'none'}}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        {
            menus.map(( menu, index) => {
                return <MenuItem
                        key={index}
                        style={{textTransform: 'capitalize', color: menu.color ||  "#303030", fontWeight: 400}}
                        onClick={ () => this.handleAction( menu ) }>{menu[localStorage.getItem('locale')]}
                      </MenuItem>
            })
        }

      </Popover>

      </div>
    );
  }
}


export default BtnMenu;
