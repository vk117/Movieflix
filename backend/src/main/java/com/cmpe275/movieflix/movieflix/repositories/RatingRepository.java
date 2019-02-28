package com.cmpe275.movieflix.movieflix.repositories;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.cmpe275.movieflix.movieflix.model.Rating;

@Transactional
public interface RatingRepository extends JpaRepository<Rating, Integer> {
	@Query(value="SELECT rating FROM Rating WHERE movie_id=?1")
	ArrayList<Integer>findByMovieId(int id);
	
	
	
}
