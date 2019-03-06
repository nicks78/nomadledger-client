//src/pages/task/taskCard.js

import React  from 'react'
import { withStyles, TextField, Grid, InputAdornment} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import DayPickers from '../../lib/dayPicker'
import ApxSelect from '../../components/common/select'


const EditTask = (props) => {
    const { itemToUpdate , classes, status, task, locale} = props

    return (
      <div>
        <CheckIcon onClick={ () => { props.onUpdateTask(task) } } style={{float: 'right', color: 'green', fontSize: 18, cursor: "pointer", marginTop: 5}} />
        <Grid container spacing={24}>
          
            <Grid item xs={4}>
            <TextField
                  label={locale.form.field.due_date}
                  id="due_date"
                  disabled
                  style={{width: '100%'}}
                  value={  itemToUpdate.due_date.label || ''}
                  className={classes.test}
                  variant="filled"
                  margin="dense"
                  InputProps={{
                      startAdornment: <InputAdornment position="start">
                          <DayPickers 
                                  handleDate={ (e) =>  props.onCreateStateTask(null, "due_date", e.target.value) }
                                  field="due_date"
                              /> 
                      </InputAdornment>,
                  }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField 
                  variant="filled"
                  value={itemToUpdate.subject || ""}
                  margin="dense"
                  fullWidth
                  onChange={(e) => { props.onCreateStateTask(null, 'subject', e.target.value) }}
                />
            </Grid>
            <Grid item xs={4}>
              <ApxSelect 
                  arrayField={status}
                  field="status"
                  value={itemToUpdate.status[localStorage.getItem("locale")] || ""}
                  helperText="Help me"
                  handleAction={ (e) =>  props.onCreateStateTask(null, "status", e.target.value ) }
                  locale={locale}
                  variant="filled"
              />
            </Grid>
        </Grid>
          <TextField 
            variant="filled"
            value={itemToUpdate.short_desc || ""}
            margin="dense"
            fullWidth
            multiline
            rows={4}
            onChange={(e) => { props.onCreateStateTask(null, 'short_desc', e.target.value) }}
          />
      </div>
    )
}



const styles = theme => ({
    root: {

    },
    paper: {
      padding: '5px 10px 5px 10px',
      position: 'relative',
      minHeight: 50,
      margin: 20,
      marginLeft: -20
    },
    step: {
      borderLeft: '1px solid #9e9e9e',
      minHeight: 400,
      marginLeft: 20,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 40,
    },
    },
    title: {
        color: "rgb(128, 128, 128)"
    },
    span: {
      height: '15px',
      marginRight: 10,
      width: '15px',
      marginLeft: -8,
      backgroundColor: theme.palette.secondary.light,
      borderRadius: '50%',
      display: 'inline-block',
      textAlign: 'center'
    },
    spanDate: {
      marginTop: 10,
      fontWeight: 600,
      textTransform: "capitalize"
    },
    subtitle: {
      textTransform: "capitalize",
      fontWeight: 600
    }
    
})


export default withStyles(styles)(EditTask);