//manager/src/pages/task/index.js

import React, { Component } from 'react'
import { getAllTask , createTask, createStateTask} from '../../redux/task/actions'
import {connect} from 'react-redux'
import {Paper, withStyles, Typography, Button} from '@material-ui/core'
import AddTask from './addTask'


class Task extends Component {

  state = {
    reducer: "TASK",
    id: ""
  }

  componentDidMount(){
    this.props.getAllTask(`grouped-task`);
  }

  getDrop = ( ev ) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data));

    // UPDATE TASK ELEMENT TO DATABASE
  }

  drag = ( ev ) => {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  dragOver = (event) => {
    event.preventDefault();
  }


  render() {

    const { classes , createTask, createStateTask, isCreating, locale, newTask, listTask} = this.props;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    console.log(listTask)
    return (
      <div className={classes.root}>

          <AddTask 
              locale={ locale }  
              newData={newTask} 
              createTaskState={ createStateTask } 
              createTask={ createTask } 
              isCreating={isCreating}
          />

      <div className={classes.step}>

      {
          listTask.map((label, index) => {
              return  <div id={label.date.date} key={index} onDrop={ (e) => {this.getDrop(e)  } } onDragOver={this.dragOver}>
                            <p className={classes.title}> 
                              <span className={classes.span}></span>
                              <span className={classes.spanDate}>{new Date(label.date.date).toLocaleDateString(localStorage.getItem('locale'), options)}</span>
                            </p>
                          
                            {
                              label.tasks.map((task, index) => {
                                  return  <Paper id={task._id} key={index} className={classes.paper} draggable={true} onDragStart={ (e) => { this.drag(e) }}>
                                              <Typography variant="subtitle1" className={classes.subtitle}>{task.subject}</Typography>
                                              <Typography variant="body1">
                                                {task.short_desc}
                                              </Typography>
                                          </Paper>
                              })
                            }
                           
                      </div>
          })
      }
      </div>
          
      </div>
    )
  }
}

const styles = theme => ({
    root: {

    },
    paper: {
      padding: '5px 10px 5px 10px',
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
      backgroundColor: 'orange',
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
      textTransform: "capitalize"
    }
    
})


const mapStateToProps = (state) => {
  return {
      isFetching: state.task.isFetching,
      isCreating: state.task.isCreating,
      isError: state.task.isError,
      message: state.task.message,
      listTask: state.task.list || [],
      locale: state.locale.locale,
      newTask: state.task.item || {}
  }
}

const StyledTask = withStyles(styles)(Task)

export default connect(mapStateToProps, { createTask, getAllTask, createStateTask  })(StyledTask);