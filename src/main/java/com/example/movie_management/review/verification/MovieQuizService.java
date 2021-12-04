package com.example.movie_management.review.verification;


import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@NoArgsConstructor
public class MovieQuizService {

    @Autowired
    private MovieQuizRepository movieQuizRepository;

    public void addToQuizRepository(MovieQuiz movieQuiz){

        movieQuizRepository.save(movieQuiz);
    }

    public Optional<String> getCorrectAnswer(int movieId, String question){
        Optional<MovieQuiz> quiz = movieQuizRepository.findById(movieId);
        if(quiz.isPresent()) {
            for (QuizElement quizElement : quiz.get().getQuizElements()) {
                if (quizElement.getQuestion().equals(question))
                    return Optional.of(quizElement.getCorrectAnswer());
            }
        }
        return Optional.empty();
    }

    public Optional<List<QuizElementDto>> getQuizElementsForMovie(int movieId) {
        Optional<MovieQuiz> quiz = movieQuizRepository.findById(movieId);
        if(quiz.isEmpty()){
            return Optional.empty();
        }
        List<QuizElementDto> resultElements= new ArrayList<>();

        for(QuizElement quizElement: quiz.get().getQuizElements()){

            List<String> answer = List.of(quizElement.getCorrectAnswer());
            List<String> answers = Stream.concat(answer.stream(), quizElement.getWrongAnswers().stream())
                    .collect(Collectors.toList());
            Collections.shuffle(answers);
            QuizElementDto quizDtoElement = QuizElementDto.builder()
                    .question(quizElement.getQuestion())
                    .answers(answers)
                    .build();
            resultElements.add(quizDtoElement);

        }
        return Optional.of(resultElements);
    }



}
