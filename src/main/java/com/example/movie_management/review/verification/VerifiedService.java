package com.example.movie_management.review.verification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class VerifiedService {

    @Autowired
    private VerifiedRepository verifiedRepository;

    public void addToVerifiedMovies(String nickname, int movieId) {
        Optional<Verified> verified= verifiedRepository.findById(nickname);
        if(verified.isEmpty()){
            verifiedRepository.save(new Verified(nickname, Set.of(movieId)));
        }
        else {
            Set<Integer> movieIds= verified.get().getMovieIds();
            movieIds.add(movieId);
            verifiedRepository.save(new Verified(nickname, movieIds));
        }
    }

    public Optional<Set<Integer>> getVerifiedMoviesForUser(String nickname) {
        Optional<Verified> verified = verifiedRepository.findById(nickname);
        if(verified.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(verified.get().getMovieIds());
    }

    public boolean isUserVerifiedForMovie(String nickname, int movieId) {
        Optional<Set<Integer>> movieIds = getVerifiedMoviesForUser(nickname);
        if(movieIds.isPresent()) {
            for (Integer id : movieIds.get()) {
                if (id == movieId)
                    return true;
            }
        }
        return false;
    }

}
