package com.example.movie_management.movie;

import lombok.Data;

import java.util.List;

@Data
public class Recommendation {
    int page;
    List<Result> results;
    int total_pages;
    int total_results;

    @Data
    public static class Result{

        String poster_path;
        boolean adult;
        String overview;
        String release_date;
        List<Integer> genre_ids;
        int id;
        String original_title;
        String original_language;
        String title;
        String backdrop_path;
        double popularity;
        int vote_count;
        boolean video;
        double vote_average;
        String media_type;
    }
}
