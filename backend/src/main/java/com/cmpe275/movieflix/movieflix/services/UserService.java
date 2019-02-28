package com.cmpe275.movieflix.movieflix.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.cmpe275.movieflix.movieflix.model.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

	public UserEntity saveUser(UserEntity user);
	public UserEntity getById(int id);
	public UserEntity getUser(String email);
	public ResponseEntity<Object> updateUserDetails(int id, UserEntity user);
	public void deleteById(int id);	
	public Page<UserEntity> getAllUsers(Pageable p);
	public Object checkUser(String email,String password);
	public void checkSubscription(UserEntity user);
}