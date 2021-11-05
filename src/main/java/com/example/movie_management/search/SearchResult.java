package com.example.movie_management.search;

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
    }
}

