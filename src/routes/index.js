import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import {history} from './history'
import {connect} from 'react-redux'
import { getLocale, initLocale } from '../redux/locale/actions'
import { getLogout } from '../redux/auth/actions'
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
import ShowExpense from '../pages/expense/showExpense'
import Task from '../pages/task'


// Book
import BookkeepingRoute from './bookkeeping'
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
     
        const { isLoggedIn, locale, authUser } = this.props

        return (
            <Router basename="/" history={history}>
                    <React.Fragment>
                    
                        <Switch>
                        <Route exact path="/" component={Auth} />
                        <Route path="/login" component={Login} />
                        
                        { isLoggedIn && authUser !== null ? 
                            <Layout _onChangeLocale={this.handleChangeLocale} user={authUser} logout={this.props.getLogout} locale={locale}>
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

                                <BookkeepingRoute isLoggedIn={isLoggedIn}/>

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
        isLoggedIn: state.auth.isLoggedIn,
        authUser: state.account.user.item
           
    }
}


export default connect(mapStateToProps, {getLocale, getLogout, initLocale})(Routes);