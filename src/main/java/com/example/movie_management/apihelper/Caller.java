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

    public static String poster = "https://image.tmdb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg";

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
        System.out.println(result);
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

    public String getRandomTrendingPoster() {

        Caller<SearchResult> trendingCaller = new Caller<>(SearchResult.class);
        SearchResult trending = null;
        try {
            trending = trendingCaller.call(ApiCall.GET_TRENDING.getCall());
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<String> trendingPosters = trending.getResults().stream().map(m->"https://image.tmdb.org/t/p/original"+m.getPoster_path()).collect(Collectors.toList());
        Random rnd = new Random();
        return trendingPosters.get(rnd.nextInt(trendingPosters.size()));
    }

    public static void main(String[] args) throws IOException {

        //System.out.println(getRandomTrendingPoster());


        Caller<SearchResult> searchResultCaller = new Caller<>(SearchResult.class);
        Caller<Movie> movieCaller = new Caller<>(Movie.class);

        Scanner scanner= new Scanner(System.in);
        System.out.print("Enter the title: ");
        String movieName = scanner.nextLine();


        int pageNumber = 1;
        SearchResult searchResult = searchResultCaller.call(ApiCall.SEARCH_BY_MOVIE_NAME.setParameters(URLEncoder.encode(movieName, StandardCharsets.UTF_8),Integer.toString(pageNumber)));
        for(SearchResult.ResultMovie result : searchResult.getResults()){
            System.out.println(result.getTitle());
        }

        System.out.println("0-"+searchResult.getTotal_results()+": ");


        String num = scanner.nextLine();
        int id = searchResult.getResults().get(Integer.parseInt(num)).getId();

        Movie movie = movieCaller.call(ApiCall.GET_MOVIE_BY_ID.setParameters(Integer.toString(id)));
        System.out.println("https://image.tmdb.org/t/p/original"+movie.poster_path);


        Caller<Genres> genreCaller = new Caller(Genres.class);
        Genres genres = genreCaller.call(ApiCall.GET_GENRE_LIST.getCall());
        System.out.println(genres.getGenres().get(0).getName());

    }
}
