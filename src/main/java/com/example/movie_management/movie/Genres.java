package com.example.movie_management.movie;

import lombok.Data;

import java.util.List;

@Data
public class Genres {

    List<Genre> genres;

    @Data
    public static class Genre {
        public int id;
        public String name;
    }

}
