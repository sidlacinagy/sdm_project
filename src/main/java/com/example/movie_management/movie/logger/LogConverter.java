package com.example.movie_management.movie.logger;

import javax.persistence.AttributeConverter;
import java.util.ArrayList;
import java.util.List;

public class LogConverter implements AttributeConverter<List<Log>, String> {
    @Override
    public String convertToDatabaseColumn(List<Log> logs) {
        StringBuilder str= new StringBuilder();
        for(Log log : logs){
            str.append(log.getMovieId()).append("#").append(log.getDate()).append("~");
        }
        return !str.toString().equals("") ? str.substring(0, str.length() - 1) : "" ;
    }

    @Override
    public List<Log> convertToEntityAttribute(String s) {
        List<Log> result=new ArrayList<>();
        if("".equals(s)){
            return result;
        }

        String[] logs= s.split("~");
        for(String log: logs){
            String[] arr=log.split("#");

            result.add(new Log(Integer.parseInt(arr[0]),arr[1]));
        }
        return result;
    }
}
