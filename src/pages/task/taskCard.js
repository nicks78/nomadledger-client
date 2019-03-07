//src/pages/task/taskCard.js

import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'

const TaskCard = (props) => {
    const {task, id, classes} = props
    return (
      <div>
          <span className={classes.subtitle}>{task.subject} - <span style={{fontSize: 11, color: 'rgb(238,238,238)'}}>{ new Date(task.due_date.date).toLocaleDateString('fr') }</span></span>
            { 
                id !== task._id &&
                <EditIcon onClick={ () => { props.onEdit(task) }} style={{float: 'right', color: 'blue', fontSize: 18, cursor: "pointer", marginTop: 5}} />
            }
            <Typography variant="body1" style={{maxWidth: '90%', textAlign: 'justify'}}>{task.short_desc}</Typography> 
            <br />
            {
                id !== task._id ?
                    <span style={{ backgroundColor: task.status.color,borderRadius: 4, color: "white", padding: "1px 3px 1px 3px", position: "absolute", bottom: 5, right: 5, fontSize: 11}}>{task.status.fr}</span>
                : null 
            }
      </div>
    )
}

const styles = theme => ({
    subtitle: {
      textTransform: "capitalize",
      fontWeight: 600
    }
    
})


export default withStyles(styles)(TaskCard);