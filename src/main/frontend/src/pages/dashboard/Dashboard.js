import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {unload, userToken} from '../../redux/UserSlice'
import {fetchUserData, loadMovie, searchMovie} from "../../api/apicalls";
import {Helmet} from 'react-helmet';

export function Dashboard(props) {
    const user = useSelector(userToken);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [results, setResults] = useState([]);

    fetchUserData({
        user
    }).then((response) => {

    });

    function handleSwitchToProfile() {
        props.history.push("/profile_home");
    }

    function handleLogout() {
        dispatch(unload);
        props.history.push("/home");
    }

    function handleMovieClick(event, movie) {
        loadMovie(event.target.id).then((response) => {
            console.log(response.data);
        });
    }

    function handleSearch(event) {
        searchMovie(title).then((response) => {
            setResults(response.data.map((movie) => (
                <li>
                    <div id={movie.id} onClick={handleMovieClick}>
                        {movie.title}
                    </div>
                    <div>
                        <img alt="pic" src={"https://image.tmdb.org/t/p/original" + movie.poster_path} width="100px"/>
                    </div>
                </li>
            )));
        });
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
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}/>
                                    <button name="search">Search</button>
                                </form>
                            </li>
                            <li onClick={handleSwitchToProfile}>Profile</li>
                            <li id="logout" onClick={handleLogout}>Log out</li>
                        </ul>
                    </div>
                    <div id="searchresult">
                        <ul id="searchlist">
                            {results}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}