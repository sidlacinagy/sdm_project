import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {unload, userToken} from '../../redux/UserSlice';
import {fetchUserData, getTrending, searchMovie, userLogout} from "../../api/apicalls";
import {Helmet} from 'react-helmet';
import not_found from "../searchresult/not_found.png";
import MenuBar from "../menubar/MenuBar.js"

export function Dashboard(props) {
    const user = useSelector(userToken);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");

    const [results, setResults] = useState([]);

    const [pages, setPages] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getTrending().then((response) => {
            setTotalPages(response.data.total_pages);
            const pageCount = response.data.total_pages;
            setResults(response.data.results.map((movie) => (
                <li id={movie.id} onClick={handleMovieClick}>
                    <img alt="pic"
                         src={movie.poster_path === null ? not_found : ("https://image.tmdb.org/t/p/original" + movie.poster_path)}
                         width="100px" id={movie.id} onClick={handleMovieClick}/>
                    <div className="movie_li_div" id={movie.id} onClick={handleMovieClick}>
                        <span className="movie_title" id={movie.id} onClick={handleMovieClick}>{movie.title}</span>
                        <span className="movie_release_date" id={movie.id}
                              onClick={handleMovieClick}> {movie.release_date === null ? "" : movie.release_date.substring(0, 4)}</span>
                        <br/>
                        <span id={movie.id} onClick={handleMovieClick}>{movie.ratings === -1 ? "-" : movie.ratings}</span>
                        <span id={movie.id} onClick={handleMovieClick}>{movie.vote_average === -1 ? "-" : movie.vote_average}</span>
                    </div>
                </li>
            )));
        });
    }, []);

    function handleMovieClick(event) {
        props.history.push("/movie?" + event.target.id);
    }

    return (
        <div className="dashboard">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>Dashboard</title>
            </Helmet>
            <div id="body">
                <div className="container" id="container">
                    <MenuBar data={props} />
                </div>
                <ul id="searchlist">
                    {results.length === 0 ? "No results." : results}
                </ul>
            </div>
        </div>
    );
}