package com.cmpe275.movieflix.movieflix.services;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmpe275.movieflix.movieflix.model.Movies;
import com.cmpe275.movieflix.movieflix.model.Rating;
import com.cmpe275.movieflix.movieflix.model.SubscriptionEntity;
import com.cmpe275.movieflix.movieflix.repositories.MovieRepository;
import com.cmpe275.movieflix.movieflix.repositories.RatingRepository;

import java.util.*;

@Service
public class RatingServiceImpl implements RatingService {

	@Autowired
	RatingRepository ratingRepo;
	
	@Autowired
	MovieRepository movieRepo;
	
	@Override
	public void createRating(Rating rating) {
		ratingRepo.save(rating);
		
	}

	@Override
	public int getAvgById(int movie_id) {
		ArrayList<Integer>ratings = new ArrayList<Integer>();
		ratings = ratingRepo.findByMovieId(movie_id);
		System.out.println("Checking ratings"+ ratings);
		int rating_sum = 0;
		int ratings_size = ratings.size();
		for(int i: ratings)
			rating_sum+=i;
		
		double rating_avg;
		rating_avg = (double)rating_sum/ratings_size;
		int average = (int) Math.round(rating_avg);
		System.out.println("Average rating is"+ rating_avg);
		return average;
	}

	@Override
	public List<Movies> movieObjs(int days) {
		int num_of_records = 10;
		LocalDate today = LocalDate.now();
		//java.sql.Date today_date = java.sql.Date.valueOf(today);
		LocalDate prev  = today.minusDays(days+1);
		System.out.println(prev);
		//java.sql.Date prev_data = java.sql.Date.valueOf(prev);
		List<Rating> allRatings = ratingRepo.findAll();
		System.out.println("All ratings "+ allRatings);
		for(Rating r : allRatings) {
			System.out.println("Movie id "+r.getMovie_id()+" Created at "+ r.getCreated_at());
		}
		HashMap<Integer,Integer> movie_count = new HashMap<Integer,Integer>();
		HashMap<Integer,Integer> movies = new HashMap<Integer,Integer>();
		HashMap<Integer,Double> avg_movie = new HashMap<Integer,Double>();
		
		List<Rating>validRatings = new ArrayList<Rating>();
		for(Rating r: allRatings) {
			if(r.getCreated_at().compareTo(today)<=0 && r.getCreated_at().compareTo(prev)>0) {
				validRatings.add(r);
			}
		}
		for(Rating r : validRatings) {
			System.out.println(r.getMovie_id());
		}
		System.out.println("Inside valid Ratings" + validRatings.size());
		
		for(int i=0;i<validRatings.size();i++) {
			Rating r = validRatings.get(i);
			if(movie_count.containsKey(r.getMovie_id())) {
				int temp = movie_count.get(r.getMovie_id());
				temp++;
				movie_count.put(r.getMovie_id(), temp);
			}
			else {
				movie_count.put(r.getMovie_id(), 1);
			}
		}
		
		for (int i =0 ; i<validRatings.size();i++) {
			Rating r = validRatings.get(i);
			if(movies.containsKey(r.getMovie_id())) {
				int sum = movies.get(r.getMovie_id());
				sum+=r.getRating();
				movies.put(r.getMovie_id(), sum);
			}
			else {
				movies.put(r.getMovie_id(),r.getRating());
			}
		}
		
		for(int i=0;i<validRatings.size();i++) {
			Rating r = validRatings.get(i);
			if(!avg_movie.containsKey(r.getMovie_id())) {
				int sum = movies.get(r.getMovie_id());
				int count = movie_count.get(r.getMovie_id());
				int average = sum/count;
				avg_movie.put(r.getMovie_id(), (double)average);
			}
		}

		System.out.println("Inside avg rating" + avg_movie);
		HashMap<Integer,Double>temp = sortByValue(avg_movie); 
		List<Integer> final_movie_id = new ArrayList<>();
		int x=0;
		for(Integer key:temp.keySet()) {
			if(x<num_of_records) {
				final_movie_id.add(key);
			}
		}
		System.out.println("Inside sorted temp" + temp);
		System.out.println("Inside final_movie_id"+ final_movie_id);
		
		List<Movies> movie_obj = new ArrayList<>();

		for(Integer i : final_movie_id) {
		Optional<Movies> mov = movieRepo.findById(i);
		if(mov.isPresent()) {
			Movies mtemp = mov.get();
			mtemp.setRating( Float.parseFloat(avg_movie.get( i ).toString()) );
			movie_obj.add(mtemp);
		}
		
		}
		return movie_obj;
	}
	
	 public static HashMap<Integer, Double> sortByValue(HashMap<Integer, Double> hm){
		 List<Map.Entry<Integer, Double>> list = new LinkedList<Map.Entry<Integer,Double>>(hm.entrySet());
			
			Collections.sort(list, new Comparator<Map.Entry<Integer, Double>>(){
				public int compare(Map.Entry<Integer, Double> o1,
								   Map.Entry<Integer, Double> o2)
				{
					return (o2.getValue()).compareTo(o1.getValue());
				}
			});
			
			HashMap<Integer, Double> temp = new LinkedHashMap<Integer,Double>();
			for(Map.Entry<Integer,Double> m_id:list) {
				temp.put(m_id.getKey(),m_id.getValue());
			}
			return temp;
	 }

}