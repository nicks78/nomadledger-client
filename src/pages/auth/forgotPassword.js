//src/pages/auth/forgotPassword.js
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {TextField, withStyles, Typography, Button, Paper } from '@material-ui/core'

class ForgotPassword extends Component {
    render() {
    
        const {classes, locale} = this.props

    return (
      <div className={classes.root}>
            
            <Paper className={classes.paper}>
            <Typography variant="h3" align="center">Change your password </Typography>
            <form onSubmit={(e) => { console.log(e) }}>
                <TextField 
                    name="email"
                    label={locale.wording.email}
                    type="email"
                    onChange={ (e) => { this.setState({[e.target.name]: e.target.value }) } }
                    variant="filled"
                /><br />
                <Button type="submit" color="primary" variant="contained">Send</Button>
            </form>

            </Paper>

      </div>
    )
  }
}

const styles = theme => ({
    root: {
        height: "10em",
        position: "relative" 
    } ,             /* 1 */
   paper: {
       margin: '0 auto',
       width: "50%",
       padding: 24
   }
})

const mapStateToProps =(state) => {
    return {
        locale: state.locale.locale
    }
}

const StyledForgotPassword = withStyles(styles)(ForgotPassword)

export default connect(mapStateToProps)(StyledForgotPassword)