import React, {Component, useEffect, useState} from "react";
import {unload, userToken} from "../redux/UserSlice";
import {userLogout} from "../api/apicalls";
import {useDispatch, useSelector} from "react-redux";

function MenuBar(props) {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");


    function handleSwitchToProfile() {
        window.location.href = "/profile_home"
    }

    function handleLogout() {
        dispatch(unload);
        userLogout().then((response) => {
            alert(response.data);
        });
        window.location.href = "/home"
    }

    function handleSearch(event) {
        window.location.href = "/search?term=" + searchTerm + "&page=1";
        event.preventDefault();
    }

    function handleSwitchToDashboard() {
        window.location.href = "/dashboard"
    }

    return (
        <div>
            <ul className="menu-bar">
                <li onClick={handleSwitchToDashboard}>Dashboard</li>
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
        </div>)

}
export  default MenuBar;