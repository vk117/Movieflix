package com.cmpe275.movieflix.movieflix.model;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.JoinColumn;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "movies")
@Where(clause = "is_deleted = 'false'")
public class Movies {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "name", nullable = true)
	private String name;
	
	@Column(name = "slug", nullable = true)
	private String slug;
	
	@Column(name = "description", nullable = true)
	private String description;
	
	@Column(name = "trailer_link", nullable = true)
	private String trailer_link;
	
	@Column(name = "link", nullable = true)
	private String link;
	
	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	@Column(name = "movie_type", nullable = true)
	private String movie_type;
	
	@Column(name = "movie_price", nullable = true)
	private int movie_price;
	
	public int getMovie_price() {
		return movie_price;
	}

	public void setMovie_price(int movie_price) {

		
		this.movie_price = movie_price;
	}

	@Column(name = "movie_characters", columnDefinition = "TEXT", nullable = true )
	private String movie_characters;
	
	@Column(name = "release_date", nullable = true)
	private Date release_date;
	
	@Column(name = "ratings_count", nullable = true)
	private int ratings_count; 
	
	@Column(name = "rating_sum", nullable = true)
	private int rating_sum;
	
	@Column(name = "rating", nullable = true)
	private float rating;
	
	@Column(name = "thumbnail", nullable = true)
	private String thumbnail;
	
	@Column(name = "country", nullable = true)
	private String country;
	
	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	@Column(name = "cover", nullable = true)
	private String cover;
	
	@Column(name = "movie_length", nullable = true)
	private String movie_length;
	
	@Column(name = "available_in", nullable = true)
	private String available_in;
	
	 // ex PG 13 
	@Column(name = "movie_rating", nullable = true)
	private String movie_rating;
	
	@Column(name = "reviews", columnDefinition = "TEXT", nullable = true)
	private String reviews;
	
	@Column(name = "created_at")
	@CreationTimestamp
	private LocalDateTime created_at;
	
	@Column(name = "updated_at")
	@UpdateTimestamp
	private LocalDateTime updated_at;
	
	@Column(name = "is_deleted")
	private boolean is_deleted;
	
	@Column(name = "views")
	private int views;
	
	@ManyToMany(fetch = FetchType.EAGER,
			cascade = {
					CascadeType.MERGE,
					CascadeType.PERSIST
			})
	@JoinTable(name = "movies_genres",
			joinColumns = {@JoinColumn(name = "movie_id")},
			inverseJoinColumns = {@JoinColumn(name = "genre_id")} )
	
	@JsonIgnoreProperties("movies")
	private Set<Genre> genres = new HashSet<>();
	
	public int getViews() {
		return views;
	}

	public void setViews(int views) {
		this.views = views;
	}

	public boolean getIs_deleted() {
		return is_deleted;
	}

	public void setIs_deleted(boolean is_deleted) {
		this.is_deleted = is_deleted;
	}

	public Set<Genre> getGenres() {
		return genres;
	}

	public void setGenres(Set<Genre> genres) {
		this.genres = genres;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTrailer_link() {
		return trailer_link;
	}

	public void setTrailer_link(String trailer_link) {
		this.trailer_link = trailer_link;
	}

	public String getMovie_type() {
		return movie_type;
	}

	public void setMovie_type(String movie_type) {
		this.movie_type = movie_type;
	}

	public String getMovie_characters() {
		return movie_characters;
	}

	public void setMovie_characters(String movie_characters) {
		
		this.movie_characters = movie_characters;
	}

	public Date getRelease_date() {
		return release_date;
	}

	public void setRelease_date(Date release_date) {
		this.release_date = release_date;
	}

	public int getRatings_count() {
		return ratings_count;
	}

	public void setRatings_count(int ratings_count) {
		this.ratings_count = ratings_count;
	}

	public int getRating_sum() {
		return rating_sum;
	}

	public void setRating_sum(int rating_sum) {
		this.rating_sum = rating_sum;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public String getMovie_length() {
		return movie_length;
	}

	public void setMovie_length(String movie_length) {
		this.movie_length = movie_length;
	}

	public String getAvailable_in() {
		return available_in;
	}

	public void setAvailable_in(String available_in) {
		this.available_in = available_in;
	}

	public String getMovie_rating() {
		return movie_rating;
	}

	public void setMovie_rating(String movie_rating) {
		this.movie_rating = movie_rating;
	}

	public String getReviews() {
		return reviews;
	}

	public void setReviews(String reviews) {
		this.reviews = reviews;
	}

}
