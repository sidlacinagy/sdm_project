package com.example.movie_management.movie.logger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Log {

    private int movieId;

    private String date;

    public Log(int movieId){
        this.movieId=movieId;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.date = LocalDateTime.now().format(formatter);
    }

}
