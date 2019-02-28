package com.cmpe275.movieflix.movieflix;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.cmpe275.movieflix.movieflix.security.AppProperties;

import com.cmpe275.movieflix.movieflix.repositories.GenreRepository;
import com.cmpe275.movieflix.movieflix.repositories.MovieRepository;

//
@SpringBootApplication
public class MovieflixApplication /*implements CommandLineRunner*/ {
	
	
	@Autowired
	MovieRepository repo;
	
	@Autowired
	GenreRepository grepo;
    
	public static void main(String[] args) {
		SpringApplication.run(MovieflixApplication.class, args);
		
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncode() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean 
	public SpringApplicationContext springApplicationContext()
	{
		return new SpringApplicationContext();
	}
	
	@Bean(name="AppProperties")
	public AppProperties getAppProperties()
	{
		return new AppProperties();
	}
	

	
}
