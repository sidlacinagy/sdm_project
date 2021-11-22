package com.example.movie_management.movie;

import lombok.Data;

import java.util.List;

@Data
public class Image {

    int id;
    List<BackdropOrPosterOrLogo> backdrops;
    List<BackdropOrPosterOrLogo> posters;
    List<BackdropOrPosterOrLogo> logos;

    @Data
    public static class BackdropOrPosterOrLogo{
        int aspect_ratio;
        String file_path;
        int height;
        String iso_639_1;
        int vote_average;
        int vote_count;
        int width;
    }

}
