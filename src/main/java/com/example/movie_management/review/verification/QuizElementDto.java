package com.example.movie_management.review.verification;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class QuizElementDto {
    private String question;

    private List<String> answers = new ArrayList<>();
}
