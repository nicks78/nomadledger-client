import React, { Component } from 'react'
import {API_ENDPOINT} from '../../redux/constant'
import {setNotification} from '../../redux/notification/actions'
import Spinner from '../../components/common/spinner'
import axios from 'axios'
import {connect} from 'react-redux'
import {history} from '../../routes/history'

class ValidateAccount extends Component {

    async componentDidMount(){
        var token = this.props.match.params.token;
        if(!token){

        }
        // Validate email
        try{
            await axios.get(`${API_ENDPOINT}public/confirm-account/${token}`)
            this.props.setNotification("success_can_login", "success")
            history.push("/login")
        }catch(err){
            this.props.setNotification("error_no_token_found", "error")
            history.push("/")
        }
    }


    render() {
        return <Spinner />
    }
}


export default connect(null, {setNotification})(ValidateAccount)

