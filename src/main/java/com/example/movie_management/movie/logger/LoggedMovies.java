package com.example.movie_management.movie.logger;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class LoggedMovies {

    @Id
    private String email;

    @Convert(converter = LogConverter.class)
    private List<Log> logs = new ArrayList<>();

    public LoggedMovies(String email){
        this.email=email;
    }

}
