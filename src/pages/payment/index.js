import React, { Component } from 'react'
import MyStoreCheckout from '../payment/MyStoreCheckout';
import {Paper, withStyles} from '@material-ui/core'



class Payment extends Component {

    state = {
        height: window.innerHeight
    }

    componentDidMount(){
        window.addEventListener("resize", this.changeHeight)
    }

    changeHeight = () => {
        this.setState({height: window.innerHeight})
    }

  render() {
      const {classes} = this.props
    return (
        <div className={classes.root} style={{height: this.state.height}}>
            <Paper>
                <MyStoreCheckout />
            </Paper>
        </div>

    )
  }
}

const styles = theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
    }
})

export default withStyles(styles)(Payment)