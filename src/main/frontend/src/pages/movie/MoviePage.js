import {
    createReview,
    deleteReview, fetchUserData, getQuiz, getReviewsByMovie,
    loadCredits,
    loadImages,
    loadMovie,
    loadRecommendations,
    loadVideos,
    modifyWatchLater
} from "../../api/apicalls";
import Modal from 'react-awesome-modal';
import ReactStars from 'react-rating-stars-component';
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useHistory} from "react-router-dom";
import not_found from "../searchresult/not_found.png";
import {useSelector} from "react-redux";
import {userToken} from "../../redux/UserSlice";
import MenuBar from "../menubar/MenuBar";


export function MoviePage(props) {

    const user = useSelector(userToken);
    const [movieInfo, setMovieInfo] = useState({});
    const [cast, setCast] = useState([]);
    const [directors, setDirectors] = useState();
    const [images, setImages] = useState({});
    const [videos, setVideos] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [videoTag, setVideoTag] = useState();
    const history = useHistory();
    const [currentCastPage, setCurrentCastPage] = useState();
    const [currentCast, setCurrentCast] = useState([]);
    const [currentRecomPage, setCurrentRecomPage] = useState();
    const [currentRecom, setCurrentRecom] = useState([]);
    const [reviewVisible, setReviewVisible] = useState(false);
    const [quizVisible, setQuizVisible] = useState(false);
    const [isReviewPresent, setIsReviewPresent] = useState(false);
    const [userReview, setUserReview] = useState({});
    const [isQuizPresent, setIsQuizPresent] = useState(false);
    const [quiz, setQuiz] = useState([]);
    const [review, setReview] = useState({
        key: {
            nickname: null,
            movieId: window.location.href.split('?')[1]
        },
        rating: null,
        comment: null,
        verified: false,
        reviewDate: null
    });
    const [movieReviews, setMovieReviews] = useState([]);

    useEffect(() => {
        loadMovie((window.location.href).split('?')[1]).then((response) => {
            setMovieInfo(response.data)
        })

        loadCredits((window.location.href).split('?')[1]).then((response) => {
            setDirectors(response.data.crew.filter(crew => crew.job === "Director").map((crew) => (
                <li>
                    {crew.name}
                </li>
            )))

            setCast(response.data.cast.map((actor) => (
                <li>
                    <img alt="pic"
                         src={actor.profile_path === null ? not_found : ("https://image.tmdb.org/t/p/w500/" + actor.profile_path)}
                         width="100px"/>
                    <br/>
                    <span>{actor.name} as{actor.character}</span>
                </li>
            )))

        })

        loadImages((window.location.href).split('?')[1]).then((response) => {
            setImages(response.data);
        })

        loadVideos((window.location.href).split('?')[1]).then((response) => {
            setVideos("https://www.youtube.com/embed/" + response.data.results.find(element => element.type === "Trailer").key);
            setVideoTag(<span><td>Video:</td>
            <td> <iframe width="420" height="315" allow="fullscreen;"
                         src={videos}>
            </iframe> </td></span>)
        })

        loadRecommendations({movie_id: (window.location.href).split('?')[1], page: "1"}).then((response) => {
            console.log(response.data.results)
            setRecommendations(response.data.results.map((movie) => (
                <li id={movie.id} onClick={handleMovieClick}>
                    <img alt="pic"
                         src={movie.poster_path === null ? not_found : ("https://image.tmdb.org/t/p/original" + movie.poster_path)}
                         width="100px" id={movie.id} onClick={handleMovieClick}/>
                    <div className="movie_li_div" id={movie.id} onClick={handleMovieClick}>
                        <span className="movie_title" id={movie.id} onClick={handleMovieClick}>{movie.title}</span>
                        <span className="movie_release_date" id={movie.id}
                              onClick={handleMovieClick}> {movie.release_date === null ? "" : movie.release_date.substring(0, 4)}</span>
                        <br/>
                        <span id={movie.id}
                              onClick={handleMovieClick}>Original title: {movie.original_title === null ? "" : movie.original_title}</span>
                        <br/>
                        <span id={movie.id}
                              onClick={handleMovieClick}>{movie.ratings === -1 ? "-" : movie.ratings}</span>
                    </div>
                </li>

            )));
        })

        getReviewsByMovie((window.location.href).split('?')[1]).then((response) => {
            fetchUserData({
                user
            }).then((res) => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].key.nickname === res.data.nickname) {
                        setIsReviewPresent(true);
                        setUserReview(response.data[i]);
                        break;
                    }
                }
            });
            setMovieReviews(response.data.map((review) => (
                <li>
                    <div>
                        <ReactStars
                            count={5}
                            value={review.rating}
                            size={24}
                            edit={false}
                            isHalf={true}
                            activeColor="#ff6200"/>
                    </div>
                    <div>{review.comment}</div>
                    <div>
                        <span>{review.key.nickname}</span>
                        <span>{review.reviewDate}</span>
                    </div>
                </li>
            )));
        })

        getQuiz((window.location.href).split('?')[1]).then((response) => {
            if (response.data !== null) {
                setQuiz(response.data.map((element) => (
                    <div>
                        <span>{element.question}</span>
                        {element.answers.map((answer) => (
                            <label> {answer}
                            <input type="radio" name={element.question} value={answer} id={answer} />
                            </label>

                        ))}
                    </div>
                )))
                setIsQuizPresent(true)
                console.log(response.data)
            }

        })


    }, []);

    useEffect(() => {
        setCurrentCast(Array.of(cast[(currentCastPage * 5)],
            cast[(1 + (currentCastPage * 5))],
            cast[(2 + (currentCastPage * 5))],
            cast[(3 + (currentCastPage * 5))],
            cast[(4 + (currentCastPage * 5))]))
    }, [currentCastPage]);

    useEffect(() => {
        setCurrentRecom(Array.of(recommendations[(currentRecomPage * 5)],
            recommendations[(1 + (currentRecomPage * 5))],
            recommendations[(2 + (currentRecomPage * 5))],
            recommendations[(3 + (currentRecomPage * 5))],
            recommendations[(4 + (currentRecomPage * 5))]))
    }, [currentRecomPage]);

    useEffect(
        () => {
            let timer1 = setTimeout(() => setCurrentCastPage(0), 500);
            let timer2 = setTimeout(() => setCurrentRecomPage(0), 1000);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        },
        []
    );

    function addMovieToWatchLater(event) {
        modifyWatchLater(user, {"action": "ADD", "movie_id": event.target.id}).then();
    }

    function nextCastPage(event) {
        setCurrentCastPage(currentCastPage + 1);
    }

    function previousCastPage(event) {
        setCurrentCastPage(currentCastPage - 1);
    }

    function nextRecomPage(event) {
        setCurrentRecomPage(currentRecomPage + 1);
    }

    function previousRecomPage(event) {
        setCurrentRecomPage(currentRecomPage - 1);
    }

    function handleMovieClick(event) {
        window.location.href = "/movie?" + event.target.id;
    }

    function createReviewPopup(event) {
        setReviewVisible(true);
    }

    function hideReviewPopup(event) {
        setReviewVisible(false);
    }

    function createQuizPopup(event) {
        setQuizVisible(true);
    }

    function hideQuizPopup(event) {
        setQuizVisible(false);
    }

    function handleCommentChange(event) {
        setReview(prevState => ({
            ...prevState,
            comment: event.target.value
        }));
    }

    function handleSubmitReview(event) {
        setIsReviewPresent(true);
        createReview(user, review).then((response) => {
            setMovieReviews(
                [
                    ...movieReviews,
                    <li>
                        <div>
                            <ReactStars
                                count={5}
                                value={response.data.rating}
                                size={24}
                                edit={false}
                                isHalf={true}
                                activeColor="#ff6200"/>
                        </div>
                        <div>{response.data.comment}</div>
                        <div>
                            <span>{response.data.key.nickname}</span>
                            <span>{response.data.reviewDate}</span>
                        </div>
                    </li>
                ]
            );
        });
        hideReviewPopup();
    }

    function handleSubmitQuiz(event){
        console.log(event.target)
    }

    function ratingChanged(newRating) {
        setReview(prevState => ({
            ...prevState,
            rating: newRating
        }));
    }

    return (
        <div className="movie">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>{movieInfo.title}</title>
            </Helmet>
            <div id="body">
                <div className="container">
                    <MenuBar data={props}/>
                    <div className="form">
                        <h1>{movieInfo.title}</h1>
                        <img alt={movieInfo.title + " poster"}
                             src={"https://image.tmdb.org/t/p/original" + movieInfo.poster_path} width="200px"/>
                        <div className="info">{movieInfo.overview}</div>
                        <table>
                            <tr>
                                <button id={movieInfo.id} onClick={addMovieToWatchLater}>Add to watchlater</button>
                            </tr>
                            <tr>
                                <td>Ratings:</td>
                                <td>
                                    <span>{movieInfo.ratings === -1 ? "Be the first one to rate" : movieInfo.ratings}</span>
                                </td>
                                <td>TMDB Ratings:</td>
                                <td>
                                    <span>{movieInfo.vote_average === -1 ? "Be the first one to rate" : movieInfo.vote_average}</span>
                                </td>
                            </tr>
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
                                <td>
                                    <span>{movieInfo.adult !== undefined ? movieInfo.adult.toString() : "Unknown"}</span>
                                </td>
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
                                <td>
                                    <div className="dashboard-button" id="back"
                                         style={currentCastPage < 1 ? {display: 'none'} : {}}>
                                        <div onClick={() => previousCastPage()}>Back</div>
                                    </div>
                                    <ul id="currentCast">
                                        {currentCast}
                                    </ul>

                                    <div className="dashboard-button" id="next"
                                         style={(cast.length) <= (currentCastPage + 1) * 5 ? {display: 'none'} : {}}>
                                        <div onClick={() => nextCastPage()}>Next</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Director:</td>
                                <td>
                                    <ul>
                                        {directors}
                                    </ul>
                                </td>
                            </tr>
                            {videos !== "" ? <tr>
                                <td>Video:</td>
                                <td>
                                    <iframe width="420" height="315" allow="fullscreen;"
                                            src={videos}>
                                    </iframe>
                                </td>
                            </tr> : ""}
                            <tr>
                                {!isReviewPresent ? <button onClick={createReviewPopup}>Write review</button> :
                                    <button onClick={createReviewPopup}>Modify review</button>}
                            </tr>
                            <Modal visible={reviewVisible} width="400" height="300" effect="fadeInUp"
                                   onClickAway={hideReviewPopup}>
                                <div>
                                    <h1>Write new review</h1>
                                    {isQuizPresent ? <button onClick={createQuizPopup}>Verify your review</button> :
                                        <span></span>}

                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={24}
                                        isHalf={true}
                                        activeColor="#ff6200"/>
                                    <input type="textarea"
                                           name="comment"
                                           placeholder={isReviewPresent ? userReview.comment : "Tell us your opinion..."}
                                           onChange={handleCommentChange}/>
                                    <button onClick={handleSubmitReview}>Send review</button>
                                    <button onClick={hideReviewPopup}>Close</button>
                                </div>
                            </Modal>
                            <Modal visible={quizVisible} width="400" height="300" effect="fadeInUp"
                                   onClickAway={hideQuizPopup}>
                                <form onClick={handleSubmitQuiz} method="POST">
                                    <div>{quiz}</div>
                                    <button type="submit">Done</button>
                                    <button onClick={hideQuizPopup}>Close</button>
                                </form>
                            </Modal>
                            <tr>
                                <ul>
                                    {movieReviews}
                                </ul>
                            </tr>
                            <tr>
                                <td>
                                    <div className="dashboard-button" id="back"
                                         style={currentRecomPage < 1 ? {display: 'none'} : {}}>
                                        <div onClick={() => previousRecomPage()}>Back</div>
                                    </div>
                                    <ul id="currentRecom">
                                        {currentRecom}
                                    </ul>

                                    <div className="dashboard-button" id="next"
                                         style={(recommendations.length) <= (currentRecomPage + 1) * 5 ? {display: 'none'} : {}}>
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