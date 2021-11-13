import './App.css';
import React from "react";
import axios from "axios";

export class App extends React.Component {
    state = {
        movies: [],
        sources: []
    }

    componentDidMount() {
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=8912a6793a23de73d353e742ebcc9f72`)
            .then(res => {
                this.setState({
                    movies: res.data.results,
                    sources: []
                });
            });
        const links = this.state.movies.map((movie) =>
            movie.poster_path
        );
        let list = [];
        for (let i = 0; i < 3; i++) {
            const item = "https://image.tmdb.org/t/p/original" + links[Math.floor(Math.random() * links.length)];
            list.push(<img alt="error" className="img" src={item}/>);
        }
        this.setState({
            movies: this.movies,
            sources: list
        })
    }

    render() {
        return this.state.sources;
    }
}