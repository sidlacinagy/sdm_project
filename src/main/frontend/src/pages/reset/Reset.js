import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {reset} from "../../api/apicalls";

export function Reset(props) {

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [token, setToken] = useState(new URLSearchParams(window.location.search).get("token"));
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        reset({token: token, password: password, password_confirm: passwordConfirm}).then((response) => {
            if (response.data !== "Successfully changed password") {
                setError(response.data);
            } else {
                alert(response.data);
                props.history.push("/home");
            }

        });
        event.preventDefault();
    }

    useEffect(() => {
        document.getElementById("error").innerHTML = error;
    }, [error])

    return (
        <div className="reset">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>Reset your password</title>
            </Helmet>
            <div id="body">
                <form onSubmit={handleSubmit} method="POST">
                    <div id="error"/>
                    <h1>Reset your password</h1>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}/>
                    <input
                        name="password_confirm"
                        type="password"
                        value={passwordConfirm}
                        placeholder="Confirm Password"
                        onChange={e => setPasswordConfirm(e.target.value)}/>
                    <button name="signIn">Reset</button>
                </form>
            </div>
        </div>
    );

}