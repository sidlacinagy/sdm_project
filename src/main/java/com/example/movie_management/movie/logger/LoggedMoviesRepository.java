package com.example.movie_management.movie.logger;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoggedMoviesRepository extends CrudRepository<LoggedMovies, String> {
}
