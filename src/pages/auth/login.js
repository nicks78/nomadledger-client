import React, { Component } from 'react'
import {Link}  from 'react-router-dom'
import {connect} from 'react-redux'
import { authUser } from '../../redux/auth/actions'
import Paper from '@material-ui/core/Paper';
import ApxForm from '../../components/common/form'
import Spinner from '../../components/common/spinner'
import ApxAlert from '../../components/common/alert'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const styles = {
    root: {
        height: '100vh',
    },
    container: {
        display: 'flex',
        
        width: '50%',
        margin: '0 auto',
        alignItems: "center",
        justifyContent: "center",
        
    },

    paper: {
        marginTop: '40%',
        padding: 24,
    }
}

class Login extends Component {
    state = {
        login_email: 'nicolas@apx-dev.com',
        login_password: '0000'
    }

    handleLogin = name => event => {
        var fieldName = name;
        var value = event.target.value

        this.setState({[fieldName]: value })
    }


    logggedIn = () => {
        var data = {
            email: this.state.login_email,
            password: this.state.login_password
        }
        this.props.authUser(data)
    }

    render() {

        
    const {isError, locale, message, isFetching} = this.props
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
            <div style={styles.root}>
            {isError ? <ApxAlert message={message} />: null }
                <div style={ styles.container }>
                
                <Paper style={ styles.paper }>
                        <Typography variant="overline" style={{ alignText: 'center'}}>
                          { locale.wording.login}
                        </Typography>
                        {   isError ? <p> {locale.message[message]}</p> : null }
                        <ApxForm 
                            formField={formLogin.fields} 
                            formHandler={ this.handleLogin } 
                            locale={ locale } 
                            xs={12} 
                            md={12} 
                            objData={ this.state }/>

                        <Button variant="contained" color="secondary"  style={  styles.button } onClick={ this.logggedIn }>{ locale.wording.login }</Button>

                        <br />
                        <Link to="/forgot-password" >Forgot password ?</Link>
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



export default connect(mapStateToProps, { authUser })(Login);
