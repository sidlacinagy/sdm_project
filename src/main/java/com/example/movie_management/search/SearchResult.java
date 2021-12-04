package com.example.movie_management.search;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
public class SearchResult {
    int page;
    int total_pages;
    List<ResultMovie> results;
    int total_results;

    @Data
    public static class ResultMovie{
        String poster_path;

        boolean adult;

        String overview;

        String release_date;

        int[] genre_ids;

        int id;

        String original_title;

        String original_language;

        String title;

        String backdrop_path;

        double popularity;

        int vote_count;

        boolean video;

        double vote_average;

        @JsonProperty
        double ratings;

        @JsonProperty
        double verified_rating;

        @JsonIgnore
        String media_type;

        @JsonIgnore
        public double getRatings(){
            return ratings;
        }
        @JsonIgnore
        public double getVerifiedRatings(){
            return verified_rating;
        }

        @JsonProperty
        public void setRatings(double ratings) {
            this.ratings = ratings;
        }

        @JsonProperty
        public void setVerified_rating(double verified_rating) {
            this.verified_rating = verified_rating;
        }
    }
}

