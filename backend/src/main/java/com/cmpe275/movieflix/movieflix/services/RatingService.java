package com.cmpe275.movieflix.movieflix.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.cmpe275.movieflix.movieflix.model.Movies;
import com.cmpe275.movieflix.movieflix.model.Rating;

public interface RatingService {
	public void createRating(Rating rating);
	public int getAvgById(int movie_id);
	public List<Movies> movieObjs(int days);
}
