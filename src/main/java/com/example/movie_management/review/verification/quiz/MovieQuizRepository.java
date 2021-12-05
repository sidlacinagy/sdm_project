package com.example.movie_management.review.verification.quiz;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieQuizRepository extends CrudRepository<MovieQuiz, Integer> {

}
