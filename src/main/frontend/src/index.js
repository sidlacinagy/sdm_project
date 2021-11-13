import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from "./pages/loginpage/LoginForm";
import store from './redux/store'
import "./pages/loginpage/home.css"
import { Provider } from 'react-redux'
import RegisterForm from "./pages/loginpage/RegisterForm";

ReactDOM.render(
    <Provider store={store}>
        <LoginForm />
    </Provider>,
    document.getElementById("login-container")
);
ReactDOM.render(
    <RegisterForm />,
    document.getElementById("register-container")
);