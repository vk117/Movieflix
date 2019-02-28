
package com.cmpe275.movieflix.movieflix.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.cmpe275.movieflix.helpers.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name="users")
public class UserEntity implements Serializable {
	
	@Override
	public String toString() {
		return "UserEntity [id=" + id + ", name=" + name + ", screenName=" + screenName + ", slug=" + slug + ", avatar="
				+ avatar + ", address=" + address + ", city=" + city + ", state=" + state + ", zipcode=" + zipcode
				+ ", phone=" + phone + ", email=" + email + ", password=" + password + ", role=" + role
				+ ", credit_card_num=" + credit_card_num + ", expiry=" + expiry + ", emailVerificationToken="
				+ emailVerificationToken + ", emailVerificationStatus=" + emailVerificationStatus + ", created_at="
				+ created_at + ", updated_at=" + updated_at + ", status=" + status + "]";
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id" , referencedColumnName="id")
	private List<SubscriptionEntity> subId;
	
	public List<SubscriptionEntity> getSubId() {
		return subId;
	}

	public void setSubId(List<SubscriptionEntity> subId) {
		this.subId = subId;
	}

	@Column(nullable=false)
	private String name;
	
	@Column(name="screen_name",nullable=false)
	private String screenName;
	
	
	@Column(nullable=false, unique=true)
	private String slug;
	
	@Column(nullable=true)
	private String avatar;
	
	@Column(nullable=true)
	private int subscriptionId;
	
	public int getSubscriptionId() {
		return subscriptionId;
	}

	public void setSubscriptionId(int subscriptionId) {
		this.subscriptionId = subscriptionId;
	}

	@Column(nullable=true)
	private String address;
	
	@Column(nullable=true)
	private String city;
	
	@Column(nullable=true)
	private String state;
	
	@Column(nullable=true)
	private String zipcode;
	
	@Column(nullable=true)
	private String phone;
	
	@Column(nullable=true)
	private String email;
	

	@Column(nullable=false)
	private String password;
	
	@Column(nullable=false)
	private String role;
	
	@Column(nullable=true)
	private String credit_card_num;
	
	@Column(nullable=true)
	private String expiry;
	
	@JsonIgnore
	private String emailVerificationToken;
	
	@JsonIgnore
	@Column(nullable=false)
	private Boolean emailVerificationStatus = false;
	
	
	@Column
	@CreationTimestamp
	private LocalDateTime  created_at;
	
	@Column
	@UpdateTimestamp
	private LocalDateTime  updated_at;
	
	@Column(nullable=true)
	private String status;
	
	public UserEntity() {
		
	}
	
	@PrePersist
	public void setLastUpdate() {  
		
		
	
	}


	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public String getScreenName() {
		return screenName;
	}
	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}	
	public String getSlug() {
		return slug;
	}
	public void setSlug(String slug) {
		this.slug = slug;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getCredit_card_num() {
		return credit_card_num;
	}
	public void setCredit_card_num(String credit_card_num) {
		this.credit_card_num = credit_card_num;
	}
	public String getExpiry() {
		return expiry;
	}
	public void setExpiry(String expiry) {
		this.expiry = expiry;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	public String getEmailVerificationToken() {
		return emailVerificationToken;
	}

	public void setEmailVerificationToken(String emailVerificationToken) {
		this.emailVerificationToken = emailVerificationToken;
	}
	
	public Boolean getEmailVerificationStatus() {
		return emailVerificationStatus;
	}

	public void setEmailVerificationStatus(Boolean emailVerificationStatus) {
		this.emailVerificationStatus = emailVerificationStatus;
	}
}
