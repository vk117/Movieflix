package com.cmpe275.movieflix.movieflix.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.cmpe275.movieflix.movieflix.model.FilterRequest;
import com.cmpe275.movieflix.movieflix.model.Movies;

public interface MovieService {

	public void add(Movies m);
	public ResponseEntity<Object> update(Movies m, int id);
	public void updateReviews(Movies m, int id);
	public ResponseEntity<Object> deleteMovie(int id);
	public Page<Movies> getMovies(Pageable p);
	public Movies getMovieBySlug(String slug);
	public List<Movies> searchForMovies(FilterRequest req);
	public List<Movies> getRecommendedMovies(int userId);
}
