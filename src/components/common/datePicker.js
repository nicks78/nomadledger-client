import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import {date} from '../../utils/static_data'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DateRangeIcon from '@material-ui/icons/DateRangeOutlined'
 
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
    const { classes, value, label } = this.props
    const { selectedDay} = this.state
    var locale = localStorage.getItem('locale');

    var modifiers = {
        highlighted: new Date(selectedDay),
    }


      return (
            <div className={classes.root}>

                <Grid container spacing={24}>

                    <Grid item xs={2}>
                        <span className={ classes.span }><DateRangeIcon className={ classes.icon } onClick={this.handleShow} /></span>
                    </Grid>

                    <Grid item xs={10}>
                        <Typography variant="subtitle2">{label} :
                            <span style={{float: 'right', clear: 'both', color: 'rgba(0, 0, 0, 0.87)'}}>
                            {value || date[locale].placeholder }</span>
                        </Typography>
                    </Grid>

                </Grid>
                    
                {   this.state.show ? 
                            <DayPicker 
                                onDayClick={  this.handleDayChange }
                                weekdaysLong={ date[locale].week_long}
                                selectedDay={selectedDay}
                                weekdaysShort={ date[locale].week_short}
                                months={ date[locale].month}
                                modifiers={modifiers}
                                firstDayOfWeek={1}
                            />                         
                    : null 
                }
            </div>
      )
    }
}

const styles = theme => ({
    icon: {
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
        width: '100%'
    },
})

const ApxDatePicker =  withStyles(styles)(DatePickers)

export default ApxDatePicker;