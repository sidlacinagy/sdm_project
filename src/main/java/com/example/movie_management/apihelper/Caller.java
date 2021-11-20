package com.example.movie_management.apihelper;

import com.example.movie_management.movie.Genres;
import com.example.movie_management.movie.Movie;
import com.example.movie_management.search.SearchResult;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Caller<T> {

    private final Class<T> type;

    public Caller(Class<T> type){
        this.type = type;
    }

    public Class<T> getType(){
        return this.type;
    }

    public T call(String apiCall) throws IOException {
        URL url = new URL(apiCall);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        if(Integer.toString(connection.getResponseCode()).charAt(0)!='2')
            throw new IllegalStateException("Cannot reach service");
        String result = readResponse(connection.getInputStream());
        connection.disconnect();
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(result, getType());
    }

    public static String readResponse(InputStream response) throws IOException {
        BufferedReader in = new BufferedReader(
                new InputStreamReader(response));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();
        return content.toString();
    }

}
