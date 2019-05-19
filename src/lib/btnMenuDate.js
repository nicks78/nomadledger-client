//src/lib/btnMenu.js

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange'
import { Popover, Typography} from '@material-ui/core'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Tooltips from '../components/common/tooltips'


/**
 * @param {*} menus array
 * @param {*} locale object
 * @param toExcel boolean
 * @param fontSize Number
 */
class BtnMenuDate extends React.Component {

  state = {
    anchorEl: null,
    selectedDay: new Date()
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };

  handleAction = (menu) => {
    this.setState({ anchorEl: null });

  }

  handleDayChange = (date) => {
    this.setState({selectedDay: date});
    var query = "date=" + new Date(date).getTime()
    this.props.onChangeQuery( query )
  }

  render() {
    const { anchorEl, selectedDay } = this.state;
    const { fontSize, locale } = this.props

    return (
      <div style={{ display: "inline-flex" }}>

        <Tooltips title={locale.wording.filter_date}><IconButton
          aria-owns={anchorEl ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <DateRangeIcon style={{ fontSize: fontSize || 24 }}/>
        </IconButton>
        </Tooltips>

        <Popover
          id={Date.now()}
          anchorEl={anchorEl}
          style={{ backgroundColor: "rgb(0,0,0,0.34)", boxShadow: 'none', '& div > div': { boxShadow: "none" } }}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        <div style={{height: 280, width: 260, padding: 10}}>
          <Typography variant="caption" align="center">{locale.wording.pick_date}</Typography>
          <DayPicker
              selectedDay={selectedDay}
              onDayClick={  this.handleDayChange }
              className="day-picker"
              weekdaysLong={ locale.week_long}
              weekdaysShort={ locale.week_short}
              months={ locale.month}
              month={new Date(selectedDay.getFullYear(), selectedDay.getMonth())}
              modifiersStyles={{ position: 'absolute' }}
              firstDayOfWeek={1}
          />

        </div>

        </Popover>



      </div>
    );
  }
}

export default BtnMenuDate;
