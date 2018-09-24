import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import { getLocale } from '../utils/locale/actions'


// Pages
import Home from '../pages/home'
import Client from '../pages/client'
import Product from '../pages/product'
import Service from '../pages/service'
import Expense from '../pages/expense'

// Component
import Layout from '../components/layout/layout'
class Routes extends React.Component {


    handleChangeLocale = (locale) => {
        this.props.getLocale(locale)
    }


    render(){

        return( <Router>
                    <Layout locale={this.props.locale} _onChangeLocale={this.handleChangeLocale}>   
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/clients" component={Client} />
                        <Route exact path="/products" component={Product} />
                        <Route exact path="/services" component={Service} />
                        <Route exact path="/expenses" component={Expense} />
                    </Layout>
                </Router>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locale: state.locale.locale
    }
}


export default connect(mapStateToProps, {getLocale})(Routes);