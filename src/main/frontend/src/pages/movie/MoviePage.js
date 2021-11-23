import {loadCredits, loadImages, loadMovie, loadRecommendations, loadVideos} from "../../api/apicalls";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useHistory} from "react-router-dom";
import not_found from "../searchresult/not_found.png";
import reactElementToJSXString from 'react-element-to-jsx-string';


export function MoviePage(props) {

    const [movieInfo, setMovieInfo] = useState({});
    const [cast, setCast] = useState([]);
    const [directors, setDirectors] = useState();
    const [images, setImages] = useState({});
    const [videos, setVideos] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const[videoTag,setVideoTag]= useState();
    const history = useHistory();
    const[currentCastPage,setCurrentCastPage]= useState();
    const[currentCast,setCurrentCast]= useState([]);
    const[currentRecomPage,setCurrentRecomPage]= useState();
    const[currentRecom,setCurrentRecom]= useState([]);



    useEffect(() => {
        loadMovie((window.location.href).split('?')[1]).then((response) => {
            setMovieInfo(response.data)
        })

        loadCredits((window.location.href).split('?')[1]).then((response) => {
            setDirectors(response.data.crew.filter(crew => crew.job == "Director").map((crew) => (
                <li>
                    {crew.name}
                </li>
            )))

            setCast(response.data.cast.map((actor) => (
                <li>
                    {actor.name} played {actor.character}
                    <img alt="pic" src={actor.profile_path === null ? not_found : ("https://image.tmdb.org/t/p/w500/" + actor.profile_path)}
                         width="100px" />
                </li>
            )))

        })

        loadImages((window.location.href).split('?')[1]).then((response) => {
            setImages(response.data);
        })

        loadVideos((window.location.href).split('?')[1]).then((response) => {
            setVideos("https://www.youtube.com/embed/"+response.data.results.find(element => element.type==="Trailer").key);
            setVideoTag(<span><td>Video:</td>
            <td> <iframe width="420" height="315" allow="fullscreen;"
                         src={videos}>
            </iframe> </td></span>)
        })

        loadRecommendations({movie_id:(window.location.href).split('?')[1], page: "1"}).then((response) => {
            setRecommendations(response.data.results.map((movie) => (

                <li id={movie.id} onClick={handleMovieClick}>
                    <img alt="pic" src={movie.poster_path === null ? not_found : ("https://image.tmdb.org/t/p/original" + movie.poster_path)}
                         width="100px" id={movie.id} onClick={handleMovieClick}/>
                    <div className="movie_li_div" id={movie.id} onClick={handleMovieClick}>
                        <span className="movie_title" id={movie.id} onClick={handleMovieClick}>{movie.title}</span>
                        <span className="movie_release_date" id={movie.id}
                              onClick={handleMovieClick}> {movie.release_date === null ? "" : movie.release_date.substring(0, 4)}</span>
                        <br/>
                        <span id={movie.id}
                              onClick={handleMovieClick}>Original title: {movie.original_title === null ? "" : movie.original_title}</span>
                        <br/>
                        <span id={movie.id} onClick={handleMovieClick}>Ratings</span>
                    </div>
                </li>

            )));
        })

    }, []);

    useEffect(() => {setCurrentCast(Array.of(cast[(currentCastPage * 5)],
        cast[(1+(currentCastPage * 5))],
        cast[(2+(currentCastPage * 5))],
        cast[(3+(currentCastPage * 5))],
        cast[(4+(currentCastPage * 5))]))
            } ,[currentCastPage]);

    useEffect(() => {setCurrentRecom(Array.of(recommendations[(currentRecomPage * 5)],
        recommendations[(1+(currentRecomPage * 5))],
        recommendations[(2+(currentRecomPage * 5))],
        recommendations[(3+(currentRecomPage * 5))],
        recommendations[(4+(currentRecomPage * 5))]))
    } ,[currentRecomPage]);

    useEffect(
        () => {
            let timer1 = setTimeout(() => setCurrentCastPage(0), 500);
            let timer2 = setTimeout(() => setCurrentRecomPage(0), 500);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        },
        []
    );

    function nextCastPage(event) {
        setCurrentCastPage(currentCastPage+1);
    }

    function previousCastPage(event){
        setCurrentCastPage(currentCastPage-1);
    }

    function nextRecomPage(event) {
        setCurrentRecomPage(currentRecomPage+1);
    }

    function previousRecomPage(event){
        setCurrentRecomPage(currentRecomPage-1);
    }

    function handleMovieClick(event) {
        window.location.href ="/movie?" + event.target.id;
    }


    function handleMovieClick(event) {
        window.location.href ="/movie?" + event.target.id;
    }

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
                            <tr>
                                <td>Cast:</td>
                                <td>
                                    <div className="dashboard-button" id="back"
                                         style={currentCastPage<1 ? {display: 'none'} : {}}>
                                        <div onClick={() => previousCastPage()}>Back</div>
                                </div>
                                    <ul id="currentCast">
                                        {currentCast}
                                    </ul>

                                    <div className="dashboard-button" id="next"
                                         style={(cast.length)<=(currentCastPage+1)*5 ? {display: 'none'} : {}}>
                                    <div onClick={() => nextCastPage()}>Next</div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Director:</td>
                                <td><ul>
                                    {directors}
                                </ul></td>
                            </tr>
                                {videos !== "" ? <tr><td>Video:</td>
            <td> <iframe width="420" height="315" allow="fullscreen;"
                         src={videos}>
            </iframe> </td></tr> : ""}
                            <tr>
                                <td>Recommendations:</td>
                                <td>
                                    <div className="dashboard-button" id="back"
                                         style={currentRecomPage<1 ? {display: 'none'} : {}}>
                                        <div onClick={() => previousRecomPage()}>Back</div>
                                    </div>
                                    <ul id="currentRecom">
                                        {currentRecom}
                                    </ul>

                                    <div className="dashboard-button" id="next"
                                         style={(recommendations.length)<=(currentRecomPage+1)*5 ? {display: 'none'} : {}}>
                                        <div onClick={() => nextRecomPage()}>Next</div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="dashboard-button">
                        <div onClick={() => history.goBack()}>Back</div>
                    </div>
                </div>
            </div>

        </div>

    );
}