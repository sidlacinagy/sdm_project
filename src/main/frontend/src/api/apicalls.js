import React from "react";
import axios from "axios";

export const userLogin = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/auth/login`,
        'data': request
    });
}

export const userRegister = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/register`,
        'data': request
    });
}

export const fetchUserData = (request) => {
    return axios({
        'method': 'GET',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/userinfo`,
        'headers': {
            'Authorization': 'Bearer' + request
        }
    });
}


export const searchMovie = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/search`,
        'data': request
    });
}


export const loadMovie = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/movie`,
        'data': request
    });
}