package com.cmpe275.movieflix.movieflix;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cmpe275.movieflix.movieflix.model.FilterRequest;
import com.cmpe275.movieflix.movieflix.model.Genre;
import com.cmpe275.movieflix.movieflix.model.Movies;
import com.cmpe275.movieflix.movieflix.services.GenreService;
import com.cmpe275.movieflix.movieflix.services.MovieService;


@RestController("/")
public class MovieflixController {
	
	@Autowired
	MovieService service;
	
	@Autowired
	GenreService gService;
	
	//-------------------------Movie Endpoints---------------------//
	
	//Read All
	@GetMapping("v1/api/movies")
	public Page<Movies> getMoviesBase(@RequestParam("perPage") int perPage){
		
		
		int count = 5;
		
		if(  perPage >0 )
			 count = perPage;
		
		System.out.println("Reading "+count);
		
		return service.getMovies(PageRequest.of(0, count));
	}
	
	@GetMapping("v1/api/movies/{page}")
	public Page<Movies> getMovies(@PathVariable int page){
		System.out.println("Reading");
		return service.getMovies(PageRequest.of(page, 10));
	}
	
	
	//Search Filter
	@PostMapping("v1/api/movies/search")
	public List<Movies> searchMovies(@RequestBody FilterRequest req){
		System.out.println("Searching");
		return service.searchForMovies(req);
	}
	
	
	//Get by Slug
	@GetMapping("v1/api/movie/{slug}")
	public Movies getMovie(@PathVariable String slug) {
		System.out.println("Fetching");
		return service.getMovieBySlug(slug);
	}
	
	
	//Create Movie
	@PostMapping("v1/api/movies")
	public void createMovie(@RequestBody Movies m) {
		System.out.println("Creating");
		service.add(m);
	}
	
	//Delete
	@DeleteMapping("v1/api/movies/{id}")
	public void deleteMovie(@PathVariable int id) {
		System.out.println("Deleting");
		service.deleteMovie(id);
	}
		
		
	//Update
	@PutMapping("v1/api/movies/{id}")
	public void updateMovie(@RequestBody Movies m, @PathVariable int id) {
		System.out.println("Updating");
		service.update(m, id);
	}
	
	
	///-------------------------------Genre Endpoints----------------------///
	
	//Create Genre
	@PostMapping("v1/api/genres")
	public void createGenre(@RequestBody Genre g) {
		gService.add(g);
	}
	
	@GetMapping("v1/api/genres")
	public Page<Genre> getBaseGenres(@RequestParam("perPage") int perPage) {
		
		int count = 5;
		
		if(  perPage >0 )
			 count = perPage;
		
		System.out.println(count);
		
		return gService.getGenre(PageRequest.of(0,count));
	}
	

	
	@GetMapping("v1/api/genres/{page}")
	public Page<Genre> getGenres(@PathVariable int page) {
		return gService.getGenre(PageRequest.of(page, 5));
	}
	
	
	@GetMapping("v1/api/genre/{slug}")
	public Genre getGenre(@PathVariable String slug) {
		return gService.getGenreBySlug(slug);
	}
	
	@GetMapping("/v1/api/recommended/{id}")
	public List<Movies> getRecommendedMovies( @PathVariable int id) {
		
		List<Movies> m = service.getRecommendedMovies(id);
		
		return m;
	}
	
	@PutMapping("v1/api/genres/{id}")
	public void updateGenre(@RequestBody Genre g, @PathVariable int id) {
		gService.update(g, id);
	}
	
	
	@PutMapping("/v1/api/movie/addreview/{id}")
	public void updateGenre(@RequestBody Movies m, @PathVariable int id) {
		System.out.println( m.getReviews() );
		//service.updateReviews(m, id);
	}
	
	
	@DeleteMapping("v1/api/genres/{id}")
	public void deleteGenre(@PathVariable int id) {
		gService.deleteGenre(id);
	}
	
	
	
	
}
