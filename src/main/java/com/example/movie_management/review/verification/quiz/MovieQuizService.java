package com.example.movie_management.review.verification.quiz;


import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@NoArgsConstructor
public class MovieQuizService {

    @Autowired
    private MovieQuizRepository movieQuizRepository;

    public HashMap<String, String> answers = new HashMap<>();

    public void addToQuizRepository(MovieQuiz movieQuiz) {

        movieQuizRepository.save(movieQuiz);
    }

    public Optional<String> getCorrectAnswer(int movieId, String question) {
        Optional<MovieQuiz> quiz = movieQuizRepository.findById(movieId);
        if (quiz.isPresent()) {
            for (QuizElement quizElement : quiz.get().getQuizElements()) {
                if (quizElement.getQuestion().equals(question))
                    return Optional.of(quizElement.getCorrectAnswer());
            }
        }
        return Optional.empty();
    }

    public double getScore(int movieId) {
        int count=0;
        for(Map.Entry<String, String> entry: answers.entrySet()){
            if(entry.getValue().equals(getCorrectAnswer(movieId,entry.getKey()).get())) {
                count++;
            }
        }
        return count/getQuizElementsForMovie(movieId).get().size();
    }

    public Optional<List<QuizElementDto>> getQuizElementsForMovie(int movieId) {
        Optional<MovieQuiz> quiz = movieQuizRepository.findById(movieId);
        if (quiz.isEmpty()) {
            return Optional.empty();
        }
        List<QuizElementDto> resultElements = new ArrayList<>();

        for (QuizElement quizElement : quiz.get().getQuizElements()) {

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

    public boolean doesQuizExistsForMovie(int movieId) {
        Optional<MovieQuiz> movieQuiz = movieQuizRepository.findById(movieId);
        if(movieQuiz.isEmpty() || movieQuiz.get().getQuizElements().isEmpty())
            return false;
        return true;
    }

    public void resetAnswers() {
        answers.clear();
    }


}
