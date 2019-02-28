package com.cmpe275.movieflix.movieflix.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.cmpe275.movieflix.movieflix.model.Movies;

public class MovieSpecification {

	public static Specification<Movies> nameIsSimilar(String s){
		return(root, query, cb) -> {
			return cb.like(root.get("name"), "%" + s + "%");
		};
	}
	
	public static Specification<Movies> descIsSimilar(String s){
		return(root, query, cb) -> {
			return cb.like(root.get("description"), "%" + s + "%");
		};
	}
	
	public static Specification<Movies> charactersAreSimilar(String s){
		return(root, query, cb) -> {
			return cb.like(root.get("movie_characters"),"%" + s + "%");
		};
	}
	
	public static Specification<Movies> available_in(String s){
		return(root, query, cb) -> {
			return cb.like(root.get("available_in"), "%" + s + "%");
		};
	}
	
	public static Specification<Movies> movieRatingIs(String movie_rating){
		return(root, query, cb) -> {
			return cb.like(root.get("movie_rating"), "%" + movie_rating + "%");
		};
	}
	
	public static Specification<Movies> movie_type(String s){
		return(root, query, cb) -> {
			return cb.like(root.get("movie_type"), "%" + s + "%");
		};
	}
	
}
