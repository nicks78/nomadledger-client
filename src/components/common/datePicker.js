import React from 'react';
import { withStyles } from '@material-ui/core';
import {date} from '../../utils/static_data'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const styles = theme => ({
  root: {

  },
  picker: {
      fontSize: '13px',
  },
  textField: {
      width: '100%'
  }
});


class DatePickers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedDay: new Date(),
      }
    }
   
    handleDayChange = (date, modifiers, dayPickerInput) => {
        var fieldName = dayPickerInput.props.name

        this.setState({
            selectedDay: date,
        });

        var month = date.getMonth() + 1;

        // Set date object
        var obj = {
            date: new Date(date),
            label: date.getDate() +'/'+ month +'/'+ date.getFullYear(),
            timestamp: date.getTime()
        }

        this.props.handleDate(fieldName, obj)
    }

   
    render() {
    const { classes, field, value } = this.props
    const { selectedDay} = this.state
    var locale = localStorage.getItem('locale');

   

      return (
            <div className={classes.root}>
                    <DayPickerInput 
                        
                        onDayChange={this.handleDayChange}
                        locale={locale}
                        name={field}
                        placeholder={ value || date[locale].placeholder}
                        selectedDays={ selectedDay }
                        dayPickerProps={{
                            weekdaysLong: date[locale].week_long,
                            weekdaysShort: date[locale].week_short,
                            months: date[locale].month,
                            className:classes.picker 
                        }}
                    />

            </div>
      )
    }
  }

const ApxDatePicker =  withStyles(styles)(DatePickers)

export { ApxDatePicker };