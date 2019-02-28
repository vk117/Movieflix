package com.cmpe275.movieflix.movieflix.repositories;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cmpe275.movieflix.movieflix.model.Analytics;
import com.cmpe275.movieflix.movieflix.model.UserEntity;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	public static final String FIND_SLUGS = "SELECT slug FROM users";

	@Query(value = FIND_SLUGS, nativeQuery = true)
	public List<String> findAllSlugs();
	
	public UserEntity findByEmail(String email);
	
	@Query(value="SELECT id FROM users WHERE status=?1")
	public List<Integer> getAllSubscribedUser(String status);
	
	//public List<UserEntity> findAllByCreatedatBetween(LocalDateTime l1, LocalDateTime l2);
}
