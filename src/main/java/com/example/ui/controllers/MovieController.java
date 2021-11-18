package com.example.ui.controllers;

import com.example.movie_management.apihelper.ApiCall;
import com.example.movie_management.apihelper.Caller;
import com.example.movie_management.movie.Movie;
import com.example.movie_management.search.SearchResult;
import com.example.ui.requests.SearchRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.SQLOutput;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MovieController {

    @PostMapping(path = "/search")
    public ResponseEntity<?> getSearchedMovie(@RequestBody SearchRequest searchRequest) throws IOException {
        Caller<SearchResult> caller = new Caller<>(SearchResult.class);
        SearchResult searchResult = caller.call(ApiCall.SEARCH_BY_MOVIE_NAME.setParameters(URLEncoder.encode(searchRequest.getSearchTerm()
                , StandardCharsets.UTF_8), searchRequest.getPage()));
        return ResponseEntity.ok(searchResult.getResults());
    }

    @PostMapping(path = "/movie")
    public ResponseEntity<?> loadMovie(@RequestBody String id) throws IOException {
        Caller<Movie> caller = new Caller<>(Movie.class);
        Movie movie = caller.call(ApiCall.GET_MOVIE_BY_ID.setParameters(id));
        return ResponseEntity.ok(movie);
    }
}
