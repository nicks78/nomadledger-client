import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import {history} from './history'
import {connect} from 'react-redux'
import { getLocale, initLocale } from '../redux/locale/actions'
import { getLogout } from '../redux/auth/actions'
import PrivateRoute from './privateRoute'

// Common
import SnackBar from '../lib/snackBar'

// Public Pages
import ContactUs from '../public_pages/contactUs'

// Login
import Auth from '../pages/auth'
import Login from '../pages/auth/login'
import ForgotPassword from '../pages/auth/forgotPassword'
import ResetPassword from '../pages/auth/resetPassword'
import ConfirmEmail from '../pages/auth/confirmEmail'
import Payment from '../pages/payment'

// Pages
import Home from '../pages/dashboard/home'
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
import Archive from '../pages/archive'


// Book
import BookkeepingRoute from './bookkeeping'
import NotFound from './notFound'
import Layout from '../components/layout/layout'


class Routes extends React.Component {

    componentDidMount(){
        this.props.initLocale(this.props.company.locale || "fr")
    }

    handleChangeLocale = (locale) => {
        this.props.getLocale(locale)
    }


    render(){

        const { isLoggedIn, locale, authUser, company, text, status, openSnack } = this.props

        return (
            <Router history={history}>
                    <React.Fragment>
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

                        {
                            isLoggedIn && authUser !== null  ?
                            <Layout company={company} _onChangeLocale={this.handleChangeLocale} user={authUser} logout={this.props.getLogout} locale={locale}>

                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={ Home } auth={isLoggedIn}/>
                                <Route path="/dashboard/*" component={NotFound} />

                                <PrivateRoute exact path="/account" component={Account}  auth={isLoggedIn}/>
                                <Route path="/account/*" component={NotFound} />


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

                                <BookkeepingRoute isLoggedIn={isLoggedIn}/>


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
        isFetching: state.account.user.isFetching,
        authUser: state.account.user.item,
        company: state.account.company.item || {},
        text: state.notification.text,
        openSnak: state.notification.openStack,
        status: state.notification.status

    }
}


export default connect(mapStateToProps, {getLocale, getLogout, initLocale})(Routes);
