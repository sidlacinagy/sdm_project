package com.example.movie_management.movie;

import lombok.Data;

import java.util.List;

@Data
public class Video {

    int id;
    List<Result> results;

    @Data
    public static class Result{
       String iso_639_1;
       String iso_3166_1;
       String name;
       String key;
       String site;
       String size;
       String type;
       boolean official;
       String published_at;
       String id;
    }
}
