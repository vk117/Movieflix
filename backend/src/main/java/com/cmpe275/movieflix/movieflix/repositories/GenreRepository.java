package com.cmpe275.movieflix.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cmpe275.movieflix.movieflix.model.Genre;

@Repository
@Transactional
public interface GenreRepository extends JpaRepository<Genre, Integer>, JpaSpecificationExecutor<Genre> {

	public Genre findByName(String s);
	public Genre findBySlug(String s);
	
}
