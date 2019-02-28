package com.cmpe275.movieflix.movieflix;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.cmpe275.movieflix.movieflix.model.Genre;
import com.cmpe275.movieflix.movieflix.model.Movies;
import com.github.slugify.Slugify;

public class Slug {

	public Slug() {
		// TODO Auto-generated constructor stub
	}
	
	public static String preProcessingMovie(Movies m, List<Movies> ms) {
		List<Movies> list = new ArrayList<Movies>(ms);
		List<String> slugs = new ArrayList<String>();
		for(Movies te : list) {
			slugs.add(te.getSlug());
		}
		try {
			Slugify slg = new Slugify();
			String slug = slg.slugify(m.getName());	
			return checkSlug(slug, slugs);
		}
		catch(IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String preProcessingGenre(Genre g, List<Genre> gs) {
		List<Genre> list = new ArrayList<Genre>(gs);
		List<String> slugs = new ArrayList<String>();
		for(Genre te : list) {
			slugs.add(te.getSlug());
		}
		try {
			Slugify slg = new Slugify();
			String slug = slg.slugify(g.getName());	
			return checkSlug(slug, slugs);
		}
		catch(IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String checkSlug(String slug, List<String> slugs) {
		boolean check = true;
		int maxout = 1;
		int counter = 1;
		
		if(!slugs.contains(slug))
			return slug;
		else {
			while(check && maxout < 50) {
				StringBuilder str = new StringBuilder(slug);
				
				if(slugs.contains(str.append("-").append(counter).toString())) {
					counter++;
				}
				else {
					check = false;
				}
				maxout++;
			}
			return slug + "-" + counter;
		}
	}

}
