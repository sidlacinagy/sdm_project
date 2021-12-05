import React from "react";
import axios from "axios";

export const userLogin = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/auth/login`,
        'data': request
    });
}

export const userLogout = () => {
    return axios({
        'method': 'GET',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/logout`,
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

export const modifyWatchLater = (authtoken, request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/watchlater`,
        'headers': {
            'Authorization': 'Bearer' + authtoken
        },
        'data': request
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

export const loadCredits = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/credits`,
        'data': request
    });
}

export const loadImages = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/images`,
        'data': request
    });
}

export const loadRecommendations = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/recommendations`,
        'data': request
    });
}

export const loadVideos = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/videos`,
        'data': request
    });
}

export const reset = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/reset`,
        'data': request
    });
}

export const createReview = (authtoken, request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/review_create`,
        'headers': {
            'Authorization': 'Bearer' + authtoken
        },
        'data': request
    });
}

export const deleteReview = (authtoken, request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/review_delete`,
        'headers': {
            'Authorization': 'Bearer' + authtoken
        },
        'data': request
    });
}

export const getReviewsByUser = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/review_user`,
        'data': request
    });
}

export const getReviewsByMovie = (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/review_movie`,
        'data': request
    });
}

export const getTrending= () => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/get_trending`,
    });
}

export const getQuiz= (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/get_quiz`,
        'data': request
    });
}

export const sendAnswer= (request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/send_answer`,
        'data': request
    });
}

export const submitAnswers= (authtoken, request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/submit_answers`,
        'headers': {
            'Authorization': 'Bearer' + authtoken
        },
        'data': request
    });
}

export const getUserVerified= (authtoken, request) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8082'}/api/user_verified`,
        'headers': {
            'Authorization': 'Bearer' + authtoken
        },
        'data': request
    });
}