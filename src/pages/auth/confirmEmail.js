//src/pages/auth/confirmEmail.js
import React, { Component } from 'react'
import {initLocale} from '../../redux/locale/actions'
import {connect} from 'react-redux'
import Header from './components/header'
import WrapForm from './components/wrapFrom'
import {confirmEmail} from '../../redux/auth/actions'
import {setNotification} from '../../redux/notification/actions'
import {TextField, withStyles, Typography, Button } from '@material-ui/core'

class ConfirmEmail extends Component {

    state = {
        email: "email",
        height: window.innerHeight
    }

    componentDidMount(){
        window.addEventListener("resize", this.changeHeight )
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.changeHeight);
    }

    changeHeight = () => {
        this.setState({
            height: window.innerHeight
        })
    }

    onSubmitForm = (e) =>{
        e.preventDefault()
        this.props.confirmEmail(this.state.email)
    }


    render() {

    const {classes, locale, isFetching} = this.props
    const langue = localStorage.getItem("locale")

    return (
      <div className={classes.container} style={{height: this.state.height}}>
        <div style={{position: "absolute", top: 10, right: 10}}>
          <Button onClick={() => { this.props.initLocale(langue === "fr" ? "en" : "fr") }} color="primary" >{ langue === "fr" ? "FR" : "EN"}</Button>
        </div>
            <WrapForm>
            <Header locale={locale} />
            <Typography variant="caption">
                { locale.subheading.label_confirm_email }
            </Typography>

            <form onSubmit={(e) => { this.onSubmitForm(e) }}>
                <TextField
                    name="email"
                    label={locale.wording.email}
                    type="email"
                    fullWidth
                    required
                    margin="dense"
                    onChange={ (e) => { this.setState({[e.target.name]: e.target.value }) } }
                    variant="outlined"
                /><br /><br />
                <Button
                    type="submit"
                    color="primary"
                    disabled={isFetching ? true : false }
                    className={classes.button}
                    variant="contained">{ isFetching ? locale.wording.loading : locale.wording.send_link_confirm  }</Button>
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
        float: 'right',
        width: "100%",
        marginTop: 24
    }
})

const mapStateToProps =(state) => {
    return {
        locale: state.locale.locale,
        isFetching: state.auth.isFetching
    }
}

const StyledConfirmEmail = withStyles(styles)(ConfirmEmail)

export default connect(mapStateToProps, {confirmEmail, setNotification, initLocale})(StyledConfirmEmail)
