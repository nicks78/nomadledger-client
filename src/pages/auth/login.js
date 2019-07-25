import React, { Component } from 'react'
import {initLocale} from '../../redux/locale/actions'
import {Link}  from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './components/header'
import WrapForm from './components/wrapFrom'
import { authUser } from '../../redux/auth/actions'
import {withStyles, Typography, Button} from '@material-ui/core'
import ApxForm from '../../components/common/form'
import Spinner from '../../components/common/spinner'


class Login extends Component {
    state = {
        login_email: '',
        login_password: "",
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

    handleLogin = (e) => {
        var fieldName = e.target.name;
        var value = e.target.value

        this.setState({[fieldName]: value })
    }


    onSubmitForm = (e) => {
        e.preventDefault();
        var data = {
            email: this.state.login_email,
            password: this.state.login_password
        }
        this.props.authUser(data)
    }

    render() {


    const {isError, locale, message, isFetching, classes } = this.props
    const langue = localStorage.getItem("locale");
    const auth = parseInt(localStorage.getItem("auth") || 0, 10)

    const formLogin = {
            title: locale.subheading.add_contact,
            label: locale.subheading.label_company,
            fields: [
                  { name: 'login_email', type:"email", required: true },
                  { name: 'login_password', type:"password", required: true},
            ]
    }

    if(isFetching){
        return <Spinner/>
    }


        return (
            <div >

                <div className={ classes.container } style={{ height: this.state.height }}>
                  <div style={{position: "absolute", top: 10, right: 10}}>
                    <Button onClick={() => { this.props.initLocale(langue === "fr" ? "en" : "fr") }} color="primary" >{ langue === "fr" ? "FR" : "EN"}</Button>
                  </div>

                <WrapForm>
                    <Header locale={locale} />
                        <Typography variant="caption"  style={{marginBottom: 10}}>
                          { locale.subheading.label_login}&nbsp;<span dangerouslySetInnerHTML={{__html: locale.company_name}}></span>
                        </Typography>
                        {   isError ? <p> {locale.message[message]}</p> : null }
                        {
                            auth ? 
                            <div><br /><br /><Button fullWidth onClick={ () => {window.open("/dashboard", "_self")} } variant="contained" color="primary">{locale.wording.login}</Button></div>
                            : <form onSubmit={ this.onSubmitForm }>
                                <ApxForm
                                    formField={formLogin.fields}
                                    formHandler={ this.handleLogin }
                                    locale={ locale }
                                    xs={12}
                                    md={12}
                                    objData={ this.state }/>
                                
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className={  classes.button }
                                    >
                                    { locale.wording.login }
                                </Button>
                                </form>
                        }
                        <br />
                        {
                            auth ? 
                             <div  className={classes.link}>
                                <Link className="link" to="/public/forgot-password" >{locale.subheading.link_forgot_pwd}</Link>
                            </div>
                            : null 
                        }
                </WrapForm>

            </div>
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
        backgroundColor: theme.palette.yellow.dark,
        width: "100%",
        marginTop: 24
    },
    link: {
        clear: "right",
        marginTop: 15,
        float: 'right',
        '& span': {
            fontSize: "16 !important",
        }
    }
})

const mapStateToProps = (state) => {

    return {
        message: state.auth.message,
        isError: state.auth.isError,
        isFetching: state.auth.isFetching,
        locale: state.locale.locale
    }
}

const StyledLogin = withStyles(styles)(Login)

export default connect(mapStateToProps, { authUser, initLocale })(StyledLogin);
