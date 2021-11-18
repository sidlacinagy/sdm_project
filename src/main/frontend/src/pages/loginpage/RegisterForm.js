import React, {useEffect, useState} from 'react';
import {getError, userRegister} from "../../api/apicalls";

export default function RegisterForm(props) {

    const [error, setError] = useState("");

    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    useEffect(() => {
        document.getElementById("error").innerHTML = error;
    }, [error])


    const handleSubmit = (event) => {
        userRegister({
            nickname: nickname,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            passwordConfirm: passwordConfirm
        }).then((response) => {
            setError(response.data);
        });
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} method="POST">
            <div id="error"/>
            <h1>Sign up</h1>
            <input
                name="email"
                type="email"
                placeholder={"Email"}
                value={email}
                onChange={e => setEmail(e.target.value)}/>
            <br/>
            <input
                name="nickName"
                type="text"
                placeholder={"Nickname"}
                value={nickname}
                onChange={e => setNickname(e.target.value)}/>
            <br/>
            <input
                name="firstName"
                type="text"
                placeholder={"First name"}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}/>
            <br/>
            <input
                name="lastName"
                type="text"
                placeholder={"Last name"}
                value={lastName}
                onChange={e => setLastName(e.target.value)}/>
            <br/>
            <input
                name="password"
                type="password"
                placeholder={"Password"}
                value={password}
                onChange={e => setPassword(e.target.value)}/>
            <br/>
            <input
                name="passwordConfirm"
                type="password"
                placeholder={"Confirm password"}
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}/>
            <button name="signUp">Sign Up</button>
        </form>

    );

}