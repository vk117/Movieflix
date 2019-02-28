package com.cmpe275.movieflix.movieflix.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;


import com.cmpe275.movieflix.movieflix.model.SubscriptionEntity;
import com.cmpe275.movieflix.movieflix.model.SubscriptionRequest;


public interface SubscriptionService {

	public SubscriptionEntity createSub(SubscriptionEntity subUser);
	public SubscriptionEntity getSubBySubId(int id);
	public void deleteBySubId(int id);
	public ResponseEntity<Object>  updateSub(int id, SubscriptionEntity subUser);
	public Page<SubscriptionEntity> getAllSubcriptions(Pageable page);
	public List<SubscriptionEntity> getAllSubcriptionsForUser(int id);
	//public Optional<SubscriptionEntity> getAllSubById(int userId);
	public SubscriptionEntity findByQuantity(int movieid);
	public List<SubscriptionEntity> findBetween(SubscriptionRequest req);
}
