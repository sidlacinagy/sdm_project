import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import {Provider} from 'react-redux'
import  {BrowserRouter, Route, Switch,Redirect} from "react-router-dom";
import {LoginPage} from "./pages/loginpage/LoginPage";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {ProfileHome} from "./pages/profile/ProfileHome";
import {MoviePage} from "./pages/movie/MoviePage";
import "./pages/loginpage/home.scss";
import "./pages/dashboard/dashboard.scss";
import "./pages/profile/profile.scss";
import "./pages/movie/movie.scss";
import {SearchResult} from "./pages/searchresult/SearchResult";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/home" component={LoginPage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/profile_home" component={ProfileHome}/>
                <Route exact path="/movie" component={MoviePage}/>
                <Route exact path="/search" component={SearchResult}/>
                <Redirect from="/" to="/home" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);