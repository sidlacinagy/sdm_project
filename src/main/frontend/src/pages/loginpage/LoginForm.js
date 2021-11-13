import axios from "axios";
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {load, userToken} from '../../redux/userSlice'
import "./home.css"

export default function LoginForm() {

    const user = useSelector(userToken)
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        axios({
            'method': 'POST',
            'url': `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/login`,
            'data': {email: email, password: password}
        }).then((response) => {

            alert(response.data.token);
            dispatch(load(response.data.token));
            console.log(user);

        });
        event.preventDefault();
    }

    function pass(){
        document.getElementById("login-container").innerHTML =
            ("<div class='reset-pass-container'><div>" +
                "<form action='/home' method='post'>" +
                "<h1>Dear User!</h1>" +
                "<p>If you want to reset your password please add your email address below and click on the \"Send new password\" button</p>" +
                "<input type='text' name='email' placeholder='Email'>" +
                "<button type='submit' name='resetPassword' id='resetPassword'>Send new password!" +
                "</button>" +
                "</form></div><div class='back-button'><form action='/home'> " +
                "<button type='submit'>Back</button> </form></div></div>")
    }

    return (
        <form onSubmit={handleSubmit} method="POST">
            <input
                name="email"
                type="email"
                placeholder={"Email"}
                value={email}
                onChange={e => setEmail(e.target.value)}/>
            <br/>
            <input
                name="password"
                type="password"
                placeholder={"Password"}
                value={password}
                onChange={e => setPassword(e.target.value)}/>
            <a href="#" onClick={pass}>Forgot your password?</a>
            <button name="signIn">Sign In</button>
        </form>
    );

}