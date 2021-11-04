package com.example.movie_management.review.verification;


import com.example.movie_management.movie.WatchLater;
import com.example.movie_management.movie.WatchLaterRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class MovieQuizService {

    @Autowired
    private MovieQuizRepository movieQuizRepository;

    public void addToQuizRepository(MovieQuiz movieQuiz){

        movieQuizRepository.save(movieQuiz);
    }

    public List<QuizElement> getQuizElements(int id) {
        return getValidMovieQuiz(movieQuizRepository.findById(id), "Movie Quiz does not exist.").getQuizElements();
    }

    public MovieQuiz getValidMovieQuiz(Optional<MovieQuiz> movieQuiz, String exception) {
        if (movieQuiz.isPresent()) {
            return movieQuiz.get();
        } else {
            throw new IllegalStateException(exception);
        }
    }

}
