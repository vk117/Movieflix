package com.cmpe275.movieflix.movieflix.security;

import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.io.IOException;

@Component
public class JavaMailSender  {
  
	public void sendmail(String subject , String email , String message) throws AddressException, MessagingException, IOException, java.io.IOException {
		   Properties props = new Properties();
		   props.put("mail.smtp.auth", "true");
		   props.put("mail.smtp.starttls.enable", "true");
		   props.put("mail.smtp.host", "smtp.gmail.com");
		   props.put("mail.smtp.port", "587");
		   
		   Session session = Session.getInstance(props, new Authenticator() {
		      protected PasswordAuthentication getPasswordAuthentication() {
		         return new PasswordAuthentication("abhin2cool@gmail.com", "suhaniabhin");
		      }
		   });
		   Message msg = new MimeMessage(session);
		   msg.setFrom(new InternetAddress("abhin2cool@gmail.com", false));
		   
		   System.out.println("sending...");

		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
		   msg.setSubject(subject);
		   msg.setContent(message, "text/html");
		   msg.setSentDate(new Date());

		   MimeBodyPart messageBodyPart = new MimeBodyPart();
		   messageBodyPart.setContent(message, "text/html");

		
		   Transport.send(msg);   
		}
}