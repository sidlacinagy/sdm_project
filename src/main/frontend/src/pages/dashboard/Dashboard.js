import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {unload, userToken} from '../../redux/UserSlice';
import {fetchUserData, userLogout} from "../../api/apicalls";
import {Helmet} from 'react-helmet';

export function Dashboard(props) {
    const user = useSelector(userToken);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");

    fetchUserData({
        user
    }).then((response) => {

    });

    function handleSwitchToProfile() {
        props.history.push("/profile_home");
    }

    function handleLogout() {
        dispatch(unload);
        userLogout().then((response) => {
            alert(response.data);
        });
        props.history.push("/home");
    }

    function handleSearch(event) {
        props.history.push("/search?term=" + searchTerm + "&page=1");
        event.preventDefault();
    }

    return (
        <div className="dashboard">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>Dashboard</title>
            </Helmet>
            <div id="body">
                <div className="container" id="container">
                    <div>
                        <ul className="menu-bar">
                            <li>Watch Now</li>
                            <li>
                                <form onSubmit={handleSearch} method="POST">
                                    <input
                                        type="text"
                                        placeholder="Search Films"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}/>
                                    <button name="search">Search</button>
                                </form>
                            </li>
                            <li onClick={handleSwitchToProfile}>Profile</li>
                            <li id="logout" onClick={handleLogout}>Log out</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}