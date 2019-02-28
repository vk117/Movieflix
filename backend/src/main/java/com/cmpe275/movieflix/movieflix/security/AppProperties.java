package com.cmpe275.movieflix.movieflix.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class AppProperties {

	
	public String getTokenSecret()
	{
		return "eyJhbGciOiJIUzI1eyJhbGciOiJIUzI1NiJ9UzI1NiJ9eyJhbGciOiJIUzI1NiJ9UzI1NiJ9NiJ9UzI1NiJ9eyJhbGciOiJIUzI1NiJ9UzI1NiJ9";
	}
}