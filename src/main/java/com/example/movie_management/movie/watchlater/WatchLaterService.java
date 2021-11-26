package com.example.movie_management.movie.watchlater;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class WatchLaterService {

    @Autowired
    private WatchLaterRepository watchLaterRepository;

    public void addToList(String email, int movieId) {
        Optional<WatchLater> watchLater = watchLaterRepository.findById(email);
        if (watchLater.isEmpty()){
            initializeWatchLater(email);
            watchLater = watchLaterRepository.findById(email);
        }

        if (!watchLater.get().getMovies().contains(movieId)) {
            watchLater.get().getMovies().add(movieId);
            watchLaterRepository.save(watchLater.get());
        }
    }

    public List<Integer> getWatchLaterList(String email) {
        Optional<WatchLater> watchLater = watchLaterRepository.findById(email);
        if (watchLater.isPresent()) {
            return watchLater.get().getMovies();
        }
        return List.of();
    }

    public boolean isMovieAlreadyInList(String email, int movieId) {
        WatchLater watchLater = watchLaterRepository.findById(email).orElseThrow(()-> new IllegalStateException("Watch Later list does not exist."));
        return watchLater.getMovies().contains(movieId);
    }

    public void deleteMovieFromWatchLaterList(String email, Integer movieId) {
        WatchLater watchLater = watchLaterRepository.findById(email).orElseThrow(()->new IllegalStateException("Cannot delete movie."));
        watchLater.getMovies().remove(movieId);
        watchLaterRepository.save(watchLater);
    }

    public void initializeWatchLater(String email) {
        watchLaterRepository.save(new WatchLater(email));
    }


}
