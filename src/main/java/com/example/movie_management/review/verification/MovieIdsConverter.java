package com.example.movie_management.review.verification;

import javax.persistence.AttributeConverter;
import java.util.HashSet;
import java.util.Set;


public class MovieIdsConverter implements AttributeConverter<Set<Integer>, String> {
    @Override
    public String convertToDatabaseColumn(Set<Integer> ints) {
        StringBuilder sb = new StringBuilder();
        for(int i: ints) {
            sb.append(i).append("#");
        }
        String result = sb.toString();
        return result.substring(0, result.length()-1);
    }

    @Override
    public Set<Integer> convertToEntityAttribute(String s) {
        Set<Integer> result = new HashSet<>();
        String[] strings = s.split("#");
        for(String str: strings) {
            result.add(Integer.parseInt(str));
        }
        return result;
    }
}
