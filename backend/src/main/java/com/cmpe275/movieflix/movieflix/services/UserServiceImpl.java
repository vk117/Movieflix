package com.cmpe275.movieflix.movieflix.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cmpe275.movieflix.movieflix.repositories.SubRepository;
import com.cmpe275.movieflix.movieflix.repositories.UserRepository;
import com.cmpe275.movieflix.movieflix.model.SubscriptionEntity;
import com.cmpe275.movieflix.movieflix.model.UserEntity;
import com.cmpe275.movieflix.helpers.URLHelper;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	SubRepository sRepo;
	
	@Autowired 
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public UserEntity saveUser(UserEntity user) {
		
		System.out.println(user.toString());
		
		user.setRole("customer");
		user.setStatus("unverified");
		user.setCredit_card_num("-");
		user.setExpiry("-");
		user.setAvatar("https://images.unsplash.com/photo-1504401774599-1b5378bfaae3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e8dde55b26b124ab3852f8d56dca66d9&auto=format&fit=crop&w=374&q=80");
		user.setPassword( bCryptPasswordEncoder.encode(user.getPassword()) );
		// get all slugs
		List<String> slugs =  userRepository.findAllSlugs();
				
		String slug = URLHelper.slugify(user.getName(),slugs);
		
		// create slug
		user.setSlug(slug);
		
		
		
		UserEntity storedUserDetails = userRepository.save(user);
	
		return storedUserDetails;
	}
	@Override
	public UserEntity getById(int id) {
		Optional<UserEntity> optUser = userRepository.findById(id);
		return optUser.get();
	}
	@Override
	public void deleteById(int id) {	
		userRepository.deleteById(id);
	}
	
	@Override
	public UserEntity getUser(String email) {
		
		UserEntity u = userRepository.findByEmail(email);
		
		return u;
	}
	
	
	@Override
	public ResponseEntity<Object> updateUserDetails(int id, UserEntity user) {
		Optional<UserEntity> optUser = userRepository.findById(id);
		if (!optUser.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		user.setId(id);
		user.setCreated_at(userRepository.findById(id).get().getCreated_at());
		userRepository.save(user);
		return ResponseEntity.noContent().build();
	}
	@Override
	public Page<UserEntity> getAllUsers(Pageable p) {
		return userRepository.findAll(p);
	}
	
	public Object checkUser(String email,String password) {
		
		UserEntity u = userRepository.findByEmail(email);
		Object result = "";
		// user exists in database
		if(u!=null && u.getPassword().equals(password) ) {
			result = u;
		} else {	
			result = "Invalid Details !";
		}
		
		return result;
	}
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
			
		UserEntity userEntity = userRepository.findByEmail(email);
		
		if(userEntity == null) throw new UsernameNotFoundException(email);
		
		return new User(userEntity.getEmail() , userEntity.getPassword() ,  new ArrayList<>());

	}
	@Override
	public void checkSubscription(UserEntity user) {
		
		SubscriptionEntity sub = null;
		
		if( user.getSubscriptionId() > 0  )
		sub = sRepo.findById(user.getSubscriptionId()).get();
		
		if(sub != null) {
			if(LocalDateTime.now().isAfter(sub.getTrailEndAt())) {
				user.setStatus("cancelled");
				userRepository.save(user);
			}
		}
	}
	
}
 