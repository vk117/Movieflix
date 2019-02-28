package com.cmpe275.movieflix.movieflix.repositories;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;

import org.springframework.data.jpa.repository.Query;

import com.cmpe275.movieflix.movieflix.model.Analytics;

@Transactional
public interface AnalyticsRepository extends JpaRepository<Analytics, Integer> {
	
	public List<Analytics> findAllByCreatedAtBetween(LocalDate l1, LocalDate l2);
	public List<Analytics> findByUserId(int id);
	
	@Query(value="SELECT userId FROM Analytics WHERE activity=?1")
	public List<Integer> findPayPerUserById(String s);
	


}
