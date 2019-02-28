import React from "react";
import Ratings from "./ratings";

import { ajax, getYoutubeId} from '../helpers/helpers';
import Loader from '../components/loader';

import movies from "../helpers/dummy";
import PlayButton from "../components/elements/play";

import Flickity from "flickity";
import YouTube from 'react-youtube';

class Slider extends React.Component {

  state = {

    movies: [],
    players: {}

  }

  componentWillMount() {

  window.players = {};

  }

  componentDidMount() {
    var obj = this;

    ajax({}, function (response) {


      obj.setState({ movies: response.movies });

      var flkty = new Flickity('.main-carousel', {
        cellAlign: 'left', contain: true
      });

    }, "/v1/api/genre/featured", "get");

   

  }

   _onReady(id , event) {
      
     window.players[id] = event.target;

  }

  startTrailer = (key) => {

       if( typeof window.players[key] !=="undefined" ) {
          window.players[key].playVideo();
       }
      
  }

  stopTrailer = (key) => {

       if( typeof window.players[key] !=="undefined" ) {
          window.players[key].stopVideo();
       }
      
  }

  render() {


    if (typeof this.state.movies === "undefined" && this.state.movies.length === 0)
      return <Loader height="550px" />;

    var slides = [], cl = 'small-slide';


    Object.keys(this.state.movies).map(key => {

      cl = 'small-slide';

      if (parseInt(key) === 0 || parseInt(key) === 5)
        cl = 'big-slide';

      var genres = [];
      var m = this.state.movies[key];

      if (m.genres)
      Object.keys(m.genres).map(k => { genres.push(m.genres[k].name) });
      
      var videoFrame = "";
    if(getYoutubeId(m.trailer_link) != false) {
      videoFrame = (<div className="video-handler" ><YouTube
        videoId={getYoutubeId(m.trailer_link)}
        opts={{ 
            modestbranding: false , 
            playerVars: {
            controls: 0,
            disablekb: 1,
            showinfo : 0 
        },
        controls : false , showinfo : 0 
    }}
        onReady={this._onReady.bind(this,"slider-vid-"+key) }
      /></div>)
    }

      slides.push(<div key={"sll" + key} id={"sll"+key}  onMouseEnter={this.startTrailer.bind(this,"slider-vid-" + key)}  onMouseLeave={this.stopTrailer.bind(this,"slider-vid-" + key)}  className={cl} style={{ background: "url(" + m.cover + ") top left no-repeat / cover"  }}>
        <div className="caption-wrap clearfix">
          <img src={ m.thumbnail} alt="images" />

          <div className="text">
            <h2>{m.name}</h2>
            <h6 className="meta">{m.movie_rating} | {m.movie_length} | {genres.join(',')} | <span className="movie_label">{m.movie_type}</span> </h6>

            <Ratings movieId={typeof m.id !== "undefined" ? m.id : 0} />

            <div className="desc">{m.description}</div>
         

          </div>
        </div>
        {videoFrame}
           <PlayButton link={"/movie/"+m.slug} />
      </div>);

    });

    return (


      <div className="slider-area">

        <div className="main-carousel">

          <div className="carousel-cell">

            <div className="big-block clearfix">

              {slides[0]}

            </div>


            <div className="small-blocks-holder">

              {slides[1]}


              {slides[2]}

              {slides[3]}


              {slides[4]}



            </div>


          </div>


          <div className="carousel-cell">

            <div className="big-block clearfix">

              {slides[5]}

            </div>


            <div className="small-blocks-holder">

              {slides[6]}


              {slides[7]}
              {slides[8]}
              {slides[9]}


            </div>


          </div>

        </div>

      </div>

    );

  }

}

export default Slider;


