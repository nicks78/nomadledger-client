//manager/src/routes/bookkeeping.js

import React from 'react'
import PrivateRoute from './privateRoute'


import Quote from '../pages/bookkeeping/quote'
import EditQuote from '../pages/bookkeeping/quote/edit'
import CreateQuote from '../pages/bookkeeping/quote/create'
import ViewQuote from '../pages/bookkeeping/quote/view'

import Invoice from '../pages/bookkeeping/invoice'
import CreateInvoice from '../pages/bookkeeping/invoice/create'
import EditInvoice from '../pages/bookkeeping/invoice/edit'


import Payback from '../pages/bookkeeping/payback'


const BookkeepingRoute = (props) => {

    const {isLoggedIn} = props;

    return (
        <div>
            <PrivateRoute exact path="/bookkeeping/quote" component={Quote}  auth={isLoggedIn}/>
            <PrivateRoute path="/bookkeeping/quote/create" component={CreateQuote}  auth={isLoggedIn}/>
            <PrivateRoute path="/bookkeeping/quote/edit/:id" component={EditQuote}  auth={isLoggedIn}/>
            <PrivateRoute path="/bookkeeping/quote/view/:id" component={ViewQuote}  auth={isLoggedIn}/>


            <PrivateRoute exact path="/bookkeeping/invoice" component={Invoice}  auth={isLoggedIn}/>
            <PrivateRoute path="/bookkeeping/invoice/create" component={CreateInvoice}  auth={isLoggedIn}/>
            <PrivateRoute path="/bookkeeping/invoice/edit/:id" component={EditInvoice}  auth={isLoggedIn}/>



            <PrivateRoute exact path="/bookkeeping/payback" component={Payback}  auth={isLoggedIn}/>

        </div>
    )
}

export default BookkeepingRoute
