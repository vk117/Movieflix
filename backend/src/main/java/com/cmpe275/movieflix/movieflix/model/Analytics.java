package com.cmpe275.movieflix.movieflix.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "analytics")
public class Analytics {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "user_id", nullable = true)
	private int userId;
	
	@Override
	public String toString() {
		return "Analytics [id=" + id + ", userId=" + userId + ", movie_id=" + movie_id + ", activity=" + activity
				+ ", createdAt=" + createdAt + "]";
	}

	@Column(name = "movie_id", nullable = true)
	private int movie_id;
	
	@Column(name= "activity", nullable= true)
	private String activity;
	
	@CreationTimestamp
	private LocalDate createdAt;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getMovie_id() {
		return movie_id;
	}

	public void setMovie_id(int movie_id) {
		this.movie_id = movie_id;
	}

	public String getActivity() {
		return activity;
	}

	public void setActivity(String activity) {
		this.activity = activity;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}
	
}
