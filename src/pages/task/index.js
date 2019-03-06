//manager/src/pages/task/index.js

import React, { Component } from 'react'
import { getAllTask , createTask, createStateTask, setTask, updateTask} from '../../redux/task/actions'
import {connect} from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Paper, withStyles, Button} from '@material-ui/core'
import AddTask from './addTask'
import TaskCard from './taskCard'
import EditTask from './editTask'


class Task extends Component {

  state = {
    reducer: "TASK",
    id: null
  }

  componentDidMount(){
    this.props.getAllTask(`grouped-task`);
  }

  getDrop = ( ev, due ) => { 
    ev.preventDefault();
    
    // get data localy
    var data = ev.dataTransfer.getData("task");
    var task = JSON.parse(data);

    // Update new due_date
    task.due_date = due;

    // Register to database
    this.props.setTask(task)
    this.props.updateTask();
  }

  drag = ( ev, task ) => {
    // Set data localy
    ev.dataTransfer.setData("task", JSON.stringify(task));
  }

  dragOver = (event) => {
    event.preventDefault();
  }

  handleUpdateTask = () => {  
    this.setState({id: null });
      this.props.updateTask();
  }

  handleEdit = (task) => {
    this.props.setTask(task)
    this.setState({id: task._id})
  }


  render() {

    const { classes , createTask, isFetching, createStateTask, isCreating, locale, newTask, listTask, status, itemToUpdate} = this.props;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const {id} = this.state

    return (
      <div className={classes.root}>
          {
            id === null ? 
            <AddTask 
              locale={ locale }  
              newData={newTask} 
              createTaskState={ createStateTask } 
              createTask={ createTask } 
              isCreating={isCreating}
              status={status}
          />
          : <Button disabled variant="contained">{ locale.button.updating }</Button>
          }
          

      <div className={classes.step}>
          { isFetching ? <div style={{textAlign: 'center', marginTop: 20}}><CircularProgress size={30} thickness={5} /></div> : null }
      {
          listTask.map((label, index) => {
              return  <div id={label.date.date} key={index} onDrop={ (e) => {this.getDrop(e, label.date.due_date)  } } onDragOver={this.dragOver}>
                            <p className={classes.title}> 
                              <span className={classes.span}></span>
                              <span className={classes.spanDate}>{new Date(label.date.date).toLocaleDateString(localStorage.getItem('locale'), options)}</span>
                            </p>
                          
                            {
                              label.tasks.map((task, index) => {
                                  return  <Paper id={task._id} key={index} className={classes.paper} draggable={true} onDragStart={ (e) => { this.drag(e, task) }}>
                                                {
                                                    id === task._id ?
                                                      <EditTask 
                                                        locale={locale}
                                                        task={task}
                                                        status={status}
                                                        itemToUpdate={itemToUpdate}
                                                        onCreateStateTask={this.props.createStateTask}
                                                        onUpdateTask={this.handleUpdateTask}
                                                      />

                                                    : <TaskCard 
                                                        task={task}
                                                        id={id}
                                                        onEdit={this.handleEdit}
                                                      />
                                                }
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


const mapStateToProps = (state) => {
  return {
      isFetching: state.task.isFetching,
      isCreating: state.task.isCreating,
      isError: state.task.isError,
      message: state.task.message,
      listTask: state.task.list || [],
      itemToUpdate: state.task.item,
      locale: state.locale.locale,
      newTask: state.task.item || {},
      status: state.helper.items.status_task,
  }
}

const StyledTask = withStyles(styles)(Task)

export default connect(mapStateToProps, { createTask, getAllTask, createStateTask, setTask, updateTask })(StyledTask);