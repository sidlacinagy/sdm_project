import React from 'react';
import {useSelector} from 'react-redux'
import {userToken} from '../../redux/UserSlice'
import {fetchUserData} from "../../api/apicalls";
import {Helmet} from 'react-helmet';

export function Dashboard() {

    const user = useSelector(userToken);

    fetchUserData({
        user
    }).then((response) => {
        alert(response.data.registerDate);
    });

    return (
        <div className="container">
            <ul className="menu-bar">
                <li>Watch Now</li>
                <li><input type="text" placeholder="Search Films"/></li>
            </ul>
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>Dashboard</title>
                <link rel="stylesheet" href="./dashboard.css"/>
            </Helmet>
        </div>
    );
}