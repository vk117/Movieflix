import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import MovieCard from '../../components/movie/card';
import CrudForm from '../../commons/crudForm';

var cast = require('../../helpers/cast');

class MovieCreate extends React.Component {
  
  state = {

  	/*
  	
  thumbnail: String,
  cover: String,
  photos: String,
  
  	 */

  	 config : {   

  	 	post_type : 'movie',
  	 	title : 'Movie',
  	 	create_route : '/v1/api/movies',
  	 	get_route : '/v1/api/movie/',
  	 	edit_route : '/v1/api/movies/',
  	 	entity_route : '/v1/api/genres/',
		sidebar_title : 'Manage Media',
		   
  	 	form_elements: {

  	 		'main' : [

  	 			{ "label" : "Movie Title" , "name" : "name" , "type" : "text" , required : true  },	
						  { "label": "Movie Release Date", "name": "release_date", "type": "date", required: true }, 
          { "label" : "Movie Trailer Link" , "name" : "trailer_link" , "type" : "text" }, 
						  { "label": "Movie Link", "name": "link", "type": "text", required: true  }, 
	    { "label" : "Initial Movie Rating" , "name" : "rating" , "type" : "select", "selectlabel" : "Select a rating" , "options" : { "1" : "1","2" : "2","3" : "3","4" : "4","5" : "5" } },  
	    
	    { "label": "Movie Visibility", "name": "movie_type", "type": "select", "selectlabel": "Select a model", "options": { "subscription": "Subscription" , "pay" :"Pay per view", "free" : "Free"  } },  
		{ "label": "Movie Price", "name": "movie_price" , "type" : "text" }, 
						  { "label": "Country", "name": "country", "type": "text", required: true  }, 
	    
          { "label" : "Movie Length(Hours:Minutes)" , "name" : "movie_length" , "type" : "text" },  
          { "label" : "Movie Available" , "name" : "available_in" , "type" : "select2" , "options" : { '720' : '720' , '1080P' : '1080P' , '1440' : '1440' , '2K': '2K'  , '4K' : '4K' } }, 
          { "label" : "Movie Cast" , "name" : "movie_characters" , "type" : "select2" , "options" : cast.default[0] }, 
						  { "label": "Genre", "name": "genres" , "type" : "entity" , "entity" : "Genre" },
          { "label" : "Movie Rating" , "name" : "movie_rating" , "type" : "select" , "options" : { 'G' : 'G' , 'PG' : 'PG' , 'PG-13' : 'PG-13' , 'R': 'R'  , 'NC-17' : 'NC-17' } },

  	 		],

  	 		'sidebar':[

						  { "label": "Movie Thumbnail", "name": "thumbnail", "type": "upload", "accept": ".jpg,.png", required: true },	
						  { "label": "Movie Cover", "name": "cover", "type": "upload", "accept": ".jpg,.png", required: true },	
  	 		]

  	 	}

  	 }

  }

  componentWillMount() {

  }

	render() {

		return (
                
               <DashboardLayout>

						<CrudForm config={this.state.config} history={this.props.history} params={this.props.match.params} />	
                      
               </DashboardLayout>    
  

		);


	}
}

export default MovieCreate;

