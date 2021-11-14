import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {unload, userToken} from '../../redux/UserSlice'
import {fetchUserData, loadMovie, searchMovie} from "../../api/apicalls";
import {Helmet} from 'react-helmet';

//import "./dashboard.css";

export function Dashboard(props) {
    const user = useSelector(userToken);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [results, setResults] = useState([]);

    fetchUserData({
        user
    }).then((response) => {

    });

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
                    <span id={movie.id} onClick={handleMovieClick}>{movie.title}</span>
                    <span><img alt="pic" src={"https://image.tmdb.org/t/p/original" + movie.poster_path} width="100px"/></span>
                </li>
            )));
        });
        event.preventDefault();
    }

    return (
        <div>
            <div className="container" id="container" style={{overflow: 'visible'}}>
                <Helmet>
                    <meta charSet="UTF-8"/>
                    <title>Dashboard</title>
                </Helmet>
                <ul className="menu-bar">
                    <li>Watch Now</li>
                    <li>
                        <form onSubmit={handleSearch} method="POST">
                            <input
                                type="text"
                                placeholder="Search Films"
                                value={title}
                                onChange={e => setTitle(e.target.value)}/>
                            <button name="signIn">Search</button>
                        </form>
                    </li>
                    {results}
                    <li>
                        <button onClick={handleLogout}>Log out</button>
                    </li>
                </ul>
            </div>
            <div className="wrap">
                <img alt="error" className="img" src="https://penji.co/wp-content/uploads/2019/09/The_Godfather-iconic-movie-posters.jpg"/>
                <img alt="error" className="img" src="https://images-na.ssl-images-amazon.com/images/I/71OIhbUOF-L.jpg"/>
                <img alt="error" className="img"
                     src="https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/268821/4556789/apiihy1mm__31528.1625622408.jpg?c=2"/>
                <img alt="error" className="img"
                     src="https://webneel.com/daily/sites/default/files/images/daily/09-2019/2-movie-poster-design-aladdin-disney-glossy-composite.jpg"/>
                <img alt="error" className="img" src="https://i.pinimg.com/originals/03/c0/c2/03c0c2137dd12b0dd65d89c3b2ac2baa.jpg"/>
                <img alt="error" className="img" src="https://cdn.wallpapersafari.com/71/79/ABPkK1.jpg"/>
                <img alt="error" className="img" src="https://mymodernmet.com/wp/wp-content/uploads/2018/01/honest-movie-posters-7.jpg"/>
                <img alt="error" className="img"
                     src="https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88205/90762/Dunkirk-2017-Advance-Style-Poster-buy-original-movie-posters-at-starstills__51424.1496229224.jpg?c=2"/>
                <img alt="error" className="img"
                     src="https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg"/>
                <img alt="error" className="img" src="https://www.kolpaper.com/wp-content/uploads/2020/04/La-Casa-De-Papel-Poster.jpg"/>
            </div>
        </div>
    );
}