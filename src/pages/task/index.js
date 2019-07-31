//manager/src/pages/task/index.js

import React, { Component } from 'react'
import { getAllTask , createTask, createStateTask, setTask, updateTask} from '../../redux/task/actions'
import {connect} from 'react-redux'
import {Paper, withStyles, Button, Fab} from '@material-ui/core'
import AddTask from './addTask'
import TaskCard from './taskCard'
import EditTask from './editTask'
import HistoryIcon from '@material-ui/icons/HistoryOutlined'

class Task extends Component {

  state = {
    reducer: "TASK",
    day: new Date().getTime(),
    id: null
  }

  componentDidMount(){
    this.props.getAllTask(`list?day=${this.state.day}`, "taskList");
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

  getPreviousTask = () => {
    // Add one day to timestamp
    var dateInMilisecond = 86400000
    this.setState({ day: this.state.day - dateInMilisecond })
    this.props.getAllTask(`list?day=${this.state.day - dateInMilisecond}`, "taskList");
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

    const { classes , createTask, isFetching, createStateTask, locale, newTask, listTask, status, itemToUpdate} = this.props;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const {id} = this.state

    return (
      <div className={classes.root}>
          {
            id === null ?
            <AddTask
              locale={ locale }
              disabled={isFetching}
              newData={newTask}
              createTaskState={ createStateTask }
              createTask={ createTask }
              isCreating={isFetching}
              status={status}
          />
          : <Button disabled variant="contained">{ locale.wording.progress }</Button>
          }

      <div style={{ textAlign: "center" }}>
        <Fab size="small" color="default" variant="extended" aria-label="previous" className={classes.margin}>
          <HistoryIcon onClick={ this.getPreviousTask } />&nbsp;
          { locale.subheading.previous_task }
        </Fab>

      </div>

      <div className={classes.step}>
      
      {
          listTask.map((label, index) => {
              return  <div id={label.date.date} key={index} onDrop={ (e) => {this.getDrop(e, label.date.due_date)  } } onDragOver={this.dragOver}>
                            <p className={classes.title}>
                              <span className={classes.span}></span>
                              <span className={classes.spanDate}>{new Date(label.date.date).toLocaleDateString(localStorage.getItem('locale'), options)}</span>
                            </p>

                            {
                              label.tasks.map((task, index) => {
                                  return  <Paper id={task._id} key={index} className={classes.paper} draggable={ id === null ? true : false } onDragStart={ (e) => { this.drag(e, task) }}>
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
                                                        isFetching={isFetching}
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

    paper: {
      padding: '10px 15px 10px 15px',
      position: 'relative',
      minHeight: 60,
      margin: "20px 0px 20px 20px",
      marginLeft: -20,
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        marginLeft: -20,
        marginBottom: 10,
        boxShadow: "none",
        borderRadius: 0
      },
    },
    step: {
      borderLeft: '1px solid #9e9e9e',
      marginLeft: 20,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 20,
      },
    },
    title: {
        color: theme.palette.caption
    },
    span: {
      height: '15px',
      marginRight: 10,
      width: '15px',
      marginLeft: -8,
      backgroundColor: theme.palette.primary.main,
      borderRadius: '50%',
      display: 'inline-block',
      textAlign: 'center'
    },
    spanDate: {
      marginTop: 10,
      fontWeight: 500,
      textTransform: "capitalize",
      color: theme.palette.primary.main
    },
    margin: {
      [theme.breakpoints.down("sm")]:{
        marginTop: 24,
        marginBottom: 20
      }
    }
})


const mapStateToProps = (state) => {

  return {
      isFetching: state.task.isFetching,
      listTask: state.task.taskList || [],
      itemToUpdate: state.task.item,
      locale: state.locale.locale,
      newTask: state.task.item || {},
      status: state.helper.items.status_task || [],
  }
}

const StyledTask = withStyles(styles)(Task)

export default connect(mapStateToProps, { createTask, getAllTask, createStateTask, setTask, updateTask })(StyledTask);
