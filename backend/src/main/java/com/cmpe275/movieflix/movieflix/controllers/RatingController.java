package com.cmpe275.movieflix.movieflix.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmpe275.movieflix.movieflix.model.Movies;
import com.cmpe275.movieflix.movieflix.model.Rating;

import com.cmpe275.movieflix.movieflix.services.RatingService;

@RestController
@RequestMapping("/v1/api/movie/rating")
public class RatingController {

	@Autowired
	RatingService ratingService;
	
	@PostMapping
	public void createSubscription(@RequestBody Rating rating ) {
		ratingService.createRating(rating);
	}
	// Pull
	@GetMapping(path="/{movie_id}")
	public int getAverageMovieRating(@PathVariable String movie_id) {
		int parsedId = Integer.parseInt(movie_id);
		int rating_avg;
		rating_avg=ratingService.getAvgById(parsedId);
		return rating_avg;
	}
	

		
	@GetMapping(path="/toprated/{days}")
	public List<Movies> topMovies(@PathVariable String days){
		int parsedDays = Integer.parseInt(days);
		List<Movies> m = ratingService.movieObjs(parsedDays);
		return m;
	} 
	
}
