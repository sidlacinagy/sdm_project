import {searchMovie} from "../../api/apicalls";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import not_found from "./not_found.png";

export function SearchResult(props) {

    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get("term"));

    const [results, setResults] = useState([]);

    const [pages, setPages] = useState();
    const [totalPages, setTotalPages] = useState();


    useEffect(() => {
        searchMovie({searchTerm: searchTerm, page: new URLSearchParams(window.location.search).get("page")}).then((response) => {
            setTotalPages(response.data.total_pages);
            setResults(response.data.results.map((movie) => (
                <li id={movie.id} onClick={handleMovieClick}>
                    <img alt="pic" src={movie.poster_path===null?not_found:("https://image.tmdb.org/t/p/original" + movie.poster_path)} width="100px"/>
                    <div className="movie_li_div">
                        <span className="movie_title">{movie.title}</span>
                        <span className="movie_release_date"> {movie.release_date===null?"":movie.release_date.substring(0, 4)}</span>
                        <br/>
                        <span>Original title: {movie.original_title===null?"":movie.original_title}</span>
                        <br/>
                        <span>Ratings</span>
                    </div>
                </li>
            )));
        });
        generatePageButtons();

    }, [new URLSearchParams(window.location.search).get("page")])

    function handleMovieClick(event) {
        props.history.push("/movie?" + event.target.id);
    }

    function generatePageButtons(){
        let list = []
        let currentPage=parseInt(new URLSearchParams(window.location.search).get("page"));

        if(currentPage>2 && currentPage<totalPages-2) {
            for (let i = currentPage - 2; i < currentPage + 3; i++) {
                list.push(<li>
                    <button className={(i===currentPage).toString()} id={i} onClick={specificPage}>{i}</button>
                </li>);
            }
        }else if(currentPage<=2){
            for (let i = 1; i < currentPage + 3; i++){
                list.push(<li>
                    <button className={(i===currentPage).toString()} id={i} onClick={specificPage}>{i}</button>
                </li>);
            }
        }else{
            for (let i = currentPage - 2; i < totalPages + 1; i++){
                list.push(<li>
                    <button className={(i===currentPage).toString()} id={i} onClick={specificPage}>{i}</button>
                </li>);
            }
        }
        setPages(list);
    }

    function firstPage(){
        props.history.push("/search?term=" + searchTerm + "&page=1");
    }

    function lastPage(){
        props.history.push("/search?term=" + searchTerm + "&page="+totalPages);
    }

    function previousPage() {
        let currentPage=parseInt(new URLSearchParams(window.location.search).get("page"));
        if (currentPage !== 0)
            props.history.push("/search?term=" + searchTerm + "&page=" + (currentPage).toString());
        else
            props.history.push("/search?term=" + searchTerm + "&page=" + (currentPage).toString());
    }

    function specificPage(event){
        props.history.push("/search?term=" + searchTerm + "&page=" + event.target.id);
    }

    function nextPage() {
        props.history.push("/search?term=" + searchTerm + "&page=" + (parseInt(new URLSearchParams(window.location.search).get("page")) + 1).toString());
    }

    return (
        <div id="searchresult">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>{searchTerm}</title>
            </Helmet>
            <ul id="searchlist">
                {results}
            </ul>
            <button onClick={firstPage}>First</button>
            <button onClick={previousPage}>Previous</button>
            <ul className="pages_list">{pages}</ul>
            <button onClick={nextPage}>Next</button>
            <button onClick={lastPage}>Last</button>
        </div>);
}