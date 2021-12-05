import {
    createReview,
    deleteReview, fetchUserData, getMovieInWatchLater, getQuiz, getReviewsByMovie, getUserVerified,
    loadCredits,
    loadImages,
    loadMovie,
    loadRecommendations,
    loadVideos,
    modifyWatchLater, sendAnswer, submitAnswers
} from "../../api/apicalls";
import Modal from 'react-awesome-modal';
import ReactStars from 'react-rating-stars-component';
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useHistory} from "react-router-dom";
import not_found from "../searchresult/not_found.png";
import verified from "../verified.png";
import verified_tick from "../verified_tick.png";
import verifiable from "../verifiable.png";
import tmdb_logo from "../tmdb.png";
import {useSelector} from "react-redux";
import {userToken} from "../../redux/UserSlice";
import MenuBar from "../menubar/MenuBar";


export function MoviePage(props) {

    const user = useSelector(userToken);
    const [movieInfo, setMovieInfo] = useState({});
    const [cast, setCast] = useState([]);
    const [directors, setDirectors] = useState();
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
    const [isInWatchLater, setIsInWatchLater] = useState(false);
    const [userReview, setUserReview] = useState({});
    const [isQuizPresent, setIsQuizPresent] = useState(false);
    const [isUserVerified, setIsUserVerified] = useState(false);
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
                <div class="director">
                    {crew.name}
                </div>
            )))

            setCast(response.data.cast.map((actor) => (
                <div class="actor">
                    <img alt="pic"
                         src={actor.profile_path === null ? not_found : ("https://image.tmdb.org/t/p/w500/" + actor.profile_path)}
                         width="100px"/>
                    <div class="actorName">{actor.name}</div>
                    <div class="as"> as</div>
                    <div class="actorCharacter">
                        {actor.character}</div>
                </div>
            )))

        })

        loadVideos((window.location.href).split('?')[1]).then((response) => {
            setVideos("https://www.youtube.com/embed/" + response.data.results.find(element => element.type === "Trailer").key);
            setVideoTag(<span><td>Video:</td>
            <td> <iframe width="420" height="315" allow="fullscreen;"
                         src={videos}>
            </iframe> </td></span>)
        })


        loadRecommendations({movie_id: (window.location.href).split('?')[1], page: "1"}).then((response) => {
            setRecommendations(response.data.results.map((movie) => (

                <div id={movie.id} className="movieRecommendation" onClick={handleMovieClick}>
                    <img alt="pic"
                         src={movie.poster_path === null ? not_found : ("https://image.tmdb.org/t/p/original" + movie.poster_path)}
                         width="100px" id={movie.id} onClick={handleMovieClick}/>
                    <div className="movie_li_div" id={movie.id} onClick={handleMovieClick}>
                        <div className="movie_title" id={movie.id} onClick={handleMovieClick}>{movie.title}</div>
                        <div className="movie_release_date" id={movie.id}
                             onClick={handleMovieClick}> {movie.release_date === null ? "" : movie.release_date.substring(0, 4)}</div>
                        <div className="ratings">
                            <div id={movie.id} onClick={handleMovieClick}
                                 className="rating">{movie.ratings === -1 ? "-" : movie.ratings}</div>
                            <div id={movie.id} onClick={handleMovieClick} className="verified-rating">
                                <div id="tickimg">
                                    <img alt="Verified_tick" src={verified_tick}/>
                                </div>
                                {movie.verified_rating === -1 ? "-" : movie.verified_rating}</div>
                            <div id={movie.id} onClick={handleMovieClick} className="tmdb-rating">
                                <div id="tmdbimg">
                                    <img alt="TMDB"
                                         src={tmdb_logo}/>{movie.vote_average === -1 ? "-" : movie.vote_average}</div>
                            </div>
                        </div>
                    </div>
                </div>

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
                <div className="review">
                    <div className="reviewHeader">
                    <div className="reviewStars">
                        <ReactStars
                            count={5}
                            value={review.rating}
                            size={24}
                            edit={false}
                            isHalf={true}
                            activeColor="#ff6200"/>
                    </div>
                    <div className="verifiedReview">
                    {review.verified === true ? <img alt="verified" src={verified_tick} height="25"/> : <span/>}
                    </div>
                    </div>
                    <div className="reviewComment">{review.comment}</div>
                    <div className="reviewMetaData">
                        <span className="reviewNickName">{review.key.nickname}</span>
                        <span className="reviewDate">{review.reviewDate}</span>
                    </div>
                </div>
            )));
        })

        getQuiz((window.location.href).split('?')[1]).then((response) => {
            if (response.data !== null) {
                setQuiz(response.data.map((element) => (
                    <div className="quizElement">
                        <span className="question">{element.question}</span>
                        <div className="answers">
                        {element.answers.map((answer) => (
                            <label className="answer">
                                <input type="radio" name={element.question} value={answer} id={answer}
                                       onChange={handleAnswerChange} className="quizInput"/>
                                       <div className="quizDesign"></div>
                                <div className="answerText">{answer}</div>
                            </label>

                        ))}
                        </div>
                    </div>
                )))
                setIsQuizPresent(true)
            }

        })

        getUserVerified(user, (window.location.href).split('?')[1]).then((response) => {
            setIsUserVerified(response.data)
        })

        getMovieInWatchLater(user, (window.location.href).split('?')[1]).then((response) => {
            console.log(response.data)
            setIsInWatchLater(response.data)
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
            let timer2 = setTimeout(() => setCurrentRecomPage(0), 2000);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        },
        []
    );

    function addMovieToWatchLater(event) {
        modifyWatchLater(user, {"action": "ADD", "movie_id": event.target.id}).then();
        window.location.href = "/movie?" + event.target.id;
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
        hideQuizPopup()
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

    function handleAnswerChange(event) {
        console.log(event.target.name + "#" + event.target.value)
        sendAnswer({element: event.target.name + "#" + event.target.value})
    }

    function handleSubmitReview(event) {
        setIsReviewPresent(true);
        createReview(user, review).then((response) => {
            setMovieReviews(
                [
                    ...movieReviews,
                    <div className="review">
                        <div className="reviewHeader">
                        <div className="reviewStars">
                            <ReactStars
                                count={5}
                                value={response.data.rating}
                                size={24}
                                edit={false}
                                isHalf={true}
                                activeColor="#ff6200"/>
                        </div>
                        <div className="reviewComment">{response.data.comment}</div>
                        </div>
                        <div className="reviewMetaData">
                            <span className="reviewNickName">{response.data.key.nickname}</span>
                            <span className="reviewDate">{response.data.reviewDate}</span>
                        </div>
                    </div>
                ]
            );
        });

        hideReviewPopup();
    }

    function handleSubmitQuiz(event) {
        submitAnswers(user, (window.location.href).split('?')[1]).then((response) => {
            console.log(response.data)
        })
        event.preventDefault()
        hideQuizPopup()
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
                        <h1 id="title">{movieInfo.title}</h1>
                        <div id="verifiable">
                        {isQuizPresent ? <img alt="Verifiable" src={verifiable} height="50"/> : <span/>}
                        </div>
                        <div id="maininfo">
                            <div id="poster">
                                <img alt={movieInfo.title + " poster"}
                                     src={"https://image.tmdb.org/t/p/original" + movieInfo.poster_path} width="200px"/>
                            </div>
                            <div id="traileranddesc">
                                {videos !== "" ?
                                    <iframe width="600" height="400" allow="fullscreen;"
                                            src={videos}>
                                    </iframe> : ""}
                                <div className="overview">{movieInfo.overview}</div>
                                <div id="watchlater">
                                    {isInWatchLater ? <div className="button">Already in WatchLater</div> :
                                        <button id={movieInfo.id} className="watchlaterbutton"
                                                onClick={addMovieToWatchLater}>Add to WatchLater
                                        </button>}
                                </div>
                            </div>
                        </div>

                        <div className="directors">
                            <div className="infoName">Director:</div>
                            <div className="infoValue">
                                {directors}
                            </div>
                        </div>

                        <div id="secondaryInfo">

                            <div className="infoElement">
                                <div className="infoName">Release date:</div>
                                <div className="infoValue">{movieInfo.release_date}</div>
                            </div>
                            <div className="infoElement">
                                <div className="infoName">Runtime:</div>
                                <div className="infoValue">{movieInfo.runtime + " min"}</div>
                            </div>
                            <div className="infoElement">
                                <div className="infoName">Original title:</div>
                                <div className="infoValue">{movieInfo.original_title}</div>
                            </div>
                            <div className="infoElement">
                                <div className="infoName">Movie homepage:</div>
                                <div className="infoValue"><a href={movieInfo.homepage}>link</a></div>
                            </div>
                            <div className="infoElement">
                                <div className="infoName">Original language:</div>
                                <div className="infoValue">{movieInfo.original_language}</div>
                            </div>
                            <div className="infoElement">
                                <div className="infoName">Adult movie:</div>
                                <div
                                    className="infoValue">{movieInfo.adult !== undefined ? movieInfo.adult.toString() : "Unknown"}
                                </div>
                            </div>
                            <div className="infoElement">
                                <div className="infoName">Budget:</div>
                                <div className="infoValue">{movieInfo.budget}</div>
                            </div>
                            <div className="infoElement">
                                <div className="infoName">Revenue:</div>
                                <div className="infoValue">{movieInfo.revenue}</div>
                            </div>

                        </div>
                        <div id="actors">
                            <div className="slidingButtonLeft"
                                 style={currentCastPage < 1 ? {display: 'none'} : {}}>
                                <div onClick={() => previousCastPage()}>&#8249;</div>
                            </div>
                            <div id="currentCast">
                                {currentCast}
                            </div>

                            <div className="slidingButtonRight"
                                 style={(cast.length) <= (currentCastPage + 1) * 5 ? {display: 'none'} : {}}
                                 onClick={() => nextCastPage()}>
                                &#8250;
                            </div>
                        </div>

                        <div id="recommendations">

                            <div className="slidingButtonLeft"
                                 style={currentRecomPage < 1 ? {display: 'none'} : {}}>
                                <div onClick={() => previousRecomPage()}>&#8249;</div>
                            </div>
                            <div id="currentRecom">
                                {currentRecom}
                            </div>

                            <div className="slidingButtonRight"
                                 style={(recommendations.length) <= (currentRecomPage + 1) * 5 ? {display: 'none'} : {}}>
                                <div onClick={() => nextRecomPage()}>&#8250;</div>
                            </div>

                        </div>

                        <div id="movieRating">
                            <div id="mainRatings">
                                <div className="mainRating">
                                    <div className="ratingTitle">Verified Rating:</div>
                                    <div
                                        className="ratingValue">{movieInfo.verified_rating === -1 ? "Be the first to leave a verified review" : movieInfo.verified_rating}</div>
                                </div>
                                <div className="mainRating">
                                    <div className="ratingTitle">Non-Verified Rating:</div>

                                    <div
                                        className="ratingValue">{movieInfo.ratings === -1 ? "Be the first one to rate" : movieInfo.ratings}</div>

                                </div>
                                <div className="mainRating">
                                    <div className="ratingTitle">TMDB Ratings:</div>
                                    <div
                                        className="ratingValue">{movieInfo.vote_average === -1 ? "Be the first one to rate" : movieInfo.vote_average}</div>
                                </div>
                            </div>


                            <div id="createReview">
                                {!isReviewPresent ?
                                    <button onClick={createReviewPopup} id="reviewButton">Write review</button> :
                                    <button onClick={createReviewPopup} id="reviewButton">Modify review</button>}
                            </div>
                            <div id="popupReview">
                                <Modal visible={reviewVisible} width="700" height="500" effect="fadeInUp"
                                       onClickAway={hideReviewPopup}>

                                    <h1>Write new review</h1>
                                    <div id="verifySpace">
                                        {isQuizPresent ? (isUserVerified ?
                                            <img alt="You are already verified" src={verified} height="50"/> :
                                            <button onClick={createQuizPopup}>Verify your review</button>) :
                                            <span></span>}
                                    </div>
                                    <div id="ratingResult">
                                        <div id="ratingStars">
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={24}
                                                isHalf={true}
                                                activeColor="#ff6200"/>
                                        </div>
                                        <textarea
                                            name="comment"
                                            placeholder={isReviewPresent ? userReview.comment : "Tell us your opinion..."}
                                            onChange={handleCommentChange} id="ratingText" cols="40" rows="5"/>


                                    </div>
                                    <div id="verifyMenu">
                                        <div className="verifyButton">
                                            <button onClick={handleSubmitReview}>Send review</button>
                                        </div>
                                        <div className="verifyButton">
                                            <button onClick={hideReviewPopup}>Close</button>
                                        </div>
                                    </div>


                                </Modal>
                            </div>
                            <Modal visible={quizVisible} width="800" height="700" effect="fadeInUp"
                                   onClickAway={hideQuizPopup}>
                                <form onSubmit={handleSubmitQuiz}>

                                    <div id="quiz">{quiz}</div>
                                    <div id="quizButtons">
                                        <div className="quizButton">
                                            <button type="submit">Done</button>
                                        </div>
                                        <div className="quizButton">
                                            <button onClick={hideQuizPopup}>Close</button>
                                        </div>
                                    </div>

                                </form>
                            </Modal>

                                <div id="reviews">
                                    {movieReviews}
                                </div>


                        </div>
                    </div>
                     <div id="dashboard-button-div">
                        <button onClick={() => history.goBack()} id="dashboard-button">Back</button>
                     </div>
                </div>
            </div>

        </div>

    );
}