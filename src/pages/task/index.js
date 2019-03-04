//manager/src/pages/task/index.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createItem, getItemList, getItem, createState } from '../../redux/library/actions'
import {connect} from 'react-redux'
import {Paper, withStyles, Typography, Button} from '@material-ui/core'
import AddTask from './addTask'
class Task extends Component {

  state = {
    reducer: "TASK"
  }

  componentDidMount(){
    this.props.getItemList(this.state.reducer, `grouped-task`);
  }


  render() {

    const { classes , createItem, createState, isCreating, locale, newTask, listTask} = this.props;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
    return (
      <div className={classes.root}>

          <AddTask 
              locale={ locale }  
              newData={newTask} 
              createTaskState={ createState } 
              createTask={ createItem } 
              isCreating={isCreating}
          />

      <div className={classes.step}>

      {
          listTask.map((label, index) => {
              return  <React.Fragment key={index}>
                            <p className={classes.title}> 
                              <span className={classes.span}></span>
                              <span className={classes.spanDate}>{new Date(label.date.date).toLocaleDateString(localStorage.getItem('locale'), options)}</span>
                            </p>

                            {
                              label.tasks.map((task, index) => {
                                  return  <Paper key={index} className={classes.paper}>
                                              <Typography variant="subtitle1" className={classes.subtitle}>{task.subject}</Typography>
                                              <Typography variant="body1">
                                                {task.short_desc}
                                              </Typography>
                                          </Paper>
                              })
                            }
                           
                      </React.Fragment>
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
      // width: 250,
      padding: '5px 10px 5px 10px',
      margin: 20,
      marginLeft: -20
    },
    step: {
      borderLeft: '1px solid #9e9e9e',
      minHeight: 100,
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
      backgroundColor: 'blue',
      borderRadius: '50%',
      display: 'inline-block',
      textAlign: 'center'
    },
    spanDate: {
      marginTop: 10,
      textTransform: "capitalize"
    },
    subtitle: {
      textTransform: "capitalize"
    }
    
})


const mapStateToProps = (state) => {
  return {
      isFetching: state.library.task.isFetching,
      isCreating: state.library.task.isCreating,
      isError: state.library.task.isError,
      message: state.library.task.message,
      listTask: state.library.task.list || [],
      receivedAt: state.library.task.receivedAt,
      locale: state.locale.locale,
      newTask: state.library.task.tmp_state,
      task: state.library.task.item
  }
}

const StyledTask = withStyles(styles)(Task)

export default connect(mapStateToProps, { createItem, getItemList, getItem, createState  })(StyledTask);