package com.cmpe275.movieflix.movieflix;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.cmpe275.movieflix.movieflix.model.SubscriptionEntity;
import com.cmpe275.movieflix.movieflix.services.SubResponse;
import com.cmpe275.movieflix.movieflix.services.SubscriptionService;

//import com.movieflix.app.io.entity.SubscriptionEntity;
//import com.movieflix.app.service.SubscriptionService;
//import com.movieflix.app.shared.dto.SubDto;
//import com.movieflix.app.ui.model.request.SubDetailsRequestModel;
//import com.movieflix.app.ui.model.response.SubResponse;
import com.cmpe275.movieflix.movieflix.model.SubscriptionRequest;

@RestController
@RequestMapping("/v1/api") //http://localhost:8080/v1/api
public class SubscriptionController {
	
	@Autowired
	SubscriptionService subService;
	
	@GetMapping(path="/subscription/{id}")
	public SubscriptionEntity getSubscription(@PathVariable String id) {
		SubResponse returnSubInfo = new SubResponse();
		int parsedId = Integer.parseInt(id);
		System.out.println("Parsed id "+parsedId);
		SubscriptionEntity subscriptionEntity = subService.getSubBySubId(parsedId);
		return subscriptionEntity;
	}
	
	@GetMapping(path="/subscriptions/{page}")
	public Page<SubscriptionEntity> getAllSubscription(@PathVariable int page) {
		return subService.getAllSubcriptions(PageRequest.of(page, 5));
		
	}
	
	@GetMapping(path="/payed/{movieid}")
	public SubscriptionEntity getPayMovie(@PathVariable int movieid) {
		return subService.findByQuantity(movieid);
		
	}
	
	
	
	@GetMapping(path="/subscriptions/users/{id}")
	public List<SubscriptionEntity> getSubscriptionsForUsers(@PathVariable String id) {
		int parsedId = Integer.parseInt(id);
		return subService.getAllSubcriptionsForUser(parsedId);
	}

	@PostMapping(path="/subscriptions")
	public SubscriptionEntity createSubscription(@RequestBody SubscriptionEntity subDetails ) {
		return subService.createSub(subDetails);
	}
	
	@PutMapping(path="/{id}")
	public void updateSubscription(@PathVariable String id, @RequestBody SubscriptionEntity subDetails) {
		int parserId = Integer.parseInt(id);
		ResponseEntity<Object> updatedSub = subService.updateSub(parserId, subDetails);
	}
	
	@DeleteMapping(path="/{id}")
	public void deleteSubscription(@PathVariable String id) {
		int parserId = Integer.parseInt(id);
		subService.deleteBySubId(parserId);
	}
	
	@PostMapping(path="/finance/subscription")
	public List<SubscriptionEntity> findBetween(@RequestBody SubscriptionRequest req) {
		return subService.findBetween(req);
	}

}