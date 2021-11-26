package com.example.movie_management.review;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Review.Key> {

    @Query("SELECT r FROM Review r WHERE r.key.nickname = :nick")
    Collection<Review> findByNickname(@Param("nick") String nickname);

    @Query("SELECT r FROM Review r WHERE r.key.movieId = :id")
    Collection<Review> findByMovieId(@Param("id") int movieId);

    @Query("SELECT r FROM Review r WHERE r.key.nickname = :nick and r.key.movieId = :id")
    Collection<Review> findByNicknameAndMovieId(@Param("nick") String nickname, @Param("id") int movieId);
    
}
