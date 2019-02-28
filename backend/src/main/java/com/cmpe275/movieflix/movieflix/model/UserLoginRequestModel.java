package com.cmpe275.movieflix.movieflix.model;

import java.io.Serializable;

import javax.persistence.Entity;


public class UserLoginRequestModel implements Serializable{

	private String password;
	private String email;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "Authenticate [password=" + password + ", email=" + email + "]";
	}
	
	
}
