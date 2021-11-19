import {loadMovie} from "../../api/apicalls";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";

export function MoviePage(props) {

    const [movieInfo, setMovieInfo] = useState({});


    useEffect(() => {
        loadMovie((window.location.href).split('?')[1]).then((response) => {
            setMovieInfo(response.data)
        })
    }, []);

    function handleSwitchToDashboard() {
        props.history.push("/dashboard");
    }

    return (
        <div className="movie">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>{movieInfo.title}</title>
            </Helmet>
            <div id="body">
                <div className="container">
                    <div className="form">
                        <h1>{movieInfo.title}</h1>
                        <img alt={movieInfo.title + " poster"}
                             src={"https://image.tmdb.org/t/p/original" + movieInfo.poster_path} width="200px"/>
                        <div className="info">{movieInfo.overview}</div>
                        <table>
                            <tr>
                                <td>Release date:</td>
                                <td><span>{movieInfo.release_date}</span></td>
                            </tr>
                            <tr>
                                <td>Runtime:</td>
                                <td><span>{movieInfo.runtime + " min"}</span></td>
                            </tr>
                            <tr>
                                <td>Original title:</td>
                                <td><span>{movieInfo.original_title}</span></td>
                            </tr>
                            <tr>
                                <td>Movie homepage:</td>
                                <td><a href={movieInfo.homepage}>link</a></td>
                            </tr>
                            <tr>
                                <td>Original language:</td>
                                <td><span>{movieInfo.original_language}</span></td>
                            </tr>
                            <tr>
                                <td>Adult movie:</td>
                                <td><span>{movieInfo.adult !== undefined ? movieInfo.adult.toString() : "Unknown"}</span></td>
                            </tr>
                            <tr>
                                <td>Budget:</td>
                                <td><span>{movieInfo.budget}</span></td>
                            </tr>
                            <tr>
                                <td>Revenue:</td>
                                <td><span>{movieInfo.revenue}</span></td>
                            </tr>
                        </table>
                    </div>
                    <div className="dashboard-button">
                        <div onClick={handleSwitchToDashboard}>Dashboard</div>
                    </div>
                </div>
            </div>

        </div>

    );
}