package com.cmpe275.movieflix.movieflix.model;

import java.util.List;

public class FilterRequest {

	private String movie_rating;
	private String str;

	private int perPage;
	
	private List<Genre> genres;
	private String available_in;
	private String movie_type;
	private String sort;
	private String mode;
	
	public String getMovie_rating() {
		return movie_rating;
	}
	public void setMovie_rating(String movie_rating) {
		this.movie_rating = movie_rating;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getMovie_type() {
		return movie_type;
	}
	public void setMovie_type(String movie_type) {
		this.movie_type = movie_type;
	}
	public String getAvailable_in() {
		return available_in;
	}
	public void setAvailable_in(String available_in) {
		this.available_in = available_in;
	}
	public List<Genre> getGenres() {
		return genres;
	}
	public void setGenres(List<Genre> genres) {
		this.genres = genres;
	}
	
	public String getStr() {
		return str;
	}
	public void setStr(String str) {
		this.str = str;
	}
	public int getPerPage() {
		return perPage;
	}
	public void setPerPage(int perPage) {
		this.perPage = perPage;
	}

}
