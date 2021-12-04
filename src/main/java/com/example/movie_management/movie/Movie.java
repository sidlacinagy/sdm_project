package com.example.movie_management.movie;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class Movie{
    public boolean adult;
    public String backdrop_path;
    public BelongsToCollection belongs_to_collection;
    public long budget;
    public List<Genre> genres;
    public String homepage;
    public int id;
    public String imdb_id;
    public String original_language;
    public String original_title;
    public String overview;
    public double popularity;
    public String poster_path;
    public List<ProductionCompany> production_companies;
    public List<ProductionCountry> production_countries;
    public String release_date;
    public long revenue;
    public int runtime;
    public List<SpokenLanguage> spoken_languages;
    public String status;
    public String tagline;
    public String title;
    public boolean video;
    public double vote_average;
    public int vote_count;
    @JsonProperty
    double ratings;

    @JsonProperty
    double verified_rating;

    @Data
    public static class BelongsToCollection{
        public int id;
        public String name;
        public String poster_path;
        public String backdrop_path;
    }

    @Data
    public static class Genre{
        public int id;
        public String name;
    }

    @Data
    public static class ProductionCompany{
        public int id;
        public String logo_path;
        public String name;
        public String origin_country;
    }

    @Data
    public static class ProductionCountry{
        public String iso_3166_1;
        public String name;
    }

    @Data
    public static class SpokenLanguage{
        public String english_name;
        public String iso_639_1;
        public String name;
    }

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