package com.example.ui.controllers;

import com.example.movie_management.apihelper.ApiCall;
import com.example.movie_management.apihelper.Caller;
import com.example.movie_management.movie.*;
import com.example.movie_management.movie.watchlater.WatchLaterService;
import com.example.movie_management.search.SearchResult;
import com.example.ui.requests.ModifyWatchLaterRequest;
import com.example.ui.requests.RecommendationRequest;
import com.example.ui.requests.SearchRequest;
import com.example.user_management_system.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MovieController {

    @Autowired
    private WatchLaterService watchLaterService;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping(path = "/search")
    public ResponseEntity<?> getSearchedMovie(@RequestBody SearchRequest searchRequest) throws IOException {
        Caller<SearchResult> caller = new Caller<>(SearchResult.class);
        SearchResult searchResult = caller.call(ApiCall.SEARCH_BY_MOVIE_NAME.setParameters(URLEncoder.encode(searchRequest.getSearchTerm()
                , StandardCharsets.UTF_8), searchRequest.getPage()));
        return ResponseEntity.ok(searchResult);
    }

    @PostMapping(path = "/movie")
    public ResponseEntity<?> loadMovie(@RequestBody String id) throws IOException {
        Caller<Movie> caller = new Caller<>(Movie.class);
        Movie movie = caller.call(ApiCall.GET_MOVIE_BY_ID.setParameters(id));
        return ResponseEntity.ok(movie);
    }

    @PostMapping(path = "/credits")
    public ResponseEntity<?> loadCredits(@RequestBody String id) throws IOException {
        Caller<Credits> caller = new Caller<>(Credits.class);
        Credits credits = caller.call(ApiCall.GET_CREDITS.setParameters(id));
        return ResponseEntity.ok(credits);
    }

    @PostMapping(path = "/images")
    public ResponseEntity<?> loadImages(@RequestBody String id) throws IOException {
        Caller<Image> caller = new Caller<>(Image.class);
        Image image = caller.call(ApiCall.GET_IMAGES.setParameters(id));
        return ResponseEntity.ok(image);
    }

    @PostMapping(path = "/recommendations")
    public ResponseEntity<?> loadRecommendations(@RequestBody RecommendationRequest recommendationRequest) throws IOException {
        Caller<Recommendation> caller = new Caller<>(Recommendation.class);
        Recommendation recommendation = caller.call(ApiCall.GET_RECOMMENDATIONS.setParameters(recommendationRequest.getMovie_id(), recommendationRequest.getPage()));
        return ResponseEntity.ok(recommendation);
    }

    @PostMapping(path = "/videos")
    public ResponseEntity<?> loadVideos(@RequestBody String id) throws IOException {
        Caller<Video> caller = new Caller<>(Video.class);
        Video video = caller.call(ApiCall.GET_VIDEOS.setParameters(id));
        return ResponseEntity.ok(video);
    }

    @PostMapping(path = "/watchlater")
    public ResponseEntity<?> modifyWatchLater(Principal user, @RequestBody ModifyWatchLaterRequest modifyWatchLaterRequest) throws IOException {
        User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
        System.out.println(userObj.getEmail());
        String userEmail= userObj.getEmail();
        String action = modifyWatchLaterRequest.getAction();
        System.out.println(modifyWatchLaterRequest.getAction());

        if(action.equals("GET_LIST")){
            List<Integer> watchLaterIds = watchLaterService.getWatchLaterList(userEmail);
            List<Movie> watchLaterList = new ArrayList<>();
            Caller<Movie> movieCaller = new Caller<>(Movie.class);
            for(Integer id: watchLaterIds){
                watchLaterList.add(movieCaller.call(ApiCall.GET_MOVIE_BY_ID.setParameters(id.toString())));
            }
            return ResponseEntity.ok(watchLaterList);
        }
        String movie =modifyWatchLaterRequest.getMovie_id();
        System.out.println(movie);

        int movie_id = Integer.parseInt(movie);
        if(action.equals("ADD")) {
            watchLaterService.addToList(userObj.getEmail(), movie_id);
            return ResponseEntity.ok(movie_id+" was added to WatchLater");
        }
        if(action.equals("REMOVE")) {
            watchLaterService.deleteMovieFromWatchLaterList(userEmail, movie_id);
            return ResponseEntity.ok(movie_id+" was removed from WatchLater");
        }

        return ResponseEntity.ok("bad");
    }
}
