import axios from "axios";
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {load, userToken} from '../../redux/UserSlice'
import "./profile.css";

export function Dashboard() {

    /*return (
        <div className="container">
            <div className="form">
                <h1>Welcome to your profile, !</h1>
                <div className="info">Here is your personal information:</div>
                <table>
                    <tr>
                        <td>Nickname:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>First name:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Last name:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Email address:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Account created at:</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div className="back-button">
                <form name="logoutForm" action="/home" th:action="@{/logout}" method="post">
                    <button type="submit">Sign out</button>
                </form>
            </div>
        </div>);*/
    return (<div>ASIOJFNOASIFJOASIFJASIO</div>);
}