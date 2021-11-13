import axios from "axios";
import React, {useState} from 'react';
import "./home.css"

export default function RegisterForm() {

    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");


    const handleSubmit = (event) => {
        axios({
            'method': 'POST',
            'url': `${process.env.hostUrl || 'http://localhost:8080'}/api/register`,
            'data': {nickName: nickName, email: email, firstName: firstName, lastName: lastName, password: password, passwordConfirm: passwordConfirm}
        }).then((response) => {

            alert(response.status);
            console.log(response.data);

        });
        event.preventDefault();
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
                    name="nickName"
                    type="text"
                    placeholder={"Nickname"}
                    value={nickName}
                    onChange={e => setNickName(e.target.value)}/>
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