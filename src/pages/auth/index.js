//manager/src/pages/auth/index.js
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { createStateUser, createUser } from '../../redux/auth/createActions'
import { resetUser } from '../../redux/auth/actions'
import {Typography, withStyles, Paper, Grid, Button} from '@material-ui/core';

import ApxForm from '../../components/common/form'
import Spinner from '../../components/common/spinner'




const styles = theme => ({
    appBar: {
        padding: 10,
        backgroundColor: theme.palette.secondary.main,
        overflow: "hidden"
    },
    jumbotron: {
        height: 500,
        backgroundColor: '#303030'
    },
    jumbotron_1: {
        float: 'left',
        width: '35%',
        position: "relative",
    },
    companyName: {
        color: "white",
        width: '100%'
    },
    img_01: {
        backgroundImage: "url(http://localhost:8080/img/background_1.jpg)",
        backgroundSize: 'cover',
        height: 350,
        width: "120%",
        zIndex: 9
    },
    img:{
        display: "inline-block",
        margin: "0 auto",
        verticalAlign: "middle"
    },
    jumbotron_2: {
        backgroundImage: 'url(http://localhost:8080/img/background_2.jpg)',
        backgroundSize: 'cover',
        height: 500,
        marginLeft: '30%',
    },
    container: {
        marginBottom: 100
    },
    headline: {
        color: '#ef6c00',
        textAlign: 'center'
    },
    paragraphe: {
        width: '70%',
        margin: '0 auto',
        marginTop: '4%',
        textAlign: 'center'
    },
    section_1: {
        padding: '4% 4% 0% 4%'
    },
    section_2: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '4%',
    },
    section_3: {
        display: 'flex',
        justifyContent: 'center',
        padding: '4%',
        margin: '0 auto'
    },
    form: {
        padding: '2%',
        width: '50%'
    },
    button: {
        color: 'white',
        float: 'right',
    },
    section_4: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '4%'  
    }
})

class Auth extends Component {

    state = {
        showLogin: true,
        openSnack: true
    }

    componentWillUnmount(){
        this.props.resetUser();
    }

    handleChange = (event) => {
        var fieldName = event.target.name;
        var value = event.target.value

        this.props.createStateUser( fieldName, value )
    }

    onSubmit = () => {
        this.props.createUser()
    }


    render() {
    
    const { classes, locale, newUser, isFetching, isError, message, isCreated } = this.props

    const form = {
          title: locale.wording.create, 
          label: locale.subheading.label_company,
          fields: [
                { name: 'company_name', type:"text", required: true },
                { name: 'email', type:"email", required: true },
                { name: 'password',type:"password", required: true},
            ]
    }

    
    return (
      <div className={ classes.container}>

      <div className={classes.appBar} >
            <Button 
                variant="contained" 
                color="primary"
                component={Link}
                to="/login"
                style={{
                    float: "right",
                    marginRight: 20,
                    color: "white"
                }}
                >
                Login
            </Button>
      </div>

      <div className={classes.jumbotron}>
            <div className={classes.jumbotron_1}>

            <div>
                 
                <Typography className={classes.companyName} variant="h3">
                    <img src="http://localhost:8080/img/logo.png" alt="logo" height="80" width="auto"  className={classes.img}/>
                    <span>NOMAD LEDGER</span>
                </Typography>
            </div>

                <div className={ classes.img_01 }>
                </div>
               
            </div>
            <div className={classes.jumbotron_2}>

            </div>
    </div>

        
        <div className={ classes.section_1 }>
            <Typography variant="overline" className={ classes.headline }>
                    TEXT D"INFORMATION COMPLEMENTAIRES
            </Typography>
            <Typography component="p" className={ classes.paragraphe }>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis ex voluptates numquam exercitationem libero ducimus omnis iusto sit veritatis, magnam doloribus adipisci ullam autem qui et alias! Dolor, quo saepe! Nobis ex voluptates numquam exercitationem libero ducimus omnis iusto sit veritatis, magnam doloribus adipisci ullam autem qui et alias! Dolor, quo saepe! Nobis ex voluptates numquam exercitationem libero ducimus omnis iusto sit veritatis, magnam doloribus adipisci ullam autem qui et alias! Dolor, quo saepe!
            </Typography>
        </div>

        <div>
        {   isError ? <p> {locale.message[message]}</p> : null }
        {   isCreated ? <p>{locale.message[message]}</p> : null }
        </div>
        
        <div className={ classes.section_3 }>
        <Link to="/login">Login</Link>
            {
                !isFetching ? 
                <Paper className={ classes.form }>
                    <Typography variant="overline">
                            Commencer gratuitement
                    </Typography>
                    <ApxForm 
                        formField={form.fields} 
                        formHandler={ this.handleChange } 
                        locale={ locale } 
                        xs={12} 
                        md={12} 
                        objData={ newUser }/>

                    <Button variant="contained" color="secondary"  className={  classes.button } onClick={ this.onSubmit }>{ locale.wording.register }</Button>
                </Paper>
            : <Spinner />
            }
        </div>



        <div className={ classes.section_4 }>
            <Typography variant="overline" className={ classes.headline }>
                    PRICING
            </Typography>
            <Grid container spacing={16}>

                <Grid item xs={12} md={4}>
                    <Paper className={ classes.paper }>
                        <p>test</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={ classes.paper }>
                        <p>test</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={ classes.paper }>
                        <p>test</p>
                    </Paper>
                </Grid>

            </Grid>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {

    return {
        isFetching: state.auth.isFetching,
        isError: state.auth.isError,
        message: state.auth.message,
        locale: state.locale.locale,
        newUser: state.auth.state_user,
        isCreated: state.auth.isCreated
    }
}


const StyledAuth = withStyles(styles)(Auth)


export default connect(mapStateToProps, {createStateUser, createUser, resetUser})(StyledAuth);