import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {LoginPage} from "./pages/loginpage/LoginPage";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {ProfileHome} from "./pages/profile/ProfileHome";
import "./pages/loginpage/home.scss";
import "./pages/dashboard/dashboard.scss";
import "./pages/profile/profile.scss";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/home" component={LoginPage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/profile_home" component={ProfileHome}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);