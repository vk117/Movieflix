import React from "react";
import Ratings from "../ratings";
import {  getYoutubeId} from '../../helpers/helpers';

import PlayButton from "../elements/play";
import YouTube from 'react-youtube';

class MovieCard extends React.Component {

    state = {
        player : false
    }

    componentWillMount() {


    }

     _onReady(id , event) {
     
       this.setState({ player : event.target })

  }

  startTrailer = (key) => {
        let player = this.state.player;

        console.log(player); 
       if( player !==false ) {
          player.playVideo();
       }
      
  }

  stopTrailer = (key) => {
      let player = this.state.player;
       if( player !==false ) {
          player.stopVideo();
       }
      
  }

    render() {

        var m = this.props.config;

        var genre = [];

        if (m.genre)
        Object.keys(m.genre).map(k => { genre.push(m.genre[k].name) });

            var videoFrame = "";
    // if(getYoutubeId(m.trailer_link) != false) {
    //   videoFrame = (<div className="video-handler" ><YouTube
    //     videoId={getYoutubeId(m.trailer_link)}
    //     opts={{ 
    //         modestbranding: false , 
    //         playerVars: {
    //         controls: 0,
    //         disablekb: 1,
    //         showinfo : 0 
    //     },
    //     controls : false , showinfo : 0 
    // }}
    //     onReady={this._onReady.bind(this,"movie-card-"+m.id) }
    //   /></div>)
    // }


        return (<div id={m.slug} className="movie-card clearfix" onMouseEnter={this.startTrailer.bind(this,"slider-vid")}  onMouseLeave={this.stopTrailer.bind(this,"slider-vid" )}>

            
            <div className="movie-card-image">

                <img src={ m.thumbnail} alt="images" />

            </div>

            <div className="movie-card-description">


                <h2>{m.name}</h2>
                <h6 className="meta">{m.movie_rating} | {m.movie_length} | {genre.join(",")} | <span className="movie_label">{m.movie_type}</span> </h6>

                <Ratings movieId={typeof m.id !== "undefined" ? m.id : 0} />

                <div className="desc">{m.description.substring(0, 100)}...</div>

             

            </div>
             
                 {videoFrame}
           <PlayButton link={"/movie/"+m.slug} />

        </div>);

    }


}

export default MovieCard;

