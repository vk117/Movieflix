package com.cmpe275.movieflix.movieflix.services;

import com.cmpe275.movieflix.movieflix.model.Analytics;
import com.cmpe275.movieflix.movieflix.model.Movies;
import com.cmpe275.movieflix.movieflix.model.PlaysRequest;
import com.cmpe275.movieflix.movieflix.model.UserEntity;
import com.cmpe275.movieflix.movieflix.repositories.AnalyticsRepository;
import com.cmpe275.movieflix.movieflix.repositories.MovieRepository;
import com.cmpe275.movieflix.movieflix.model.UserEntity;
import com.cmpe275.movieflix.movieflix.repositories.SubRepository;
import com.cmpe275.movieflix.movieflix.repositories.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.hibernate.annotations.Where;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {
	
	@Autowired
	AnalyticsRepository repo;
	
	@Autowired
	MovieRepository mrepo;
	
	@Autowired
	UserRepository urepo;

	@Autowired 
	SubRepository srepo;


	public AnalyticsServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void add(Analytics a) {
		repo.save(a);

	}

	@Override
	@Where(clause = "activity = 'play'")
	public List<Movies> findBetween(int days) {
		List<Movies> topten = new ArrayList<Movies>();
		LocalDate current = LocalDate.now();
		Map<Integer, Integer> playMapping = new HashMap<Integer, Integer>();
		LocalDate past = current.minusDays(days);
		List<Analytics> between = repo.findAllByCreatedAtBetween(past, current).stream()
										.filter(a -> a.getActivity().equals("play"))
										.collect(Collectors.toList());
		for(Analytics a : between) {
			if(playMapping.containsKey(a.getMovie_id())) {
				playMapping.put(a.getMovie_id(), playMapping.get(a.getMovie_id()) + 1);
			}
			else {
				playMapping.put(a.getMovie_id(), 1);
			}
		}
		
		List<Map.Entry<Integer, Integer>> list = new LinkedList<Map.Entry<Integer, Integer>>(playMapping.entrySet());
		Collections.sort(list, new Comparator<Map.Entry<Integer, Integer>>(){
			public int compare(Map.Entry<Integer, Integer> o1, Map.Entry<Integer, Integer> o2) {
				return(o2.getValue()).compareTo(o1.getValue());
			}
		});
		for(Map.Entry<Integer, Integer> aa : list) {
			playMapping.put(aa.getKey(), aa.getValue());
		}
		
		for(int key : playMapping.keySet()) {
			topten.add(mrepo.findById(key).get());
		}
		
		return topten;
		
	}

	@Override
	public List<Movies> findUsersMovies(int id) {
		List<Movies> movies = new ArrayList<Movies>();
		List<Analytics> list = repo.findByUserId(id)
								   .stream()
								   .filter(a -> a.getActivity().equals("play"))
								   .sorted(Comparator.comparing(Analytics::getCreatedAt).reversed())
								   .collect(Collectors.toList());
		for(Analytics a : list) {
			movies.add(mrepo.findById(a.getMovie_id()).get());
		}
		
		return movies;
	}
	
	@Override
	public List<Movies> findUsersMoviesByView(int id) {
		List<Movies> movies = new ArrayList<Movies>();
		List<Analytics> list = repo.findByUserId(id)
								   .stream()
								   .filter(a -> a.getActivity().equals("view"))
								   .sorted(Comparator.comparing(Analytics::getCreatedAt).reversed())
								   .collect(Collectors.toList());
		for(Analytics a : list) {
			movies.add(mrepo.findById(a.getMovie_id()).get());
		}
		
		return movies;
	}
	
	@Override
	public List<String> findSearchedMovies(int id) {
		List<String> keywords = new ArrayList<String>();
		List<Movies> movies = new ArrayList<Movies>();
		List<Analytics> list = repo.findByUserId(id)
								   .stream()
								   .filter(a -> a.getActivity().startsWith("search") )
								   .collect(Collectors.toList());
		for(Analytics a : list) {
			String s[] = a.getActivity().split(":");
			keywords.add(s[1]);
		}
		
		return keywords;
	}

	@Override
	public List<UserEntity> findTopUsers(int days) {
		List<UserEntity> topTen = new ArrayList<UserEntity>();
		LocalDate current = LocalDate.now();
		LocalDate past = current.minusDays(days);
		Map<Integer, Long> list = repo.findAllByCreatedAtBetween(past, current)
								   .stream()
								   .filter(a -> a.getActivity().equals("play"))
								   .collect(Collectors.groupingBy(a -> a.getUserId(), Collectors.counting()));
		List<Integer> toptenUsers = list.entrySet().stream()
												 .sorted(Map.Entry.<Integer, Long> comparingByValue().reversed())
												 .limit(10)
												 .map(Map.Entry::getKey)
												 .collect(Collectors.toList());
		for(Integer o : toptenUsers) {
			topTen.add(urepo.findById(o).get());
		}
		
		return topTen;
												 
	}

	@Override
	public int findPlays(PlaysRequest p) {
		return (int) repo.findAllByCreatedAtBetween(LocalDate.now().minusDays(p.getDuration()), LocalDate.now())
				   .stream()
				   .filter(a -> a.getMovie_id() == p.getMovieId())
				   .filter(a -> a.getActivity().equals("play"))
				   .count();
	}

	public List<UserEntity> findAllSubscribedUser() {
		String s = "subscribed";
		List<UserEntity> subscribedUsers = new ArrayList<UserEntity>();
		List<Integer> subcribedUserId = urepo.getAllSubscribedUser(s);
		for(int i : subcribedUserId) {
			UserEntity subscribedUser = urepo.findById(i).get();
			subscribedUsers.add(subscribedUser);
		}
		return subscribedUsers;
	}

	@Override
	public List<UserEntity> findAllPayPerUser() {
		String s = "pay";
		String s1 = "play";
		List<UserEntity> pay_per_view_users = new ArrayList<>();
		List<Integer> pay_per_user_id = srepo.findAllPayPerUser(s); // get all the users who have payed for a movie
		List<Integer> pay_per_user_analytics= repo.findPayPerUserById(s1); // get all user from analytics who have played any movie
		for(int i : pay_per_user_analytics) {
			if (pay_per_user_id.contains(i)){
				UserEntity user = urepo.findById(i).get();
				pay_per_view_users.add(user);
			}
		}
		return pay_per_view_users;
	}

	@Override
	public List<UserEntity> findAllActiveUser() {
		String s1 ="play";
//		List<Integer> validId = new ArrayList<Integer>();
		List<UserEntity> activeUsers = new ArrayList<UserEntity>();
		LocalDate prev  = LocalDate.now().minusDays(30);
		List<Analytics> between = repo.findAllByCreatedAtBetween(prev, LocalDate.now()).stream()
				.filter(a -> a.getActivity().equals(s1))
				.collect(Collectors.toList());
		
		for(Analytics a : between) {
			int id = a.getUserId();
			UserEntity user = urepo.findById(id).get();
			activeUsers.add(user);
		}
//		Map<Integer,LocalDate> active_users = new HashMap<Integer, LocalDate>();
//		active_users= repo.findActiveUser(s1);
//		for (Map.Entry<Integer,LocalDate> entry : active_users.entrySet())  {
//           int key = entry.getKey();
//           if(entry.getValue().compareTo(prev)>0) {
//        	   validId.add(key);}
//			}
//		for(int i : validId) {
//			UserEntity user = urepo.findById(i).get();
//			activeUsers.add(user);
//		}
		return activeUsers;
	}

	@Override
	public List<UserEntity> findRegisteredUser() {
		List<UserEntity> allUsers = urepo.findAll();
		LocalDateTime prevYear = LocalDateTime.now().minusMonths(12);
		List<UserEntity> registeredOneYearBack = new ArrayList<UserEntity>();
		for(UserEntity u: allUsers) {
			if(u.getCreated_at().compareTo(prevYear)>=0) {
				UserEntity user = urepo.findById(u.getId()).get();
				registeredOneYearBack.add(user);
			}
		}
		return registeredOneYearBack;
	}

}
