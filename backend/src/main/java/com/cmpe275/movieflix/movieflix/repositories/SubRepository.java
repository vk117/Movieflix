package com.cmpe275.movieflix.movieflix.repositories;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cmpe275.movieflix.movieflix.model.SubscriptionEntity;
import com.cmpe275.movieflix.movieflix.model.UserEntity;



@Repository
@Transactional
public interface SubRepository extends JpaRepository<SubscriptionEntity, Integer>{
	//public Optional<SubscriptionEntity> findAllByUserId(Integer userId);
	public List<SubscriptionEntity> findByUserId(int id);
	SubscriptionEntity findByQuantity(int quantity);
	public List<SubscriptionEntity> findAllByCreatedAtBetween(LocalDateTime l1, LocalDateTime l2);
	
	@Query(value="SELECT userId FROM subscription_orders WHERE subName=?1")
	public List<Integer> findAllPayPerUser(String s);
}