// noinspection DuplicatedCode

import {useDispatch, useSelector} from "react-redux";
import {userToken} from "../../redux/UserSlice";
import React, {useEffect, useState} from "react";
import {fetchUserData, getReviewsByUser, loadMovie, modifyWatchLater} from "../../api/apicalls";
import {Helmet} from "react-helmet";
import not_found from "../searchresult/not_found.png";
import ReactStars from "react-rating-stars-component";
import MenuBar from "../menubar/MenuBar";

export function ProfileHome(props) {
    const user = useSelector(userToken);
    const dispatch = useDispatch();

    const [userdetails, setUserdetails] = useState({});
    const [watchlater, setWatchlater] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchUserData({
            user
        }).then((response) => {
            setUserdetails(response.data)
            getReviewsByUser(response.data.nickname).then((resp) => {
                let tempArray = [];
                for (let i = 0; i < resp.data.length; i++) {
                    loadMovie(resp.data[i].key.movieId).then((movie) => {
                        tempArray.push(<li>
                            <div className="grid_pic">
                                <img alt="pic"
                                     src={movie.data.poster_path === null ? not_found : ("https://image.tmdb.org/t/p/original" + movie.data.poster_path)}
                                     width="50px" id={movie.data.id} onClick={handleMovieClick}/>
                                <br/>
                            </div>
                            <div className="grid_title" id={movie.data.id} onClick={handleMovieClick}>
                                <span>{movie.data.title}</span>
                            </div>
                            <div className="grid_date">
                                <span>at: {resp.data[i].reviewDate}</span>
                            </div>
                            <div className="grid_star">
                                <ReactStars
                                    count={5}
                                    value={resp.data[i].rating}
                                    size={24}
                                    edit={false}
                                    isHalf={true}
                                    activeColor="#ff6200"/>
                            </div>
                            <div className="grid_review">{resp.data[i].comment}</div>
                        </li>)
                    })
                }
                setReviews(tempArray)
            })
        })

        modifyWatchLater({
            user
        }, {"action": "GET_LIST", "movie_id": "0"}).then((response) => {
            setWatchlater(response.data.map((movie) => (
                <li id={movie.id}>
                    <img alt="pic"
                         src={movie.poster_path === null ? not_found : ("https://image.tmdb.org/t/p/original" + movie.poster_path)}
                         width="100px" id={movie.id} onClick={handleMovieClick}/>
                    <div className="movie_li_div" id={movie.id}>
                        <div>
                            <span className="movie_title" id={movie.id}
                                  onClick={handleMovieClick}>{movie.title}</span>
                        </div>
                        <div>
                            <span className="movie_release_date" id={movie.id}
                                  onClick={handleMovieClick}>{movie.release_date === null ? "" : movie.release_date.substr(0, 4)}</span>
                        </div>
                        <buttom className="remove" id={movie.id} onClick={handleWatchLaterRemove}>Remove</buttom>
                    </div>
                </li>
            )))
        });
    }, [])

    function handleWatchLaterRemove(event) {
        modifyWatchLater(user, {"action": "REMOVE", "movie_id": event.target.id}).then(() => {
            modifyWatchLater({
                user
            }, {"action": "GET_LIST", "movie_id": "0"}).then((response) => {
                setWatchlater(response.data.map((movie) => (
                    <li id={movie.id}>
                        <img alt="pic"
                             src={movie.poster_path === null ? not_found : ("https://image.tmdb.org/t/p/original" + movie.poster_path)}
                             width="100px" id={movie.id} onClick={handleMovieClick}/>
                        <div className="movie_li_div" id={movie.id}>
                            <div>
                            <span className="movie_title" id={movie.id}
                                  onClick={handleMovieClick}>{movie.title}</span>
                            </div>
                            <div>
                            <span className="movie_release_date" id={movie.id}
                                  onClick={handleMovieClick}>{movie.release_date === null ? "" : movie.release_date.substr(0, 4)}</span>
                            </div>
                            <buttom className="remove" id={movie.id} onClick={handleWatchLaterRemove}>Remove</buttom>
                        </div>
                    </li>
                )))
            });
        });
    }

    function handleMovieClick(event) {
        props.history.push("/movie?" + event.target.id);
    }

    return (
        <div className="profile">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>Your profile</title>
            </Helmet>
            <div id="body">
                <MenuBar data={props}/>
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
                        <div className="cont">
                            <div className="first">Your watchlater list:</div>
                            <div>
                                <ul>
                                    {watchlater}
                                </ul>
                            </div>
                            <div className="second">Your recent reviews:</div>
                            <div>
                                <ul className="reviewList">
                                    {reviews}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}