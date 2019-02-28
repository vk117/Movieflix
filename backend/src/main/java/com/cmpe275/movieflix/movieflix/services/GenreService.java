package com.cmpe275.movieflix.movieflix.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import com.cmpe275.movieflix.movieflix.model.Genre;


public interface GenreService {

	public void add(Genre g);
	public ResponseEntity<Object> update(Genre g, int id);
	public void deleteGenre(int id);
	public Page<Genre> getGenre(Pageable p);
	public Genre getGenreBySlug(String s);
	
}
