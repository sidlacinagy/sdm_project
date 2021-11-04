package com.example.movie_management.movie;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class WatchLater {

    @Id
    private String email;

    @Convert(converter = IntegerListConverter.class)
    private List<Integer> movies = new ArrayList<>();

    public WatchLater(String email) {
        this.email = email;
    }
}
