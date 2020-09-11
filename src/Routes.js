import React from 'react'
import { Switch } from 'react-router-dom'
import RouteHandler from './components/RouteHandler'

import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AdPage from './pages/AdPage'
import AddAd from './pages/AddAd'
import Ads from './pages/Ads'
import NotFound from './pages/NotFound'

export default () => {
    return (
        <Switch>
            <RouteHandler exact path="/" component={Home}/>

            <RouteHandler exact path="/about" component={About}/>

            <RouteHandler exact path="/signin" component={SignIn}/>

            <RouteHandler exact path="/signup" component={SignUp}/>

            <RouteHandler exact path="/ad/:id" component={AdPage}/>

            <RouteHandler private exact path="/post-an-ad" component={AddAd}/>

            <RouteHandler exact path="/ads" component={Ads}/>

            <RouteHandler>
                <NotFound/>
            </RouteHandler>
        </Switch>
    )
}