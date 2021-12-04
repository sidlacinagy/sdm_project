package com.example.movie_management.review;

import com.example.user_management_system.user.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserService userService;

    public Review createReview(Review review) {
        userService.getUserByNickname(review.getKey().getNickname()).orElseThrow(() -> new IllegalStateException("No such username"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        review.setReviewDate(LocalDate.now().format(formatter));
        reviewRepository.save(review);
        return review;
    }

    public List<Review> findAllByNickname(String nickname) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<Review> reviews = new ArrayList<>(reviewRepository.findByNickname(nickname))
                .stream()
                .sorted(Comparator.comparing((review) -> LocalDate.parse(review.getReviewDate(), formatter)))
                .collect(Collectors.toList());
        Collections.reverse(reviews);
        return reviews;
    }

    public List<Review> findAllByMovieId(int movieId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<Review> reviews = new ArrayList<>(reviewRepository.findByMovieId(movieId))
                .stream()
                .sorted(Comparator.comparing((review) -> LocalDate.parse(review.getReviewDate(), formatter)))
                .collect(Collectors.toList());
        Collections.reverse(reviews);
        return reviews;
    }

    public List<Review> findAllByNicknameAndMovieId(String nickname, int movieId) {
        return new ArrayList<>(reviewRepository.findByNicknameAndMovieId(nickname, movieId));
    }

    public Double getRatingForMovie(int movieId){
        List<Review> reviews = findAllByMovieId(movieId);
        if(reviews.isEmpty()){
            return -1.0;
        }
        double sum = 0.0;
        for(Review review: reviews){
            sum+=review.getRating();
        }
        return sum/reviews.size();
    }

    public void modifyReview(Review newReview) {
        reviewRepository.save(newReview);
    }

    public void deleteReview(Review review) {
        reviewRepository.delete(review);
    }

}
