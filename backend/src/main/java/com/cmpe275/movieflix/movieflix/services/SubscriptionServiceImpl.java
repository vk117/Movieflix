package com.cmpe275.movieflix.movieflix.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cmpe275.movieflix.movieflix.model.SubscriptionEntity;
import com.cmpe275.movieflix.movieflix.model.SubscriptionRequest;
import com.cmpe275.movieflix.movieflix.model.UserEntity;
import com.cmpe275.movieflix.movieflix.repositories.SubRepository;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

	@Autowired
	SubRepository subRepository;
	
	public SubscriptionServiceImpl() {
		
	}
	
	@Override
	public SubscriptionEntity createSub(SubscriptionEntity subUser) {
		LocalDateTime created_at = LocalDateTime.now();
		LocalDate created_at_date = created_at.toLocalDate();
		LocalDate end_at = created_at_date.plusMonths(1);
		LocalDateTime trial_end_at = LocalDateTime.of(end_at, LocalTime.MIDNIGHT);
		subUser.setTrailEndAt(trial_end_at);
		return subRepository.save(subUser);
	}
	
	
	
	public SubscriptionEntity getSubBySubId(int id){
		Optional<SubscriptionEntity> optionalSub = subRepository.findById(id);
		if(optionalSub==null) {throw new RuntimeException();}
		return optionalSub.get();
	}
	
	@Override
	public void deleteBySubId(int id) {
		try {
		subRepository.deleteById(id);}
		catch(Exception e) {
			System.out.println("No subscription with this id");
			System.out.println(e.getMessage());
		}
	}
	@Override
	public ResponseEntity<Object> updateSub(int id, SubscriptionEntity subUser) {
		Optional<SubscriptionEntity> optionalSub = subRepository.findById(id);

		if(!optionalSub.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		subUser.setId(id);
		System.out.println("update "+subUser.getCreatedAt());
		subUser.setCreatedAt(subRepository.findById(id).get().getCreatedAt());
		subRepository.save(subUser);
		return ResponseEntity.noContent().build();
	}

	@Override
	public Page<SubscriptionEntity> getAllSubcriptions(Pageable page) {
		return subRepository.findAll(page);
	}

	@Override
	public List<SubscriptionEntity> getAllSubcriptionsForUser(int id) {
		
		List<SubscriptionEntity> subs = subRepository.findByUserId(id);
		
		return subs;
	}
	
	@Override
	public SubscriptionEntity findByQuantity(int movieid) {
		
		return subRepository.findByQuantity(movieid);
	}

	@Override
	public List<SubscriptionEntity> findBetween(SubscriptionRequest req) {
		//return subRepository.findAllByCreatedAtBetween(LocalDateTime.now().minusDays(days), LocalDateTime.now());
		List<SubscriptionEntity> list = subRepository.findAllByCreatedAtBetween(LocalDateTime.now().minusDays(req.getDuration()), LocalDateTime.now());
		
		switch(req.getType()) {
			case "subscription" :
				return list.stream()
					.filter(s -> s.getSubName().equals("subscription"))
					.sorted(Comparator.comparing(SubscriptionEntity::getCreatedAt).reversed())
					.collect(Collectors.toList());
				
			case "pay" :
				return list.stream()
						.filter(s -> s.getSubName().equals("pay"))
						.sorted(Comparator.comparing(SubscriptionEntity::getCreatedAt).reversed())
						.collect(Collectors.toList());
				
			case "total" :
				return list.stream()
						.sorted(Comparator.comparing(SubscriptionEntity::getCreatedAt).reversed())
						.collect(Collectors.toList());
				
			default : 
				return list.stream()
						.sorted(Comparator.comparing(SubscriptionEntity::getCreatedAt).reversed())
						.collect(Collectors.toList());
				
		}
	}


}