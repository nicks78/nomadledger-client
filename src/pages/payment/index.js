//src/pages/payment/index.js
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {DEFAULT_URL} from '../../redux/constant'
import MyStoreCheckout from '../payment/MyStoreCheckout';
import {Paper, withStyles, Typography} from '@material-ui/core'



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
      const {classes, locale } = this.props
    return (
        <div className={classes.root} style={{height: this.state.height}}>
            <Paper className={classes.paper}>
                <div>
                    <Typography className={classes.companyName} variant="h1" align="center">
                    <Link to="/"><img src={`${DEFAULT_URL}img/logo.png`} alt="logo" height="80" width="auto" /></Link><br />
                        <span>{locale.company_name}</span>
                    </Typography><br /> 
                </div>
                <MyStoreCheckout {...this.props}/>
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
    },
    paper: {
        padding: "20px",
        width: "50%",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            boxShadow: 'none'
        }
    },
    
})

const mapStateToProps =(state) => {
    return {
        locale: state.locale.locale,
    }
}

const StyledPayment = withStyles(styles)(Payment)

export default connect(mapStateToProps)(StyledPayment)
