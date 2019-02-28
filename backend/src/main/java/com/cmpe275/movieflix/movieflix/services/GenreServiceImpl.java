package com.cmpe275.movieflix.movieflix.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cmpe275.movieflix.movieflix.Slug;
import com.cmpe275.movieflix.movieflix.model.Genre;
import com.cmpe275.movieflix.movieflix.model.Movies;
import com.cmpe275.movieflix.movieflix.repositories.GenreRepository;

@Service
public class GenreServiceImpl implements GenreService {

	@Autowired
	GenreRepository repo;
	
	
	@Override
	public void add(Genre g) {
		String slug = Slug.preProcessingGenre(g, repo.findAll());
		g.setSlug(slug);
		repo.save(g);
	}

	@Override
	public ResponseEntity<Object> update(Genre g, int id) {
		Optional<Genre> genreOptional = repo.findById(id);
		if(!genreOptional.isPresent()) 
			return ResponseEntity.notFound().build();
		String slug = Slug.preProcessingGenre(g, repo.findAll());
		g.setId(id);
		g.setCreated_at(repo.findById(id).get().getCreated_at());
		g.setSlug(slug);
		repo.save(g);
		return ResponseEntity.noContent().build();
	}

	@Override
	public void deleteGenre(int id) {
		Genre g = repo.findById(id).get();
		for(Movies m : g.getMovies()) {
			m.getGenres().remove(g);
		}
		repo.deleteById(id);
	}


	@Override
	public Page<Genre> getGenre(Pageable p) {
		return repo.findAll(p);
	}

	@Override
	public Genre getGenreBySlug(String s) {
		return repo.findBySlug(s);
	}
	

}
