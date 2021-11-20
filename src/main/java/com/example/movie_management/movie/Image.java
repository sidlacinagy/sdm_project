package com.example.movie_management.movie;

import lombok.Data;

import java.util.List;

@Data
public class Image {

    int id;

    List<Backdrop> backdrops;

    List<Poster> posters;

    @Data
    public static class Backdrop{
        int aspect_ratio;
        String file_path;
        int height;
        String iso_639_1;
        int vote_average;
        int vote_count;
        int width;
    }

    @Data
    public static class Poster{
        int aspect_ratio;
        String file_path;
        int height;
        String iso_639_1;
        int vote_average;
        int vote_count;
        int width;
    }
}
