//src/pages/auth/resetPassword.js
import React, { Component } from 'react'
import { API_ENDPOINT} from '../redux/constant'
import axios from 'axios'
import {connect} from 'react-redux'
import Header from '../pages/auth/components/header'
import WrapForm from '../pages/auth/components/wrapFrom'
import {setNotification} from '../redux/notification/actions'
import {TextField, withStyles, Typography, Button, Paper } from '@material-ui/core'

class ContactUs extends Component {

    state = {
        email: "",
        subject: "",
        message: "",
        loading: false,
        height: window.innerHeight
    }

    componentDidMount(){
        window.addEventListener("resize", this.changeHeight )
    }

    changeHeight = () => {
        this.setState({
            height: window.innerHeight
        })
    }

    onSubmitForm = (e) =>{
        e.preventDefault();
        this.setState({loading: true})
        var data = this.state
        var that = this
        if(data.email !== "" && data.message !== ""){
            axios.post(`${API_ENDPOINT}public/contact-us`,
            {
                data,
                mode: 'cors',
            },
            { headers: {
                'Content-Type': 'application/json',
            }
            })
            .then(function (response) {
                return response.data
            })
            .then( res => {
                that.setState({
                    email: "",
                    subject: "",
                    message: "",
                    loading: false
                })
                that.props.setNotification(res.message, "success")
            })
            .catch(function (error) {
                that.setState({ loading: false })
                that.props.setNotification("error_email_not_sent", "error")
            })
        }
    }


    render() {

        const {classes, locale } = this.props
        const {loading, email, message, subject} = this.state
    return (
      <div className={classes.container} style={{height: this.state.height}}>

            <WrapForm>
            <Header locale={locale} />
            <Typography variant="caption">
                { locale.subheading.label_contact_us }
            </Typography>

            <form onSubmit={ this.onSubmitForm }>
                <TextField
                    name="email"
                    label={locale.wording.email}
                    type="email"
                    fullWidth
                    value={email}
                    required
                    margin="dense"
                    onChange={ (e) => { this.setState({[e.target.name]: e.target.value }) } }
                    variant="outlined"
                />
                <TextField
                    name="subject"
                    label={locale.wording.subject}
                    type="text"
                    value={subject}
                    inputProps={{ maxLength: 30 }}
                    fullWidth
                    required
                    margin="dense"
                    onChange={ (e) => { this.setState({[e.target.name]: e.target.value }) } }
                    variant="outlined"
                />
                <TextField
                    name="message"
                    label={locale.helperText.type_message}
                    type="text"
                    fullWidth
                    value={message}
                    rows={4}
                    multiline
                    required
                    margin="dense"
                    onChange={ (e) => { this.setState({[e.target.name]: e.target.value }) } }
                    variant="outlined"
                />
                <Button
                    type="submit"
                    color="primary"

                    disabled={ loading }
                    className={classes.button}
                    variant="contained">{ loading ? locale.wording.loading :  locale.wording.send  }</Button>
            </form>

            </WrapForm>

      </div>
    )
  }
}

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        marginTop: 24,
        backgroundColor: theme.palette.yellow.dark,
        width: "100%"
    }
})

const mapStateToProps =(state) => {
    return {
        locale: state.locale.locale,
        isFetching: state.auth.isFetching
    }
}

const StyledContactUs = withStyles(styles)(ContactUs)

export default connect(mapStateToProps, { setNotification})(StyledContactUs)
