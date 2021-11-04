package com.example.movie_management.movie;

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
        WatchLater watchLater = getValidWatchLater(watchLaterRepository.findById(email), "Cannot add movie to Watch Later list.");
        if (!watchLater.getMovies().contains(movieId)) {
            watchLater.getMovies().add(movieId);
            watchLaterRepository.save(watchLater);
        }
    }

    public List<Integer> getWatchLaterList(String email) {
        WatchLater watchLater = getValidWatchLater(watchLaterRepository.findById(email), "Watch Later list does not exist.");
        return watchLater.getMovies();
    }

    public boolean isMovieAlreadyInList(String email, int movieId) {
        WatchLater watchLater = getValidWatchLater(watchLaterRepository.findById(email), "Watch Later list does not exist.");
        return watchLater.getMovies().contains(movieId);
    }

    public void deleteMovieFromWatchLaterList(String email, int movieId) {
        WatchLater watchLater = getValidWatchLater(watchLaterRepository.findById(email), "Cannot delete movie.");
        watchLaterRepository.delete(watchLater);
    }

    public void initializeWatchLater(String email) {
        watchLaterRepository.save(new WatchLater(email));
    }

    public WatchLater getValidWatchLater(Optional<WatchLater> watchLater, String exception) {
        if (watchLater.isPresent()) {
            return watchLater.get();
        } else {
            throw new IllegalStateException(exception);
        }
    }

}
