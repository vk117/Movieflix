package com.cmpe275.movieflix.movieflix.services;

import java.util.List;

import com.cmpe275.movieflix.movieflix.model.Analytics;
import com.cmpe275.movieflix.movieflix.model.Movies;
import com.cmpe275.movieflix.movieflix.model.PlaysRequest;
import com.cmpe275.movieflix.movieflix.model.UserEntity;

public interface AnalyticsService {
	
	public void add(Analytics a);
	public List<Movies> findBetween(int days);
	public List<Movies> findUsersMovies(int id);
	public List<Movies> findUsersMoviesByView(int id);
	public List<UserEntity> findTopUsers(int days);
	public int findPlays(PlaysRequest p);
	public List<UserEntity> findAllSubscribedUser();
	public List<UserEntity> findAllPayPerUser();
	public List<UserEntity> findAllActiveUser();
	public List<UserEntity> findRegisteredUser();
	public List<String> findSearchedMovies(int userId);
}
