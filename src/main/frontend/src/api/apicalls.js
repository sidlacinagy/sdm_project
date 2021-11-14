import React from "react";
import axios from "axios";

export const userLogin = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/login`,
        'data': request
    });
}

export const userRegister = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8080'}/api/register`,
        'data': request
    });
}

export const fetchUserData = (request) => {
    return axios({
        'method': 'GET',
        'url': `${process.env.hostUrl || 'http://localhost:8080'}/api/userinfo`,
        'headers': {
            'Authorization': 'Bearer' + request
        }
    });
}