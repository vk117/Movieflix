package com.cmpe275.movieflix.movieflix.controllers;

import java.security.Principal;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;

import com.cmpe275.movieflix.movieflix.model.UserEntity;
import com.cmpe275.movieflix.movieflix.security.JavaMailSender;
import com.cmpe275.movieflix.movieflix.services.UserService;

import io.jsonwebtoken.io.IOException;

@RestController
public class LoginController {

	@Autowired
	UserService userService;
	
	
	
	@PostMapping(path="/session")
	public UserEntity getSessionData(@RequestBody UserEntity userDetails)
	{
		System.out.println("scree name"+userDetails.getId());
		
		UserEntity user = userService.getById(userDetails.getId());
		
		userService.checkSubscription(userDetails);
		
		
		
		return user; 
	}
	
	
	
}
