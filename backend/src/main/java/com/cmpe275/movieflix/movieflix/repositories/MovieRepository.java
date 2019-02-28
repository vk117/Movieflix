package com.cmpe275.movieflix.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cmpe275.movieflix.movieflix.model.Movies;

@Repository
@Transactional
public interface MovieRepository extends JpaRepository<Movies, Integer>, JpaSpecificationExecutor<Movies> {
	
	public Movies findBySlug(String slug);
	
}
