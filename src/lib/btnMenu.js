//src/lib/btnMenu.js

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterListOutlined'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GetAppIcon from '@material-ui/icons/GetApp'
import {Tooltip} from '@material-ui/core'


// function renderSelect(props) {
//   return <TextField
//             id="Select year"
//             select
//             label={props.locale.wording.select_year}
//             name="fiscal_year"
//             value={ props.value || ''}
//             onChange={ (e) => { props.selected(e) } }
//             margin="dense"
//             variant="outlined">
//
//             {
//               ["2019", "2020", "2021"].map((option, index) => (
//                   <MenuItem key={index} value={ option }>
//                         {option}
//                   </MenuItem>
//               ))
//             }
//         </TextField>
// }

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


        {toExcel ? <Tooltip title="Export Excel"><IconButton  onClick={ this.props.onDownload }><GetAppIcon /></IconButton></Tooltip> : null }

        <Menu
          id={Date.now()}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          style={{maxHeight: 400, minWidth: 400, padding: 30}}
        >
        {
            menus.map(( menu, index) => {
                return <MenuItem
                        key={index}
                        style={{textTransform: 'capitalize', color: menu.color || "#303030", fontWeight: 400}}
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

// <Popover
//   id={Date.now()}
//   anchorEl={anchorEl}
//   open={Boolean(anchorEl)}
//   onClose={this.handleClose}
//   style={{maxHeight: 400, minWidth: 400, padding: 30}}
// >
//
//
//   <div style={{maxHeight: 400, minWidth: 300, padding: 20}}>
//     <Typography variant="overline">Filters</Typography>
//     <br />
//       <Grid container spacing={24}>
//         <Grid item xs={12}>
//           <ApxSelect
//               arrayField={ menus}
//               field="filter"
//               value=""
//               label={locale.wording.filter_by}
//               locale={ locale }
//               helperText="Help me god"/>
//         </Grid>
//         <Grid item xs={6}>
//           <Checkbox value="Archive"  />
//         </Grid>
//
//       </Grid>
//
//   </div>
//
// </Popover>
