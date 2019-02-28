package com.cmpe275.movieflix.movieflix.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cmpe275.movieflix.movieflix.model.Analytics;
import com.cmpe275.movieflix.movieflix.model.Movies;

import com.cmpe275.movieflix.movieflix.model.PlaysRequest;
import com.cmpe275.movieflix.movieflix.model.UserEntity;
import com.cmpe275.movieflix.movieflix.services.AnalyticsService;

@RestController
public class AnalyticsController {

	@Autowired
	AnalyticsService service;
	
	
	@PostMapping("v1/analytics")
	@Transactional
	public void createAnalytics(@RequestBody Analytics a) {
		service.add(a);
	}
	
	@GetMapping("/v1/analytics/between/{days}")
	public List<Movies> getBetween(@PathVariable int days){
		return service.findBetween(days);
	}
	
	@GetMapping("v1/api/user/{id}/history")
	public List<Movies> getByUsers(@PathVariable int id){
		return service.findUsersMovies(id);
	}
	
	@GetMapping("v1/api/users/plays/{days}")
	public List<UserEntity> getTopUsers(@PathVariable int days){
		return service.findTopUsers(days);
	}
	
	@PostMapping("v1/api/movies/plays")
	public int getPlays(@RequestBody PlaysRequest p) {
		return service.findPlays(p);
	}

	@GetMapping("/v1/api/analytics/subuser")
	public List<UserEntity> getAllSubscribedUser(){
		return service.findAllSubscribedUser();
	}
	
	@GetMapping("/v1/api/analytics/pay_per_user")
	public List<UserEntity> getAllPayPerUser(){
		return service.findAllPayPerUser();
	}
	
	@GetMapping("/v1/api/analytics/active_user")
	public List<UserEntity> getActiveUsers(){
		return service.findAllActiveUser();
	}
	
	@GetMapping("/v1/api/analytics/user_year")
	public List<UserEntity> getRegisteredUsers(){
		return service.findRegisteredUser();
	}
	
}
