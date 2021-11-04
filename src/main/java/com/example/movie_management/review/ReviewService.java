package com.example.movie_management.review;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@NoArgsConstructor
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public void createReview(Review review){
        reviewRepository.save(review);
    }

    public List<Review> findAllByNickname(String nickname){
        return new ArrayList<>(reviewRepository.findByNickname(nickname));
    }

    public List<Review> findAllByMovieId(int movieId){
        return new ArrayList<>(reviewRepository.findByMovieId(movieId));
    }

    public void modifyReview(Review newReview){
        reviewRepository.save(newReview);
    }

    public void deleteReview(Review review){
        reviewRepository.delete(review);
    }

}
