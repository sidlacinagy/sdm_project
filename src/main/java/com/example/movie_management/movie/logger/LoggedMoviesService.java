package com.example.movie_management.movie.logger;


import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class LoggedMoviesService {

    @Autowired
    private LoggedMoviesRepository loggedMoviesRepository;

    public void addLog(String email, int movieId){
        LoggedMovies loggedMovies=getLogs(email);
        loggedMovies.getLogs().add(new Log(movieId));
        loggedMoviesRepository.save(loggedMovies);
    }

    public List<String> getLogDates(String email, int movieId){
        LoggedMovies loggedMovies=getLogs(email);
        List<String> dates=new ArrayList<>();
        for(Log log : loggedMovies.getLogs()){
            if(log.getMovieId()==movieId){
                dates.add(log.getDate());
            }
        }
        return dates;
    }


    public LoggedMovies getLogs(String email){
        return getValidLogs(loggedMoviesRepository.findById(email),"Cannot find logs.");
    }

    public void initializeLogs(String email) {
        loggedMoviesRepository.save(new LoggedMovies(email));
    }



    public LoggedMovies getValidLogs(Optional<LoggedMovies> logs, String exception) {
        if (logs.isPresent()) {
            return logs.get();
        } else {
            throw new IllegalStateException(exception);
        }
    }

}
