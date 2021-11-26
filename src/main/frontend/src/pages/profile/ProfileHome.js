import {useDispatch, useSelector} from "react-redux";
import {userToken} from "../../redux/UserSlice";
import React, {useEffect, useState} from "react";
import {fetchUserData, modifyWatchLater} from "../../api/apicalls";
import {Helmet} from "react-helmet";

export function ProfileHome(props) {
    const user = useSelector(userToken);
    const dispatch = useDispatch();

    const [userdetails, setUserdetails] = useState({});
    const [watchlater, setWatchlater] = useState();

    useEffect(() => {
    fetchUserData({
        user
    }).then((response) => {
        console.log(response.data)
        setUserdetails(response.data)
    })

    modifyWatchLater({
        user
    },{"action": "GET_LIST", "movie_id":"0"}).then((response) => {
        console.log("watch:")
        console.log(response.data)
        setWatchlater(response.data.map((id)=>(
            <li>{id}</li>
        )))
    })

    },[])

    function handleSwitchToDashboard() {
        props.history.push("/dashboard");
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
                        <div>Your watchlater list:</div>
                        <div>
                            <ul>
                                {watchlater}
                            </ul>
                        </div>
                    </div>
                    <div className="back-button">
                        <div onClick={handleSwitchToDashboard}>Dashboard</div>
                    </div>
                </div>
            </div>
        </div>
    );
}