import React, { Component } from 'react'
import {DEFAULT_URL} from '../../redux/constant'
import {Link}  from 'react-router-dom'
import {connect} from 'react-redux'
import { authUser } from '../../redux/auth/actions'
import {withStyles, Paper, Typography, Button} from '@material-ui/core'
import ApxForm from '../../components/common/form'
import Spinner from '../../components/common/spinner'


const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
    },

    paper: {
        width: '40%',
        margin: '0 auto',
        padding: 24,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            padding: 12,
            width: '100%',
            boxShadow: 'none',
            borderRadius: 0,

        }
    },
    button: {
        float: "right"
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


                <Paper className={ classes.paper }>
                <div>
                    <Typography className={classes.companyName} variant="h1" align="center">
                        <Link to="/"><img src={`${DEFAULT_URL}img/logo.png`} alt="logo" height="80" width="auto" /></Link><br />
                        <span>{locale.company_name}</span>
                    </Typography><br />
                </div>
                        <Typography variant="caption">
                          { locale.subheading.label_login}&nbsp;{locale.company_name}
                        </Typography>
                        {   isError ? <p> {locale.message[message]}</p> : null }
                        <form onSubmit={ this.onSubmitForm }>
                        <ApxForm
                            formField={formLogin.fields}
                            formHandler={ this.handleLogin }
                            locale={ locale }
                            xs={12}
                            md={12}
                            objData={ this.state }/>
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={  classes.button }
                            >
                            { locale.wording.login }
                        </Button>
                        </form>
                        <br />
                        <Link className={classes.link} to="/public/forgot-password" >{locale.subheading.link_forgot_pwd}</Link>
                </Paper>

            </div>
            </div>

        )
  }
}

const mapStateToProps = (state) => {

    return {
        message: state.auth.message,
        isError: state.auth.isError,
        isFetching: state.auth.isFetching,
        locale: state.locale.locale,
    }
}

const StyledLogin = withStyles(styles)(Login)

export default connect(mapStateToProps, { authUser })(StyledLogin);
