//src/pages/task/statusTask.js

import React, { Component } from 'react'
import {connect} from "react-redux"
import {withStyles, Menu, MenuItem} from '@material-ui/core'
import { updateStatus } from '../../redux/task/actions'


class StatusTask extends Component {

    state = {
        anchorEl: null
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleAction = (status, id) => {
          var task = {
              _id: id, 
              status: status
          }
        this.setState({ anchorEl: null });
          this.props.updateStatus(task, "dailyTask")
    }


  render() {

    const { classes, task, status } = this.props;
    const {anchorEl} = this.state;

    return (
        <div>
        <button
            id={task._id}
            className={ classes.status } 
            style={{ backgroundColor: task.status.color,}} 
            onClick={this.handleClick}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
        >
        {task.status.fr}
        </button>
        
        <Menu
            id={Date.now()}
            anchorEl={anchorEl }
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            style={{maxHeight: 400}}
            >
            {
                status.map(( status, index) => {
                    return <MenuItem 
                            key={index} 
                            style={{textTransform: 'capitalize', color: status.color || "#303030"}}
                            onClick={ () => this.handleAction( status, task._id ) }>{status[localStorage.getItem('locale')]}
                        </MenuItem>
                })
            }
            </Menu>
    </div>
    )
  }
}

const styles = theme => ({

    status: {
        borderRadius: 4, 
        border: 'none',
        color: "white", 
        padding: "1px 3px 1px 3px", 
        float: "right",
        bottom: 5, 
        right: 5, 
        fontSize: 11, 
        minWidth: 60, 
        textAlign: 'center',
        cursor: 'pointer'
    }
})


const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
        status: state.helper.items.status_task
    }
}


const StyledStatusTask = withStyles(styles)(StatusTask)

export default connect(mapStateToProps, {updateStatus})(StyledStatusTask)