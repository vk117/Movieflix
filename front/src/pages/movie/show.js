import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import { ajax, rBridge } from '../../helpers/helpers';
import Rating from '../../components/ratings';

import moment from 'moment';
import Moment from 'react-moment';
import Loader from '../../components/loader';
import {  getYoutubeId} from '../../helpers/helpers';
import { ToastContainer, toast } from 'react-toastify';
import PlayButton from '../../components/elements/play';

import YouTube from 'react-youtube';

class Movie extends React.Component {

	state = {

		movie: {},
		reviews: [],
		player : false,
		allowedRatings : false,
		userPayed : false,
		ratings:0

	}

	 _onReady(id , event) {
     
       this.setState({ player : event.target })

  }

  startMovie = (e) => {
	  e.preventDefault();
        let player = this.state.player;

	  window.localStorage.setItem("movie-" + this.state.movie.id,true)

	  this.setState({  allowedRatings : true });

	  this.logActivity("play");

       document.querySelector('.banner-area').classList.add("show-movie");
       if( player !==false ) {
          player.playVideo();
       }
      
  }

  stopMovie = (key) => {
      let player = this.state.player;
       if( player !==false ) {
          player.stopVideo();
       }
      
  }


	componentWillMount() {

		this.makeRequest();

	}

	makeRequest = () => {

		var obj = this;

		ajax({},function(response){

			ajax({}, function (response) {

				if(response.id)
					obj.setState({ userPayed : response  })

			}, "/v1/api/payed/" + response.id, "get");

	

			// register view activity
			


			let allowedRatings = false;
			
			if (window.localStorage.getItem("movie-" + response.id) != null  )
				allowedRatings = window.localStorage.getItem("movie-" + response.id);
			
			obj.setState({ movie: response, allowedRatings, reviews : JSON.parse(response.reviews)  });

			setTimeout(() => {
				obj.logActivity();
			}, 300);
		},"/v1/api/movie/"+obj.props.match.params.slug,"get");


	}

	logActivity = (type = "view") => {

		let activity = {
			userId: this.props.user.id,
			movie_id: this.state.movie.id,
			activity: type
		}

		ajax(activity, function (response) {

		}, "/v1/analytics", "post");


	}


	componentDidMount() {

		let obj = this;

	}


	updateForm = (e) => {
		e.preventDefault();

		var myreview = this.myReview.value;
		var reviews = [];
		var movie = { ...this.state.movie };
		var obj = this;

		obj.submitButton.innerHTML = 'Adding...';
		

		if (this.state.reviews && typeof this.state.reviews != "undefined")
			reviews = [...this.state.reviews];


		reviews.push({
			user: this.props.user.id,
			review: myreview+"[::]"+this.props.user.screenName,
			date: new Date()

		});

		movie.reviews = JSON.stringify(reviews);		

		ajax({ ...movie }, function (response) {

			toast.success("Review has been posted !", {
				position: toast.POSITION.TOP_CENTER
			});

			obj.submitButton.innerHTML = 'Add Review';
			obj.form.reset();
			obj.makeRequest();

		}, "/v1/api/movies/" + obj.state.movie.id, "put");

	}

	rateForm = (e) => {
		e.preventDefault();

		var myratings = parseInt(this.ratingsSelector.value);
		var obj = this;
		let movie = {...this.state.movie};

		ajax({
			rating : myratings,
			user_id : this.props.user.id,
			movie_id : this.state.movie.id
		 }, function (response) {

			toast.success("Rating has been added !", {
				position: toast.POSITION.TOP_CENTER
			});

			 movie.ratings = myratings;

			obj.setState({ movie: movie });

			}, "/v1/api/movie/rating" , "post");




	}

	reviewWidget = (movie) => {

		if (this.state.allowedRatings === false || this.props.guest === true)
			return null;

		let reviews = JSON.parse(movie.reviews);	



		if(reviews)
		for (var i = 0; i < reviews.length; i++) {

			if (typeof reviews[i].user !== "undefined" && reviews[i].user && reviews[i].user === this.props.user.id) {
				return (<div className="col-12 col-lg-12"><div class="alert alert-info alert-dismissible fade show" role="alert">
					<span class="alert-inner--text">You can write review only once !</span>
				</div></div>);
			}

		}

		

		return (<div className="fr-widget">

			<div className="title">
				<h3>Add Reviews</h3>
			</div>

			<div className="fr-widget-body">

				<form ref={(f) => { this.form = f; }} onSubmit={this.updateForm}>
					<div className="row">

						<div className="col mb-3">
							<label >Add Review here</label>
							<textarea ref={(f) => { this.myReview = f; }} className="form-control" name="review" id="" cols="30" rows="10"></textarea>
						</div>


					</div>

					<button ref={(f) => { this.submitButton = f; }} className="btn btn-primary">Add Review</button>

				</form>


			</div>
		</div>);
	}
	ratingsWidget = (movie) => {

		

		if (this.state.allowedRatings===false ||  this.props.guest === true)
			return null;

		if(movie.rating_count)
		for (var i = 0; i < movie.rating_count.length; i++) {

			if (movie.rating_count[i] === this.props.user.id) {
				return (<div className="col-12 col-lg-12"><div class="alert alert-info alert-dismissible fade show" role="alert">
					<span class="alert-inner--text">You can rate only once !</span>
				</div></div>);
			}

		}

		return (<div className="fr-widget mb-3">

			<div className="title">
				<h3>Add Ratings</h3>
			</div>

			<div className="fr-widget-body">

				<form onSubmit={this.rateForm}>
					<div className="row">

						<div className="col mb-3">
							<label >Set Ratings</label>
							<select ref={(f) => { this.ratingsSelector = f; }} name="rating" className="form-control">
								<option value="5">5</option>
								<option value="4">4</option>
								<option value="3">3</option>
								<option value="2">2</option>
								<option value="1">1</option>
							</select>

						</div>
					</div>

					<button className="btn btn-primary">Add Ratings</button>

				</form>

			</div>
		</div>);

	}



	render() {

		if (typeof this.state.movie.id === "undefined")
			return (<Loader height="60vh" />);

		var movie = this.state.movie;


		var genre = [];

		if(movie.genre)
		Object.keys(movie.genre).map(k => { genre.push(<a key={"mg" + k} className='movie-genre-link badge badge-lg badge-pill badge-primary text-uppercase mr-1' href={'/movie/' + movie.genre[k].slug}>{movie.genre[k].name}</a>) });

		var reviews = [];

		if (this.state.reviews)
		Object.keys(this.state.reviews).map(k => {

			var r = this.state.reviews[k];

			var avatar;

			if (typeof r.user !== "undefined" && r.user) {

				if (typeof r.user.avatar === "undefined") {
					avatar = <span className="">{r.user.name}</span>
				} else {
					avatar = <img alt="avatar" src={"/uploads/" + r.user.avatar} className="" />
				}

			}

			let rbody = r['review'].split("[::]");
			let screenName = "";
			

			if( rbody.length > 1) {
				
				screenName = "Review by "+rbody[1];
			}
			rbody = rbody[0];

			reviews.push(<li key={'review' + k}>
				<div className="description"> <span class="author-name">{screenName}</span>  {rbody}</div>
				<span className="date">{moment(r['date']).format("DD-MM-YYYY")}</span>
				<span className="avatar-wrap">{avatar}</span>
			</li>);

		});

		if (reviews.length === 0)
			reviews = (<li> There are no reviews yet ! </li>);


		 var videoFrame = "";
		if(getYoutubeId(movie.link) != false) {
			videoFrame = (<div className="video-handler" ><YouTube
			videoId={getYoutubeId(movie.link)}
			opts={{ 
				modestbranding: false , 
				playerVars: {
				controls: 1,
				disablekb: 1,
				showinfo : 0 
			},
			controls : false , showinfo : 0 
		}}
			onReady={this._onReady.bind(this,"slider-vid-") }
			/></div>)
		}

		var price_li = "";
		let price = this.state.movie.movie_price;
		var notice = "";
		var banner_area = (<div className="banner-area" style={{ "backgroundImage": "url(" + movie.cover + ")" }}>


			<a className="video-play-button" href={movie.link} onClick={this.startMovie} >
				<svg height="48px" width="48px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
					<title>button play</title>
					<g>
						<path d="M12,43c-0.15234,0-0.30566-0.03516-0.44727-0.10547C11.21387,42.72461,11,42.37891,11,42V6 c0-0.37891,0.21387-0.72461,0.55273-0.89453c0.33789-0.16895,0.74414-0.13379,1.04688,0.09473l24,18 C36.85156,23.38867,37,23.68555,37,24s-0.14844,0.61133-0.40039,0.7998l-24,18C12.42383,42.93262,12.21191,43,12,43z" fill="#ffffff" />
					</g>
				</svg>
			</a>


			{videoFrame}


			<div className="banner-area-info">

			</div>

		</div>);

		let user_status = this.props.guest === true ? 'guest' : 'logged_in' ;
		let obj = this;

		switch(user_status) {

			case "guest": 
			price_li = ""; 
			banner_area = "";
			notice = (<h2 className="movie-notice">Please login to view the movie ! <a href="/login">Login</a> </h2>);
		 	break;
			case "logged_in" : 

				let role = this.props.user.role;

				// role = "customer";
				// obj.props.user.status = "verified";
				// obj.state.movie.movie_type = "pay";
				// obj.state.userPayed  = true;

				console.log(obj.state.userPayed, obj.props.user.status, obj.state.movie.movie_type)

				if (role === "admin") {
					price_li = "";
				} else {
					
					switch (obj.props.user.status) {
						
						case "block": 
							price_li = "";
							banner_area = "";
							notice = (<h2 className="movie-notice">You have been blocked by admin ! </h2>);
						break;
						case "unverified":
							price_li = "";

							if (obj.state.movie.movie_type !="free" )
							banner_area = "";
							notice = (<h2 className="movie-notice">Please buy or subscribe to access ! </h2>);
						break;

						// verfied users can buy
						case "cancelled": 
						case "verified":
							price_li = (<li className="list-group-item"><strong>Price</strong> : ${price}  <a href={"/transaction/payment?type=pay&movieid=" + this.state.movie.id + "&price=" + price+"&mslug="+this.state.movie.slug} className='btn btn-primary btn-sm'>Buy Now</a></li>);

							if (obj.state.userPayed === false && obj.state.movie.movie_type != "free") {
								notice = (<h2 className="movie-notice">Please buy or subscribe to access ! </h2>);
								banner_area = "";
							} else {
								price_li = "";
							}
						break;

						// subscribed users get 50% off
						case "subscribed": 
							price_li = (<li className="list-group-item"><strong>Price 50% off</strong> : <del>${price}</del> ${Math.round(price / 2)}  <a href={"/transaction/payment?type=pay&movieid=" + this.state.movie.id + "&price=" + (Math.round(price / 2) + "&mslug=" + this.state.movie.slug)} className='btn btn-primary btn-sm'>Buy Now</a> </li>);

							if (obj.state.movie.movie_type === "subscription")
							    price_li = "";

						break;

					

					}

					switch (this.state.movie.movie_type) {
						
						case "pay":

							if (obj.state.userPayed === false ) {
								notice = (<h2 className="movie-notice">Please buy the movie to view it ! </h2>);
								banner_area = "";
							}
								else {
									price_li = "";
								}

						break;

						case "subscription" :

							if (obj.props.user.status != "unverified" && obj.state.userPayed === false  )
							price_li = (<li className="list-group-item"><strong>Pay once</strong> : ${price}  <a href={"/transaction/payment?type=pay&movieid=" + this.state.movie.id + "&price=" + price} className='btn btn-primary btn-sm'>Buy Now</a></li>);

						break;

						case "free" : notice = ""; price_li =""; break;					
					}

				}


			break;


		}


		return (
			<div className="page">
				{notice}
				{banner_area}

				<div className="page-content">

					<div className="container">
						<div className="row home-row-1 padding-75">

							<div className="col-12 col-lg-4">
						
								<div className="movie-poster">
									<img src={movie.thumbnail} alt="" />
								</div>

								<div className="card mt-4">
									<div className="card-header py-4">
										<h4 className="heading h5 font-weight-500 mb-2">{movie.name} Information</h4>
									</div>

									<div className="list-group">
										<ul className="list-group list-group-flush">
											{price_li}
											<li className="list-group-item"><strong>Ratings</strong> : <Rating movieId={ typeof this.state.movie.id !== "undefined" ? this.state.movie.id : 0 } /> </li>
											<li className="list-group-item"><strong>Genre</strong> : {genre} </li>
											<li className="list-group-item"><strong>Trailer</strong> : <a target="_BLANK" href={movie.trailer_link}>{movie.trailer_link}</a></li>
											<li className="list-group-item"><strong>Release Date</strong> : <Moment format="MM/DD/YYYY">{movie.release_date}</Moment></li>
											<li className="list-group-item"><strong>Movie Length</strong> : {movie.movie_length}</li>
											<li className="list-group-item"><strong>Available in</strong> : {movie.available_in}</li>
											<li className="list-group-item"><strong>Rated</strong> : {movie.movie_rating}</li>
											<li className="list-group-item"><strong>Cast</strong> : {movie.movie_characters}</li>
											<li className="list-group-item"><strong>Country</strong> : {movie.country ? movie.country : "NA" }</li>

										</ul>
									</div>
								</div>

							</div>


							<div className="col-12 col-lg-8">

										<div className="single-page-title">
							<h3>{movie.name}</h3>
						</div>
									<div className="single-desc">{movie.description}</div>

								<div className="cards-section">

										<div className="fr-widget mb-3">

											<div className="title">
												<h3>Reviews</h3>
											</div>

											<div className="fr-widget-body no-spacing">

												<ul className='comment-list'>{reviews}</ul>

											</div>
										</div>

										{this.ratingsWidget(movie)}
										{this.reviewWidget(movie)}


								</div>

							</div>


						</div>
					</div>
				</div>



			</div>);

	}



}

export default rBridge(Movie);

