//src/pages/auth/confirmEmail.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import {setNotification} from '../../redux/notifications/actions'
import { initLocale } from '../../utils/locale/actions'
import axios from 'axios'
import {API_ENDPOINT} from '../../utils/constant'
import {withStyles, Paper, TextField, Typography, Button} from "@material-ui/core"
import {ApxButtonPositive} from  '../../components/common/buttonPositive'
import {history} from '../../routes/history'
import Logo from '../../logo.png';

const text =  {
  fr: {
      header: "Activer mon compte",
      success: "Compte validé.<br /> Bonnes ventes !",
  },
  en: {
    header: "Activate my account",
    success: "Account validated. <br />Good sales !",
  }
}



class ConfirmEmail extends Component {

    state = {
        height: window.innerHeight,
        confirm_password: "",
        password: "",
        isError: false,
        loading: false,
        message: "",
        token: ""
    }



    componentDidMount = async () => {
      const searchParams = queryString.parse(this.props.location.search);
      var locale = searchParams.locale ? searchParams.locale : "fr";
      var token = searchParams.token ? searchParams.token : "";
      localStorage.setItem('locale', locale);
      this.props.initLocale(locale);

      this.setState({ loading: true , token: token});

      try{
        await axios.get(`${API_ENDPOINT}auth/activate-account?token=${token}&locale=${localStorage.getItem('locale')}`)
        this.setState({
          loading: false
        })
      }catch(err){
        this.props.setNotification(err.response.data.message, "error")
        this.setState({ loading: false })
      }
      window.addEventListener("resize", this.changeHeight)
    }

    changeHeight = () => {
        this.setState({
            height: window.innerHeight
        })
    }

     sendPassword = async (e) => {
        e.preventDefault();
        this.setState({loading: true })
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm;
        var checkPw = new RegExp(regex);

        if(this.state.password !== this.state.confirm_password){
            this.setState({loading: false })
            this.props.setNotification( this.props.locale.message.password_not_match, "error");
            return
        }
        if(checkPw.test(this.state.password)){

          try{
            await axios.post(`${API_ENDPOINT}auth/activate-account?token=${this.state.token}&locale=${localStorage.getItem('locale')}`,  {
              password: this.state.password,
              confirm_password: this.state.confirm_password
            })

            this.setState({ loading: false })
            this.props.setNotification(text[localStorage.getItem("locale")].success, "success")
            history.push("/");
          }catch(err){
            this.props.setNotification(err.response.data.message, "error")
            this.setState({ loading: false })
          }
        }else{
          this.setState({loading: false });
          this.props.setNotification( this.props.locale.message.password_requirement, "error");
        }

    }



    render() {

        const { classes, locale } = this.props
        const {isError, loading} = this.state
        return (
            <div>
              <Button style={{position: "absolute", top: 10, right: 5}} color="secondary" onClick={ () => { this.props.initLocale(locale.lang === 'fr' ? 'en' : 'fr') } }>{locale.lang === 'fr' ? 'FR' : 'EN' }</Button>

            <div className={classes.logoWrap}>
                <Link to="/"><img src={Logo} alt="logo" width="270" /></Link>
            </div>
            <div className={classes.wrap}>

                <Paper className={classes.paper}>
                    <Typography variant="h3" align="center">{text[localStorage.getItem("locale")].header }</Typography><br />
                    <Typography variant="body2" align="center">{locale.message.password_requirement}</Typography>
                    <br />
                    {
                      isError ?
                      <Typography variant="body2" className={  classes.error } align="center">{this.state.message}</Typography>
                      : null
                    }

                    <form className="loginform" onSubmit={this.sendPassword }>
                        <TextField
                            label={locale.form.password}
                            name="password"
                            type="password"
                            required
                            margin="dense"
                            value={ this.state.password || ""}
                            onChange={(e) => { this.setState({ [e.target.name]: e.target.value }) }}
                            variant="outlined"
                            fullWidth

                        />
                        <TextField
                            label={locale.form.confirm_password}
                            name="confirm_password"
                            type="password"
                            required
                            margin="dense"
                            value={ this.state.confirm_password || ""}
                            onChange={(e) => { this.setState({ [e.target.name]: e.target.value }) }}
                            variant="outlined"
                            fullWidth

                        />
                      <div style={{textAlign: "center", marginBottom: 12}}>
                        <ApxButtonPositive
                            label={ loading ? locale.button.loading : locale.button.send }
                            disabled={loading}
                            type="submit"
                            styled={{ width: 150 }}
                        />
                      </div>

                      <Typography variant="body2" align="center"><a href="mailto:contact@acerola-team.com">contact@acerola-team.com</a></Typography>

                    </form>
                </Paper>
            </div>
        </div>
        )
    }
}

const styles = theme => ({
    wrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        margin: "0 auto",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        },

    },
    paper: {
        padding: 24,
        [theme.breakpoints.down('sm')]: {
            boxShadow: 'none'
        },
    },
    buttonWrapper: {
        marginTop: 12,
        float: 'right'
    },
    logoWrap: {
        textAlign: 'center',
        paddingTop: "8%",
        height: 'auto',
        marginBottom: 24
    },
    success: {
      backgroundColor: "green",
      color: "white",
      padding: 12,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 4
    },
    error: {
        backgroundColor: "red",
        color: "white",
        padding: 12,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 4
    }
})


const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
    }
}

const StyledConfirmEmail = withStyles(styles)(ConfirmEmail);

export default  connect(mapStateToProps, {setNotification, initLocale})(StyledConfirmEmail)
