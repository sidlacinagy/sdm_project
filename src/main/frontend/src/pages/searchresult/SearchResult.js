import {searchMovie} from "../../api/apicalls";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import not_found from "./not_found.png";

export function SearchResult(props) {

    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get("term"));

    const [results, setResults] = useState([]);

    const [pages, setPages] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        searchMovie({searchTerm: searchTerm, page: new URLSearchParams(window.location.search).get("page")}).then((response) => {
            setTotalPages(response.data.total_pages);
            const pageCount = response.data.total_pages;
            setResults(response.data.results.map((movie) => (
                <li id={movie.id} onClick={handleMovieClick}>
                    <img alt="pic" src={movie.poster_path === null ? not_found : ("https://image.tmdb.org/t/p/original" + movie.poster_path)}
                         width="100px" id={movie.id} onClick={handleMovieClick}/>
                    <div className="movie_li_div" id={movie.id} onClick={handleMovieClick}>
                        <span className="movie_title" id={movie.id} onClick={handleMovieClick}>{movie.title}</span>
                        <span className="movie_release_date" id={movie.id}
                              onClick={handleMovieClick}> {movie.release_date === null ? "" : movie.release_date.substring(0, 4)}</span>
                        <br/>
                        <span id={movie.id} onClick={handleMovieClick} className="rating">Ratings</span>
                    </div>
                </li>
            )));
            generatePageButtons(pageCount);
        });
    }, [new URLSearchParams(window.location.search).get("page")])

    function handleMovieClick(event) {
        props.history.push("/movie?" + event.target.id);
    }

    function generatePageButtons(pageCount) {
        let list = []
        let currentPage = parseInt(new URLSearchParams(window.location.search).get("page"));

        if (currentPage > 2 && currentPage < pageCount - 2) {
            for (let i = currentPage - 2; i < currentPage + 3; i++) {
                list.push(<li>
                    <button className={(i === currentPage).toString()} id={i} onClick={specificPage}>{i}</button>
                </li>);
            }
        } else if (currentPage <= 2) {
            for (let i = 1; i <= Math.min(pageCount, currentPage + 2); i++) {
                list.push(<li>
                    <button className={(i === currentPage).toString()} id={i} onClick={specificPage}>{i}</button>
                </li>);
            }
        } else {
            for (let i = currentPage - 2; i < pageCount + 1; i++) {
                list.push(<li>
                    <button className={(i === currentPage).toString()} id={i} onClick={specificPage}>{i}</button>
                </li>);
            }
        }
        setPages(list);
    }

    function firstPage() {
        window.location.href="/search?term=" + searchTerm + "&page=1";
    }

    function lastPage() {
        window.location.href="/search?term=" + searchTerm + "&page=" + totalPages;
    }

    function previousPage() {
        window.location.href="/search?term=" + searchTerm + "&page=" + (parseInt(new URLSearchParams(window.location.search).get("page")) - 1).toString();
    }

    function specificPage(event) {
        window.location.href="/search?term=" + searchTerm + "&page=" + event.target.id;
    }

    function nextPage() {
        window.location.href="/search?term=" + searchTerm + "&page=" + (parseInt(new URLSearchParams(window.location.search).get("page")) + 1).toString();
    }

    return (
        <div id="searchresult">
            <div id="body">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>{searchTerm}</title>
            </Helmet>
            <ul id="searchlist">
                {results}
            </ul>
            <div id="page">
                <div id="back">
            <button onClick={firstPage}
                    style={parseInt(new URLSearchParams(window.location.search).get("page")) <= 1 ? {display: 'none'} : {}}>First
            </button>
            <button onClick={previousPage}
                    style={parseInt(new URLSearchParams(window.location.search).get("page")) <= 1 ? {display: 'none'} : {}}>Prev
            </button>
                </div>
            <ul className="pages_list">{pages}</ul>
                <div id="next">
            <button onClick={nextPage}
                    style={parseInt(new URLSearchParams(window.location.search).get("page")) >= totalPages ? {display: 'none'} : {}}>Next
            </button>
            <button onClick={lastPage}
                    style={parseInt(new URLSearchParams(window.location.search).get("page")) >= totalPages ? {display: 'none'} : {}}>Last
            </button>
                </div>
            </div>
            </div>
        </div>);
}