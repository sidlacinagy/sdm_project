package com.example.movie_management.review.verification.quiz;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
public class MovieQuiz {

    @Id
    private int movieId;

    @Convert(converter = QuizElementConverter.class)
    private List<QuizElement> quizElements = new ArrayList<>();


}
