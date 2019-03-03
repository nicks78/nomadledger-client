//src/lib/dayPicker.js

import React from 'react';
import { withStyles } from '@material-ui/core';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DateRangeIcon from '@material-ui/icons/DateRange'


const date = { 
    fr: {
        month : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
        week_long: ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        week_short: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        placeholder: 'JJ/MM/AAAA'
    },
    en: {
        month : ["January", "February","March","April","May","June", "July","August","September", "October","November", "December"],
        week_long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        week_short: ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"],
        placeholder: 'DD/MM/YYYY'
    }

}




 
/**
 * @param value 
 * @param field
 * @func handleDate
 * 
 */
class DatePickers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedDay: new Date(),
        show: false,

      }
    }
   
    handleDayChange = (date) => {
        this.setState({
            selectedDay: date,
            show: false
        });

        var month = date.getMonth() + 1;

        // Set date object
        var obj = {
            date: new Date(date),
            year: date.getFullYear(),
            month: month,
            dayOfMonth: date.getDate(),
            label: date.getDate() +'/'+ month +'/'+ date.getFullYear(),
            intl_format: date.getFullYear() +'/'+ month +'/'+ date.getDate(),
            timestamp: date.getTime()
        }

        var event = {
            target: { value: obj, name: this.props.field }
        }

        this.props.handleDate(event)
    }

    handleShow = () => {
        this.setState({ show: !this.state.show })
    }

   
    render() {
    const { classes } = this.props
    const { selectedDay} = this.state
    var locale = localStorage.getItem('locale');

    var modifiers = {
        highlighted: new Date(selectedDay),
    }


      return (
            <div className={classes.root}>
                <DateRangeIcon className={ classes.icon } onClick={this.handleShow} />
                {   this.state.show ? 
                            <DayPicker 
                                id={this.props.field}
                                onDayClick={  this.handleDayChange }
                                weekdaysLong={ date[locale].week_long}
                                selectedDay={selectedDay}
                                weekdaysShort={ date[locale].week_short}
                                months={ date[locale].month}
                                modifiers={modifiers}
                                modifiersStyles={{ position: 'absolute' }}
                                firstDayOfWeek={1}
                            />                         
                    : null 
                }
            </div>
      )
    }
}

const styles = theme => ({
    root: {
        // padding: 12,
        
    },
    icon: {
        paddingTop: 5,
        cursor: 'pointer', 
        fontSize: '20px !important',
        color: theme.palette.secondary.main,
        
    },
    span: {
        fontSize: 14,
        '& :hover ': {
            color: theme.palette.secondary.dark
        }
    },
    textField: {
        // width: '100%'
    },
})


export default  withStyles(styles)(DatePickers);