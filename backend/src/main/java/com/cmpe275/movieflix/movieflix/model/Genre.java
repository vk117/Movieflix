package com.cmpe275.movieflix.movieflix.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "genres")
public class Genre {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "name", nullable = true)
	private String name;
	
	@Column(name = "slug", nullable = true)
	private String slug;
	
	@Column(name = "created_at")
	@CreationTimestamp
	private LocalDateTime created_at;
	
	@Column(name = "updated_at")
	@UpdateTimestamp
	private LocalDateTime updated_at;
	
	
	@ManyToMany(fetch = FetchType.EAGER,
			cascade = {
					//CascadeType.MERGE,
					CascadeType.PERSIST
			},
			mappedBy = "genres")
	@JsonIgnoreProperties("genres")
	private Set<Movies> movies = new HashSet<>();

	public Set<Movies> getMovies() {
		return movies;
	}

	public void setMovies(Set<Movies> movies) {
		this.movies = movies;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public LocalDateTime getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}
	
	
}
