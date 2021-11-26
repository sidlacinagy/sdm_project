package com.example.movie_management.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Review {

    @EmbeddedId
    private Key key;
    private double rating;
    private String comment;
    private boolean verified;
    private String reviewDate;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    static public class Key implements Serializable {
        @Column(nullable = false)
        private String nickname;

        @Column(nullable = false)
        private int movieId;
    }
}
