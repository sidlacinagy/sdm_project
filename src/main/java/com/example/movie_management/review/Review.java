package com.example.movie_management.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@Entity
public class Review {
    @EmbeddedId
    private Key key;
    private int rating;
    private String comment;
    private boolean verified;
    private String reviewDate;

    public Review(String nickname, int movieId, int rating, String comment, boolean verified) {
        this.key = new Key(nickname, movieId);
        this.rating = rating;
        this.comment = comment;
        this.verified = verified;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.reviewDate = LocalDateTime.now().format(formatter);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    static class Key implements Serializable {
        @Column(nullable = false)
        private String nickname;

        @Column(nullable = false)
        private int movieId;
    }
}
