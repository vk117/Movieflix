package com.cmpe275.movieflix.helpers;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

public class URLHelper {
	
	private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
	private static final Pattern WHITESPACE = Pattern.compile("[\\s]");
	  
	static public String slugify(String target,List<String> slugs) {
		
		boolean check = true;
		int maxout = 1;
		int counter = 1;
		
		// convert the given target to string
		String slug = toSlug(target);
		
		// check in existing slugs if slug exists, if found increment by 1
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
	
	public static String toSlug(String input) {
	    String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
	    String normalized = Normalizer.normalize(nowhitespace, Form.NFD);
	    String slug = NONLATIN.matcher(normalized).replaceAll("");
	    return slug.toLowerCase(Locale.ENGLISH);
	  }
	
	
}
