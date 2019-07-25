//src/pages/task/taskCard.js

import React  from 'react'
import { withStyles, TextField, Grid, InputAdornment, Button} from '@material-ui/core'
// import CheckIcon from '@material-ui/icons/CheckOutlined'
import DayPickers from '../../lib/dayPicker'
import ApxSelect from '../../components/common/select'


const EditTask = (props) => {
    const { itemToUpdate , classes, status, task, locale} = props

    return (
      <div style={{marginTop: 24}}>
        <Grid container spacing={8}>

            <Grid item xs={12} sm={4} md={4}>
            <TextField
                  label={locale.wording.due_date}
                  id="due_date"
                  disabled
                  style={{width: '100%'}}
                  value={  itemToUpdate.due_date.label || ''}
                  className={classes.textField}
                  variant="filled"
                  margin="dense"
                  InputProps={{
                      startAdornment: <InputAdornment position="start">
                          <DayPickers
                                  value={ itemToUpdate.due_date ? itemToUpdate.due_date.intl_format : ""}
                                  handleDate={ (e) =>  props.onCreateStateTask(null, "due_date", e.target.value) }
                                  field="due_date"
                              />
                      </InputAdornment>,
                  }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <TextField
                  variant="filled"
                  label={locale.wording.subject}
                  value={itemToUpdate.subject || ""}
                  className={classes.textField}
                  margin="dense"
                  fullWidth
                  onChange={(e) => { props.onCreateStateTask(null, 'subject', e.target.value) }}
                />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
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
            <Grid item xs={12}>
            <TextField
                variant="filled"
                value={itemToUpdate.short_desc || ""}
                label={locale.wording.short_desc}
                margin="dense"
                fullWidth
                multiline
                rows={4}
                onChange={(e) => { props.onCreateStateTask(null, 'short_desc', e.target.value) }}
              />
              
                <Button color="primary" onClick={ () => props.onUpdateTask(task) } className={classes.btn} variant="contained">{ locale.wording.update }</Button>

            </Grid>
        </Grid>
          
        
      </div>
    )
}



const styles = theme => ({
  textField: {
    marginTop: 0,
  },
  btn: {
    backgroundColor: theme.palette.yellow.dark,
    minWidth: 120,
    float: 'right',
    marginTop: 24,
    marginBottom: 20
  },
})


export default withStyles(styles)(EditTask);

// { isFetching ? <CheckIcon onClick={ () => { props.onUpdateTask(task) } } style={{float: 'right', color: 'green', fontSize: 18, cursor: "pointer", marginTop: 5}} /> : null }
