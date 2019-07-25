import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {history} from './history'
import {connect} from 'react-redux'
import { getLocale, initLocale } from '../redux/locale/actions'
import { setNotification } from '../redux/notification/actions'
import { getLogout } from '../redux/auth/actions'
import PrivateRoute from './privateRoute'
// import CacheBuster from '../CacheBuster';

// Common
import SnackBar from '../lib/snackBar'

// Public Pages
import ContactUs from '../public_pages/contactUs'
import Quote from '../public_pages/quote'

// Login
import Auth from '../pages/auth'
import Login from '../pages/auth/login'
import ForgotPassword from '../pages/auth/forgotPassword'
import ResetPassword from '../pages/auth/resetPassword'
import ConfirmEmail from '../pages/auth/confirmEmail'
import Payment from '../pages/payment'

// Pages
import Home from '../pages/dashboard/home'

// Contact
import Contact from '../pages/contact'
import ShowContact from '../pages/contact/dashboard'

// Product
import Product from '../pages/product'
import ShowProduct from '../pages/product/showProduct'

// Service
import Service from '../pages/service'
import ShowService from '../pages/service/showService'

// Account
import Account from '../pages/account'

// Expense
import Expense from '../pages/expense'
import ShowExpense from '../pages/expense/showExpense'

// Task
import Task from '../pages/task'

// Email
import Email from '../pages/email'

// Book
import BookkeepingRoute from './bookkeeping'
import NotFound from './notFound'
import Layout from '../components/layout/layout'

// Archive
import Archive from '../pages/archive'

// Template
import Template from '../pages/template'

class Routes extends React.Component {

    state = {
      mountedAt: null
    }

    componentWillMount(){
        localStorage.setItem('locale', "fr")
    }

    componentDidMount(){
        if(this.props.authUser)
        this.props.initLocale(this.props.authUser.locale || "fr")
    }

    componentWillReceiveProps(nextProps){
        if(this.state.mountedAt === null && nextProps.authUser ){
            nextProps.initLocale(nextProps.authUser.locale || "fr");
            this.setState({ mountedAt: Date.now() })
        }
    }

    handleChangeLocale = (locale) => {
        this.props.getLocale(locale)
    }


    render(){

        const { isLoggedIn, locale, authUser, company, text, status, openSnack } = this.props
        return (

            <Router base history={history}>
                    <React.Fragment>
                        <h1>Test cached -0003</h1>
                        <SnackBar
                            text={text}
                            openSnack={ openSnack }
                            status={status}
                            locale={locale}/>
                        <Switch>
                        <Route exact path="/" component={Auth} />
                        <Route path="/login" component={Login} />
                        <Route exact path="/public" component={NotFound} />
                        <Route path="/public/confirm-email" component={ConfirmEmail} />
                        <Route path="/public/forgot-password" component={ForgotPassword} />
                        <Route path="/public/reset-password/:token" component={ResetPassword} />
                        <Route path="/public/payment-gateway/:token_id" component={Payment} />
                        <Route path="/public/contact-us" component={ContactUs} />
                        <Route path="/public/quote/:token" component={Quote} />

                        {
                            isLoggedIn && authUser !== null  ?
                            <Layout company={company} _onChangeLocale={this.handleChangeLocale} user={authUser} logout={this.props.getLogout} locale={locale}>

                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={ Home } auth={isLoggedIn}/>

                                <PrivateRoute exact path="/account" component={Account}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/contact" component={Contact}  auth={isLoggedIn}/>
                                <PrivateRoute path="/contact/view/:id" component={ShowContact}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/product" component={Product}  auth={isLoggedIn}/>
                                <PrivateRoute path="/product/view/:id" component={ShowProduct}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/service" component={Service}  auth={isLoggedIn}/>
                                <PrivateRoute path="/service/view/:id" component={ShowService}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/expense" component={Expense}  auth={isLoggedIn}/>
                                <PrivateRoute path="/expense/view/:id" component={ShowExpense}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/task" component={Task}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/archive" component={Archive}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/email-content" component={Email}  auth={isLoggedIn}/>

                                <PrivateRoute exact path="/template" component={Template}  auth={isLoggedIn}/>

                                <BookkeepingRoute isLoggedIn={isLoggedIn}/>

                              <PrivateRoute path="*" component={NotFound} auth={isLoggedIn}/>

                            </Switch>
                            </Layout>
                            :  null

                        }


                        <Route component={NotFound} />

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
        isFetching: state.account.user.isFetching,
        authUser: state.account.user.item,
        company: state.account.company.item || {},
        text: state.notification.text,
        openSnak: state.notification.openStack,
        status: state.notification.status

    }
}


export default connect(mapStateToProps, {getLocale, getLogout, initLocale, setNotification})(Routes);

// return <div style={{ textAlign: "center", marginTop: "20%" }}><Button variant="contained" color="primary" onClick={() => { window.location.reload(true) }}>{locale.wording.refresh}</Button></div> 