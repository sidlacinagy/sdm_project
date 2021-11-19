import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {load} from '../../redux/UserSlice';
import {userLogin} from "../../api/apicalls";

export default function LoginForm(props) {

    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        userLogin({email: email, password: password}).then((response) => {
            dispatch(load(response.data.token));
            if (response.data.token === undefined) {
                setError("Unsuccesful login!");
            } else {
                props.data.history.push("/dashboard");
            }
        });
        event.preventDefault();
    }

    useEffect(() => {
        document.getElementById("error1").innerHTML = error;
    }, [error])

    function pass() {
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
            <div id="error1"/>
            <h1>Sign in</h1>
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