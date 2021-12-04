package com.example.movie_management.review.verification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizElement {
    private String question;

    private String correctAnswer;

    private List<String> wrongAnswers = new ArrayList<>();

}
