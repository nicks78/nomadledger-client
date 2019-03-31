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


import Refund from '../pages/bookkeeping/refund'
import CreateRefund from '../pages/bookkeeping/refund/create'
import EditRefund from '../pages/bookkeeping/refund/edit'


const BookkeepingRoute = (props) => {

    const {isLoggedIn} = props;

    return (
        <div>
            <PrivateRoute exact path="/quote" component={Quote}  auth={isLoggedIn}/>
            <PrivateRoute path="/quote/create" component={CreateQuote}  auth={isLoggedIn}/>
            <PrivateRoute path="/quote/edit/:id" component={EditQuote}  auth={isLoggedIn}/>
            <PrivateRoute path="/quote/view/:id" component={ViewQuote}  auth={isLoggedIn}/>


            <PrivateRoute exact path="/invoice" component={Invoice}  auth={isLoggedIn}/>
            <PrivateRoute path="/invoice/create/:id?" component={CreateInvoice}  auth={isLoggedIn}/>
            <PrivateRoute path="/invoice/edit/:id" component={EditInvoice}  auth={isLoggedIn}/>



            <PrivateRoute exact path="/refund" component={Refund}  auth={isLoggedIn}/>
            <PrivateRoute path="/refund/create/:id?" component={CreateRefund}  auth={isLoggedIn}/>
            <PrivateRoute path="/refund/edit/:id" component={EditRefund}  auth={isLoggedIn}/>

        </div>
    )
}

export default BookkeepingRoute
