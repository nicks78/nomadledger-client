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
import ShowProduct from '../pages/product/showProduct'
import Service from '../pages/service'
import ShowService from '../pages/service/showService'
import Expense from '../pages/expense'
import ShowExpense from '../pages/expense'
import Task from '../pages/task'
import Quote from '../pages/bookkeeping/quote'
import EditQuote from '../pages/bookkeeping/quote/edit'
import CreateQuote from '../pages/bookkeeping/quote/create'
import ViewQuote from '../pages/bookkeeping/quote/view'
import Invoice from '../pages/bookkeeping/invoice'
import Payback from '../pages/bookkeeping/payback'

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
                        <Route path="/login" component={Login} />
                        
                        { isLoggedIn ? 
                            <Layout _onChangeLocale={this.handleChangeLocale} logout={this.props.getLogout} locale={locale}>
                            <Switch>
                                <PrivateRoute path="/home" component={ Home } auth={isLoggedIn}/>
                                <PrivateRoute path="/account" component={Account}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/contact" component={Contact}  auth={isLoggedIn}/>
                                <PrivateRoute path="/contact/view/:id" component={ShowContact}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/product" component={Product}  auth={isLoggedIn}/>
                                <PrivateRoute path="/product/view/:id" component={ShowProduct}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/service" component={Service}  auth={isLoggedIn}/>
                                <PrivateRoute path="/service/view/:id" component={ShowService}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/expense" component={Expense}  auth={isLoggedIn}/>
                                <PrivateRoute path="/expense/view/:id" component={ShowExpense}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/task" component={Task}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/bookkeeping/quote" component={Quote}  auth={isLoggedIn}/>
                                <PrivateRoute path="/bookkeeping/quote/add" component={CreateQuote}  auth={isLoggedIn}/>
                                <PrivateRoute path="/bookkeeping/quote/edit/:id" component={EditQuote}  auth={isLoggedIn}/>
                                <PrivateRoute path="/bookkeeping/quote/view/:id" component={ViewQuote}  auth={isLoggedIn}/>


                                <PrivateRoute exact path="/bookkeeping/invoice" component={Invoice}  auth={isLoggedIn}/>
                                <PrivateRoute exact path="/bookkeeping/payback" component={Payback}  auth={isLoggedIn}/>


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