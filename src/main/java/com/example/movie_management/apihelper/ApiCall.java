package com.example.movie_management.apihelper;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public enum ApiCall {
    SEARCH_BY_MOVIE_NAME("https://api.themoviedb.org/3/search/movie?api_key=","&query=%s&page=%s"),
    GET_MOVIE_BY_ID("https://api.themoviedb.org/3/movie/%s?api_key=","&language=en-US"),
    GET_GENRE_LIST("https://api.themoviedb.org/3/genre/movie/list?api_key=","&language=en-US"),
    GET_TRENDING("https://api.themoviedb.org/3/trending/movie/week?api_key=",""),
    GET_CREDITS("https://api.themoviedb.org/3/movie/%s/credits?api_key=","&language=en-US"),
    GET_IMAGES("https://api.themoviedb.org/3/movie/%s/images?api_key=","&language=en-US"),
    GET_RECOMMENDATIONS("https://api.themoviedb.org/3/movie/%s/recommendations?api_key=", "&language=en-US&page=%s"),
    GET_VIDEOS("https://api.themoviedb.org/3/movie/%s/videos?api_key=","&language=en-US");

    String call;

    ApiCall(String callStart, String callEnd){
        this.call=callStart+getAPI_KEY()+callEnd;
    }

    private static String getAPI_KEY(){
        try (InputStream input = new FileInputStream("src/main/resources/application.properties")) {
            Properties prop = new Properties();
            prop.load(input);
            return prop.getProperty("TheMovieDBApiToken");

        } catch (IOException ex) {
            throw new IllegalStateException("Cannot obtain API key");
        }
    }

    public String getCall(){
        return this.call;
    }

    public String setParameters(String str, String... moreStrs){

        String[] args = new String[moreStrs.length + 1];

        System.arraycopy(moreStrs, 0, args, 1, moreStrs.length);
        args[0] = str;

        return String.format(this.call, args);

    }

}
