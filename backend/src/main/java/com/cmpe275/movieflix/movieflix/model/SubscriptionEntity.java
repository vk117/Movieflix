package com.cmpe275.movieflix.movieflix.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity(name="subscription_orders")
public class SubscriptionEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(name = "user_id")
	private int userId;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int usersId) {
		this.userId = usersId;
	}

	@Column
	private String subName;
	
	@Column
	private int quantity;
	
	@Column
	@CreationTimestamp
	private LocalDateTime createdAt;
	
	@Column
	@UpdateTimestamp
	private LocalDateTime updatedAt;
	
	@Column
	private LocalDateTime trailEndAt;
	
	@Column
	private int cost;
	
	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public String getSubName() {
		return subName;
	}

	public void setSubName(String subName) {
		this.subName = subName;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public LocalDateTime getTrailEndAt() {
		return trailEndAt;
	}

	public void setTrailEndAt(LocalDateTime trailEndAt) {
		this.trailEndAt = trailEndAt;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	

	


}