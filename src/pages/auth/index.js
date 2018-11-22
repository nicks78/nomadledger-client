//manager/src/pages/auth/index.js
import React, { Component } from 'react'
import { createStateUser, createUser } from './actions'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {ApxForm, ApxBanner, Spinner} from '../../components/common'


const styles = {
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
}

class Auth extends Component {

    state = {
        showLogin: true,
    }

    handleChange = name => event => {
        var fieldName = name;
        var value = event.target.value

        this.props.createStateUser( fieldName, value )
    }

    onSubmit = () => {
        this.props.createUser()
    }
    

    render() {
    
    const { locale, newUser, isFetching, isError, message } = this.props

    const form = {
          title: locale.form.title.add_contact, 
          label: locale.form.title.label_company,
          fields: [
                { name: 'company_name', type:"text", required: true },
                { name: 'email', type:"email", required: true },
                { name: 'password',type:"password", required: true},
            ]
        }
    
    return (
      <div style={ styles.container}>

        <ApxBanner />
        
        <div style={ styles.section_1 }>
            <Typography variant="headline" style={ styles.headline }>
                    TEXT D"INFORMATION COMPLEMENTAIRES
            </Typography>
            <Typography component="p" style={ styles.paragraphe }>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis ex voluptates numquam exercitationem libero ducimus omnis iusto sit veritatis, magnam doloribus adipisci ullam autem qui et alias! Dolor, quo saepe! Nobis ex voluptates numquam exercitationem libero ducimus omnis iusto sit veritatis, magnam doloribus adipisci ullam autem qui et alias! Dolor, quo saepe! Nobis ex voluptates numquam exercitationem libero ducimus omnis iusto sit veritatis, magnam doloribus adipisci ullam autem qui et alias! Dolor, quo saepe!
            </Typography>
        </div>
        
        <div style={ styles.section_3 }>
        { isError && <p> {locale.message[message]}</p> }
            {
                !isFetching ? 
                <Paper style={ styles.form }>
                    <Typography variant="headline">
                            Commencer gratuitement
                    </Typography>
                    <ApxForm 
                        formField={form.fields} 
                        formHandler={ this.handleChange } 
                        locale={ locale } 
                        xs={12} 
                        md={12} 
                        objData={ newUser }/>

                    <Button variant="contained" color="secondary"  style={  styles.button } onClick={ this.onSubmit }>{ locale.button.register }</Button>
                </Paper>
            : <Spinner />
            }
        </div>

        <div style={ styles.section_4 }>
            <Typography variant="headline" style={ styles.headline }>
                    PRICING
            </Typography>
            <Grid container spacing={16}>

                <Grid item xs={12} md={4}>
                    <Paper style={ styles.paper }>
                        <p>test</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper style={ styles.paper }>
                        <p>test</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper style={ styles.paper }>
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
    console.log("STATE", state.auth)
    return {
        isFetching: state.auth.isFetching,
        isError: state.auth.isError,
        message: state.auth.message,
        locale: state.locale.locale,
        newUser: state.auth.state_user,
    }
}



export default connect(mapStateToProps, {createStateUser, createUser})(Auth);