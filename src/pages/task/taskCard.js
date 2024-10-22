//src/pages/task/taskCard.js

import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
import CircularProgress from '@material-ui/core/CircularProgress';


const TaskCard = (props) => {
    const {task, id, classes, isFetching} = props
    return (
      <div>
          <span className={classes.subtitle}>{task.subject} - <span className={ classes.span }>{ new Date(task.due_date.date).toLocaleDateString('fr') }</span></span>
            {
                id !== task._id && !isFetching
                  ?  <EditIcon onClick={ () => { props.onEdit(task) }} className={classes.icon} />
                  : <CircularProgress className={ classes.circular } color="secondary" /> 
            }
            <Typography variant="body2" style={{maxWidth: '90%', textAlign: 'justify'}}>{task.short_desc}</Typography>
            <br />
            {
                id !== task._id ?
                    <span className={ classes.status } style={{ backgroundColor: task.status.color,}}>{task.status[localStorage.getItem('locale')]}</span>
                : null
            }
      </div>
    )
}

const styles = theme => ({
    subtitle: {
      textTransform: "capitalize",
      fontWeight: 600
    },
    status: {
        borderRadius: 4,
        color: "white",
        padding: "1px 3px 1px 3px",
        position: "absolute",
        bottom: 10,
        right: 5,
        fontSize: 11,
        minWidth: 60,
        textAlign: 'center'
    },
    icon: {
        float: 'right',
        color: theme.palette.primary.main,
        fontSize: 18,
        cursor: "pointer",
        marginTop: 5
    },
    span: {
      fontSize: 11,
      color: 'rgb(185,185,185)'
    },
    circular: {
      float: 'right',
      width: '15px !important',
      height: '15px !important'
    },
})


export default withStyles(styles)(TaskCard);
