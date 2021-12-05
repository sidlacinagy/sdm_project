package com.example.movie_management.review.verification;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerifiedRepository extends CrudRepository<Verified, String> {
}
