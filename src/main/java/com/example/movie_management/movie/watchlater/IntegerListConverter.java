package com.example.movie_management.movie.watchlater;

import javax.persistence.AttributeConverter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class IntegerListConverter implements AttributeConverter<List<Integer>, String> {

    @Override
    public String convertToDatabaseColumn(List<Integer> integers) {
        return integers != null ? integers.stream().map(Object::toString).collect(Collectors.joining("-")) : "";
    }

    @Override
    public List<Integer> convertToEntityAttribute(String s) {
        return !Objects.equals(s, "") ? Stream.of(s.split("-")).map(Integer::parseInt).collect(Collectors.toList()) : new ArrayList<>();
    }
}
