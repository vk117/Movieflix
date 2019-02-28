package com.cmpe275.movieflix.movieflix.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cmpe275.movieflix.movieflix.model.Analytics;
import com.cmpe275.movieflix.movieflix.model.FilterRequest;
import com.cmpe275.movieflix.movieflix.model.Genre;
import com.cmpe275.movieflix.movieflix.model.Movies;
import com.cmpe275.movieflix.movieflix.repositories.GenreRepository;
import com.cmpe275.movieflix.movieflix.repositories.MovieRepository;

//import com.github.slugify.Slugify;
import com.cmpe275.movieflix.movieflix.Slug;


@Service
public class MovieServiceImpl implements MovieService {

	@Autowired
	MovieRepository repo;
	
	@Autowired
	GenreRepository grepo;
	
	@Autowired
	AnalyticsService analyticsService;
	
	@Override
	public void add(Movies m) {
		String slug = Slug.preProcessingMovie(m, repo.findAll());
		m.setSlug(slug);
		Set<Genre> toAdd = new HashSet<Genre>();
		for(Iterator<Genre> iterator = m.getGenres().iterator(); iterator.hasNext();) {
			Genre mg = iterator.next();
			Genre g = grepo.findById(mg.getId()).get();
			if(g != null) {
				System.out.println("not null");
				iterator.remove();
				toAdd.add(g);
			}
			else {
				System.out.println("null");
				String genreSlug = Slug.preProcessingGenre(mg, grepo.findAll());
				mg.setSlug(genreSlug);
				toAdd.add(g);
				continue;
			}
		}
		if(toAdd != null) {
			for(Genre g : toAdd) {
				m.getGenres().add(g);
			}
		}
		repo.save(m);
	}

	@Override
	public ResponseEntity<Object> deleteMovie(int id) {
		Optional<Movies> movieOptional = repo.findById(id);
		if(!movieOptional.isPresent())
			return ResponseEntity.notFound().build();
		Movies toSave = movieOptional.get();
		toSave.setIs_deleted(true);
		toSave.setId(id);
		repo.save(toSave);
		return ResponseEntity.noContent().build();
	}

	@Override
	public Page<Movies> getMovies(Pageable p) {
		return repo.findAll(p);
	}
	
	@Override
	public Movies getMovieBySlug(String slug) {
		return repo.findBySlug(slug);
	}
	
	@Override
	public void updateReviews(Movies m, int id) {
		
		Movies origMovie = repo.findById(id).get();
		origMovie.setReviews(m.getReviews());
		
		System.out.println(m.getReviews());
		
		repo.save(m);
		
	}

	@Override
	public ResponseEntity<Object> update(Movies m, int id) {
		Optional<Movies> movieOptional = repo.findById(id);
		if(!movieOptional.isPresent())
			return ResponseEntity.notFound().build();

		m.setId(id);
		m.setCreated_at(repo.findById(id).get().getCreated_at());
		m.setSlug(repo.findById(id).get().getSlug());
		/* ---------------------------------*/
		Set<Genre> toAdd = new HashSet<Genre>();
		
		System.out.println(m.getGenres());
		
		for(Iterator<Genre> iterator = m.getGenres().iterator(); iterator.hasNext();) {
			Genre mg = iterator.next();
			Genre g = grepo.findById(mg.getId()).get();
			if(g != null) {
				System.out.println("not null");
				iterator.remove();
				toAdd.add(g);
			}
			else {
				System.out.println("null");
				String genreSlug = Slug.preProcessingGenre(mg, grepo.findAll());
				mg.setSlug(genreSlug);
				toAdd.add(g);
				continue;
			}
		}
		if(toAdd != null) {
			for(Genre g : toAdd) {
				m.getGenres().add(g);
			}
		}
		/*-----------------------------------------------*/
		repo.save(m);
		return ResponseEntity.noContent().build();
	}
	
	@Override
	public List<Movies> searchForMovies(FilterRequest req){
		
		List<Movies> toRet = new ArrayList<Movies>();
		
		boolean initialized = false;
		
		if(req.getStr() != null) {
			System.out.println("by query");
			toRet = repo.findAll(Specification.where((MovieSpecification.nameIsSimilar(req.getStr())
				.or(MovieSpecification.descIsSimilar(req.getStr())
				.or(MovieSpecification.charactersAreSimilar(req.getStr()))))));
			initialized = true;
		}
		if(req.getMovie_rating() != null) {
			System.out.println("by Rating");
			if(initialized)
				toRet.retainAll(repo.findAll(Specification.where(MovieSpecification.movieRatingIs(req.getMovie_rating()))));
			else {
				toRet = repo.findAll(Specification.where(MovieSpecification.movieRatingIs(req.getMovie_rating())));
				initialized = true;
			}
		}
		if(req.getGenres() != null) {
			System.out.println("by Genre");
			Set<Movies> movies = new HashSet<Movies>();
			for(Genre g : req.getGenres()) {
				movies.addAll(grepo.findById(g.getId()).get().getMovies());
			}
			if(initialized)
				toRet.retainAll(movies);
			else {
				toRet.addAll(movies);
				initialized = true;
			}
			//System.out.println("Movies are "  + toRet);
		}
		if(req.getAvailable_in() != null) {
			System.out.println("by availability");
			if(initialized)
				toRet.retainAll(repo.findAll(Specification.where(MovieSpecification.available_in(req.getAvailable_in()))));
			else {
				toRet = repo.findAll(Specification.where(MovieSpecification.available_in(req.getAvailable_in())));
				initialized = true;
			}
		}
		if(req.getMovie_type() != null) {
			if(initialized)
				toRet.retainAll(repo.findAll(Specification.where(MovieSpecification.movie_type(req.getMovie_type()))));
			else {
				toRet = repo.findAll(Specification.where(MovieSpecification.movie_type(req.getMovie_type())));
				initialized = true;
			}
		}
		
		if(req.getSort() != null && req.getMode() != null) {
				switch(req.getSort()) {
					case "latest" : 
						Collections.sort(toRet, new Comparator<Movies>() {
							public int compare(Movies m1, Movies m2) {
								if(req.getMode().equals("asc"))
									return m1.getCreated_at().compareTo(m2.getCreated_at());
								else
									return m2.getCreated_at().compareTo(m1.getCreated_at());
							}
						});
						break;
						
					case "title" :
						Collections.sort(toRet, new Comparator<Movies>() {
							public int compare(Movies m1, Movies m2) {
								if(req.getMode().equals("asc"))
									return m1.getName().compareTo(m2.getName());
								else
									return m2.getName().compareTo(m1.getName());
							}
						});
						break;
					
					case "views" : 
						Collections.sort(toRet, new Comparator<Movies>() {
							public int compare(Movies m1, Movies m2) {
								if(req.getMode().equals("asc"))
									return ((Integer)m1.getViews()).compareTo(m2.getViews());
								else
									return ((Integer)m2.getViews()).compareTo(m1.getViews());
							}
						});
						break;
				}
		}
		
		return toRet;
	}

	@Override
	public List<Movies> getRecommendedMovies(int userId) {
		
		List<String> words = analyticsService.findSearchedMovies(userId);	
		List<Movies> movies = new ArrayList<Movies>();
		
		FilterRequest fr = new FilterRequest();
		
		for(String word : words) {
			fr.setStr(word);
			List<Movies> temp = searchForMovies(fr);
			
			for(Movies m : temp ) {
				movies.add(m);
			}
			
		}
		
		List<Movies> viewMovies = analyticsService.findUsersMoviesByView(userId);
		List<Integer> moviesId = new ArrayList();
		
		for(Movies m : viewMovies ) {
			movies.add(m);
			
		}
		
		movies = movies
				   .stream()
				   .filter(a -> { if(moviesId.contains(a.getId() ) ) return false;  moviesId.add( a.getId() ); return true; })
				   .collect(Collectors.toList());
		
		return movies;
	}

}
