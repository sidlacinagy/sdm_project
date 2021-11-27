package com.example.controllers;

import com.example.movie_management.apihelper.ApiCall;
import com.example.movie_management.apihelper.Caller;
import com.example.movie_management.movie.*;
import com.example.movie_management.movie.watchlater.WatchLaterService;
import com.example.movie_management.review.Review;
import com.example.movie_management.review.ReviewService;
import com.example.movie_management.search.SearchResult;
import com.example.controllers.requests.ModifyWatchLaterRequest;
import com.example.controllers.requests.RecommendationRequest;
import com.example.controllers.requests.SearchRequest;
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

    @Autowired
    private ReviewService reviewService;

    @PostMapping(path = "/search")
    public ResponseEntity<?> getSearchedMovie(@RequestBody SearchRequest searchRequest) throws IOException {
        Caller<SearchResult> caller = new Caller<>(SearchResult.class);
        SearchResult searchResult = caller.call(ApiCall.SEARCH_BY_MOVIE_NAME.setParameters(URLEncoder.encode(searchRequest.getSearchTerm(),
                StandardCharsets.UTF_8), searchRequest.getPage()));
        return ResponseEntity.ok(searchResult);
    }

    @PostMapping(path = "/movie")
    public ResponseEntity<?> loadMovie(@RequestBody String id) throws IOException {
        if(id.charAt(id.length()-1) == '=')
            id = id.substring(0, id.length()-1);
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
        Recommendation recommendation = caller.call(ApiCall.GET_RECOMMENDATIONS.setParameters(recommendationRequest.getMovie_id(),
                recommendationRequest.getPage()));
        return ResponseEntity.ok(recommendation);
    }

    @PostMapping(path = "/videos")
    public ResponseEntity<?> loadVideos(@RequestBody String id) throws IOException {
        Caller<Video> caller = new Caller<>(Video.class);
        Video video = caller.call(ApiCall.GET_VIDEOS.setParameters(id));
        return ResponseEntity.ok(video);
    }

    @PostMapping(path = "/review_create")
    public ResponseEntity<?> createReview(Principal user, @RequestBody Review review) throws IOException {
        User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
        review.getKey().setNickname(userObj.getNickname());
        return ResponseEntity.ok(reviewService.createReview(review));
    }

    @PostMapping(path = "/review_delete")
    public ResponseEntity<?> deleteReview(Principal user, @RequestBody Review review) throws IOException {
        User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
        review.getKey().setNickname(userObj.getNickname());
        reviewService.deleteReview(review);
        return ResponseEntity.ok("Review deleted");
    }

    @PostMapping(path = "/review_user")
    public ResponseEntity<?> getReviewsByUsername(@RequestBody String nickname) {
        List<Review> reviews = reviewService.findAllByNickname(nickname.substring(0,nickname.length()-1));
        return ResponseEntity.ok(reviews);
    }

    @PostMapping(path = "/review_movie")
    public ResponseEntity<?> getReviewsByMovieId(@RequestBody String movieId) {
        List<Review> reviews = reviewService.findAllByMovieId(Integer.parseInt(movieId.substring(0, movieId.length() - 1)));
        return ResponseEntity.ok(reviews);
    }

    @PostMapping(path="/get_trending")
    public ResponseEntity<?> getTrendingMovies() throws IOException {
        Caller<SearchResult> trendingCaller= new Caller<>(SearchResult.class);
        SearchResult trending = trendingCaller.call(ApiCall.GET_TRENDING.getCall());
        return ResponseEntity.ok(trending);
    }

    @PostMapping(path = "/watchlater")
    public ResponseEntity<?> modifyWatchLater(Principal user, @RequestBody ModifyWatchLaterRequest modifyWatchLaterRequest) throws IOException {
        User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
        String userEmail = userObj.getEmail();
        String action = modifyWatchLaterRequest.getAction();

        if (action.equals("GET_LIST")) {
            List<Integer> watchLaterIds = watchLaterService.getWatchLaterList(userEmail);
            List<Movie> watchLaterList = new ArrayList<>();
            Caller<Movie> movieCaller = new Caller<>(Movie.class);
            for (Integer id : watchLaterIds) {
                watchLaterList.add(movieCaller.call(ApiCall.GET_MOVIE_BY_ID.setParameters(id.toString())));
            }
            return ResponseEntity.ok(watchLaterList);
        }
        String movie = modifyWatchLaterRequest.getMovie_id();

        int movie_id = Integer.parseInt(movie);
        if (action.equals("ADD")) {
            watchLaterService.addToList(userObj.getEmail(), movie_id);
            return ResponseEntity.ok(movie_id + " was added to WatchLater");
        }
        if (action.equals("REMOVE")) {
            watchLaterService.deleteMovieFromWatchLaterList(userEmail, movie_id);
            return ResponseEntity.ok(movie_id + " was removed from WatchLater");
        }

        return ResponseEntity.ok("bad");
    }
}
