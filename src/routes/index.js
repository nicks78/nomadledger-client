import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import {history} from './history'
import {connect} from 'react-redux'
import { getLocale, initLocale } from '../utils/locale/actions'
import { getLogout } from '../pages/auth/actions'
import PrivateRoute from './privateRoute'

// Login
import Auth from '../pages/auth'
import Login from '../pages/auth/login'

// Pages
import Home from '../pages/home'
import Contact from '../pages/contact'
import ShowContact from '../pages/contact/dashboard'
import Account from '../pages/account'
import Product from '../pages/product'
import Service from '../pages/service'
import ShowService from '../pages/service/showService'
import Expense from '../pages/expense'

import NotFound from './notFound'
import Layout from '../components/layout/layout'

class Routes extends React.Component {

    componentDidMount(){
        this.props.initLocale('fr')
    }


    handleChangeLocale = (locale) => {
        this.props.getLocale(locale)
    }


    render(){
     
        const { isLoggedIn, locale } = this.props

        return (
            <Router basename="/" history={history}>
                    <React.Fragment>
                        <Switch>
                        <Route exact path="/" component={Auth} />
                        <Route exact path="/login" component={Login} />
                        
                        { isLoggedIn ? 
                            <Layout _onChangeLocale={this.handleChangeLocale} logout={this.props.getLogout} locale={locale}>
                            <Switch>
                                <PrivateRoute path="/home" component={ Home } auth={isLoggedIn}/>
                                <PrivateRoute path="/account" component={Account}  auth={isLoggedIn}/>
                                <PrivateRoute exact path="/contact" component={Contact}  auth={isLoggedIn}/>
                                <PrivateRoute path="/contact/view/:id" component={ShowContact}  auth={isLoggedIn}/>
                                <PrivateRoute path="/product" component={Product}  auth={isLoggedIn}/>
                                <PrivateRoute exact path="/service" component={Service}  auth={isLoggedIn}/>
                                <PrivateRoute path="/service/view/:id" component={ShowService}  auth={isLoggedIn}/>
                                <PrivateRoute path="/expense" component={Expense}  auth={isLoggedIn}/>
                                <PrivateRoute path="*" component={NotFound}  auth={isLoggedIn}/>
                            </Switch>
                            </Layout>
                            : null
                        }
                        <Route path="*" component={NotFound} />
                    </Switch>
                </React.Fragment>
            </Router>
       )
    }
}

const mapStateToProps = (state) => {
    return {
        locale: state.locale.locale,
        isLoggedIn: state.auth.isLoggedIn   
    }
}


export default connect(mapStateToProps, {getLocale, getLogout, initLocale})(Routes);