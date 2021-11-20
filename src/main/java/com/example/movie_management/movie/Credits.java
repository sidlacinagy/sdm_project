package com.example.movie_management.movie;

import lombok.Data;

import java.util.List;

@Data
public class Credits {

    int id;

    List<Cast> cast;

    List<Crew> crew;

    @Data
    public static class Cast{
        boolean adult;
        int gender;
        int id;
        String known_for_department;
        String name;
        String original_name;
        int popularity;
        String profile_path;
        int cast_id;
        String character;
        String credit_id;
        int order;
    }

    @Data
    public static class Crew{
        boolean adult;
        int gender;
        int id;
        String known_for_department;
        String name;
        String original_name;
        int popularity;
        String profile_path;
        String credit_id;
        String department;
        String job;
    }
}
