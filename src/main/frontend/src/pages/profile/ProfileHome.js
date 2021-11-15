import {useDispatch, useSelector} from "react-redux";
import {unload, userToken} from "../../redux/UserSlice";
import React, {useState} from "react";
import {fetchUserData} from "../../api/apicalls";
import {Helmet} from "react-helmet";

export function ProfileHome(props) {
    const user = useSelector(userToken);
    const dispatch = useDispatch();

    const [userdetails, setUserdetails] = useState({});

    fetchUserData({
        user
    }).then((response) => {
        setUserdetails(response.data)
    });

    function handleSwitchToDashboard() {
        props.history.push("/dashboard");
    }

    function handleLogout() {
        dispatch(unload);
        props.history.push("/home");
    }

    return (
        <div className="profile">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>Your profile</title>
            </Helmet>
            <div id="body">
                <div className="container">
                    <div className="form">
                        <h1>Welcome to your profile, <span id="firstSpan">{userdetails.firstName}</span>!</h1>
                        <div className="info">Here is your personal information:</div>
                        <table>
                            <tr>
                                <td>Nickname:</td>
                                <td><span>{userdetails.nickname}</span></td>
                            </tr>
                            <tr>
                                <td>First name:</td>
                                <td><span>{userdetails.firstName}</span></td>
                            </tr>
                            <tr>
                                <td>Last name:</td>
                                <td><span>{userdetails.lastName}</span></td>
                            </tr>
                            <tr>
                                <td>Email address:</td>
                                <td><span>{userdetails.email}</span></td>
                            </tr>
                            <tr>
                                <td>Account created at:</td>
                                <td><span>{userdetails.registerDate}</span></td>
                            </tr>
                        </table>
                    </div>
                    <div className="back-button">
                        <div onClick={handleLogout}>Log out</div>
                    </div>
                </div>
            </div>
        </div>
    );
}