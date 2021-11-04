package com.example.movie_management.review.verification;

import javax.persistence.AttributeConverter;
import java.util.ArrayList;
import java.util.List;

public class QuizElementConverter implements AttributeConverter<List<QuizElement>, String> {


    @Override
    public String convertToDatabaseColumn(List<QuizElement> quizElements) {
        StringBuilder str = new StringBuilder();
        for (QuizElement element : quizElements) {
            str.append(element.getQuestion()).append("#").append(element.getCorrectAnswer()).append("#").append(String.join("#", element.getWrongAnswers())).append("~");

        }
        return str.substring(0, str.length() - 1);
    }

    @Override
    public List<QuizElement> convertToEntityAttribute(String s) {

        List<QuizElement> quizElements = new ArrayList<>();
        List<String> elements = List.of(s.split("~"));

        for (String element : elements) {
            List<String> elementList = List.of(element.split("#"));
            quizElements.add(new QuizElement(elementList.get(0),
                    elementList.get(1),
                    elementList.subList(2, elementList.size())));
        }
        return quizElements;
    }
}
