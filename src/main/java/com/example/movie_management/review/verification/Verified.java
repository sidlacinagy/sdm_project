package com.example.movie_management.review.verification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Set;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Verified {
    @Id
    private String nickname;

    @Convert(converter = MovieIdsConverter.class)
    private Set<Integer> movieIds;
}
