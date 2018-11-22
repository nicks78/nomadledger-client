import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import { getLocale } from '../utils/locale/actions'

// Login
import Auth from '../pages/auth'


// Pages
import Home from '../pages/home'
import Contact from '../pages/contact'
import ShowContact from '../pages/contact/dashboard'
import Account from '../pages/account'
import Product from '../pages/product'
import Service from '../pages/service'
import Expense from '../pages/expense'
import NotFound from './notFount'

// Component
import Layout from '../components/layout/layout'
class Routes extends React.Component {


    handleChangeLocale = (locale) => {
        this.props.getLocale(locale)
    }

    renderLoginPage = () => {
        return <Auth />
    }

    renderHomePage = () => {
        return( <BrowserRouter basename="/">
                    <Switch>
                    <Layout locale={this.props.locale} _onChangeLocale={this.handleChangeLocale}>   
                        <Route path="/home" component={Home} />
                        <Route path="/account" component={Account} />
                        <Route exact path="/contact" component={Contact} />
                        <Route path="/contact/view/:id" component={ShowContact} />
                        <Route path="/product" component={Product} />
                        <Route path="/service" component={Service} />
                        <Route path="/expense" component={Expense} />
                        {/* <Route path="*" component={NotFound} /> */}
                    </Layout>
                    
                    </Switch>
                    
                </BrowserRouter>
        )
    }


    render(){
        
        if(!this.props.auth){
            return this.renderHomePage();
        }else{
            return this.renderLoginPage();
        }
    }
}

const mapStateToProps = (state) => {
    return {
        locale: state.locale.locale,
        auth: state.auth.isLoggedIn
    }
}


export default connect(mapStateToProps, {getLocale})(Routes);