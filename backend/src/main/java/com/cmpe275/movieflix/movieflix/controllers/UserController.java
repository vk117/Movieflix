package com.cmpe275.movieflix.movieflix.controllers;


import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

//import javax.mail.MessagingException;
//import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cmpe275.movieflix.movieflix.security.JavaMailSender;
import com.cmpe275.movieflix.movieflix.model.UserEntity;
import com.cmpe275.movieflix.movieflix.services.UserService;

import io.jsonwebtoken.io.IOException;


@RestController
@RequestMapping("v1/api")

//@EnableAutoConfiguration(exclude = {
//	    org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class
//	})
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired 
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	@GetMapping(path="/users/{page}")
	public Page<UserEntity> getUsers(@PathVariable int page){
		
		return userService.getAllUsers(PageRequest.of(page,10));
	}
	
	@GetMapping(path="/users")
	public Page<UserEntity> getUsers(){
		
		return userService.getAllUsers(PageRequest.of(0,10));
	}
	
	
	
	@GetMapping(path="/verify/{id}")
	public UserEntity verifyUser(@PathVariable int id){
		
		UserEntity userGet = userService.getById(id);
		
		userGet.setStatus("verified");
		
		System.out.println(userGet.getStatus());
		
		userService.updateUserDetails(id,userGet);
		
		return userGet;
	}
	
	@GetMapping(path="/user/{id}")
	public UserEntity getUser(@PathVariable int id){
		
		UserEntity userGet = userService.getById(id);
		
		
		
		return userGet;
	}
	
	
	@PostMapping(path="/user")
	public UserEntity saveUser(@RequestBody UserEntity userDetails)
	{  
		
		userService.saveUser(userDetails);
		
		try {
			
			JavaMailSender test = new JavaMailSender();
			test.sendmail("Verify your email",userDetails.getEmail(),"Please verify your email, by clicking on this link http://localhost:3000/verfiy?user="+userDetails.getId());
			
		} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (java.io.IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return userDetails; 
	}
	
	
	@PostMapping(path="/user/admin")
	public UserEntity saveAdmin(@RequestBody UserEntity userDetails)
	{
		
		userService.saveUser(userDetails);
		
		try {
			
			JavaMailSender test = new JavaMailSender();
			test.sendmail("Verify your email",userDetails.getEmail(),"Please verify your email, by clicking on this link http://localhost:3000/verfiy?user="+userDetails.getId());
			
		} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (java.io.IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return userDetails; 
	}
	

	@PutMapping(path="/user/{id}")
	public void updateUser(@PathVariable int id, @RequestBody UserEntity userDetails){
		
		UserEntity u = userService.getById(id);
		
		u.setName(userDetails.getName());
		u.setScreenName(userDetails.getScreenName());
		u.setAddress(userDetails.getAddress());
		u.setCity(userDetails.getCity());
		u.setState(userDetails.getState());
		u.setZipcode(userDetails.getZipcode());
		u.setPhone(userDetails.getPhone());
		u.setEmail(userDetails.getEmail());
		u.setAvatar(userDetails.getAvatar());
		
		if( userDetails.getPassword() !=null && userDetails.getPassword() !="" ) {
			
			System.out.println( userDetails.getPassword() );
			u.setPassword( bCryptPasswordEncoder.encode(userDetails.getPassword()) );
		}
		
			if( userDetails.getStatus() !=null && userDetails.getStatus() !="" ) {
			
		
			u.setStatus( userDetails.getStatus() );
		}
		
		
		userService.updateUserDetails(id, u);
	}
	
	@PutMapping(path="/users/subscribe")
	public UserEntity updateUser(@RequestBody UserEntity userDetails){
		
		UserEntity u = userService.getById(userDetails.getId());
		
		u.setCredit_card_num(userDetails.getCredit_card_num());
		u.setExpiry(userDetails.getExpiry());
		u.setSubscriptionId(userDetails.getSubscriptionId());
		u.setStatus(userDetails.getStatus());
	
		userService.updateUserDetails(userDetails.getId(), u);
		return u;
	}
	
	
	@PutMapping(path="/users/cancel")
	public UserEntity cancelSubscription(@RequestBody UserEntity userDetails){
		
		UserEntity u = userService.getById(userDetails.getId());
		
		u.setStatus("cancelled");
		u.setSubscriptionId(0);
		
	
		userService.updateUserDetails(userDetails.getId(), u);
		return u;
	}
	
	@DeleteMapping(path="/user/{id}")
	public void deleteUser(@PathVariable int id)
	{
		
		userService.deleteById(id);
	}
	
	@PostMapping(path="/authenticate")
	public Object authenticateUser(@RequestBody UserEntity auth)
	{
		//System.out.println(auth.getEmail()+" "+auth.getPassword());
		
		Object authenCheck = userService.checkUser(auth.getEmail(),auth.getPassword());
		
		
		return authenCheck;
	}
	
}
