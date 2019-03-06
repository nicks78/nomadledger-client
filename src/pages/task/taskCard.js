//src/pages/task/taskCard.js

import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'

const TaskCard = (props) => {
    const {task, id, classes} = props
    return (
      <div>
          <span className={classes.subtitle}>{task.subject}</span>
            { 
                id !== task._id &&
                <EditIcon onClick={ () => { props.onEdit(task) }} style={{float: 'right', color: 'blue', fontSize: 18, cursor: "pointer", marginTop: 5}} />
            }
            <Typography variant="body1" style={{maxWidth: '90%', textAlign: 'justify'}}>{task.short_desc}</Typography> 
            {
                id !== task._id ?
                    <span style={{ backgroundColor: task.status.color,borderRadius: 4, color: "white", padding: "1px 3px 1px 3px", position: "absolute", bottom: 5, right: 5, fontSize: 11}}>{task.status.fr}</span>
                : null 
            }
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


export default withStyles(styles)(TaskCard);