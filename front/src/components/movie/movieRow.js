import React from "react";
import movies from "../../helpers/dummy";
import MovieCard from './card';
import Flickity from "flickity";
import uuid from 'uuid';
import slug from 'slug';
import { rBridge, ajax } from '../../helpers/helpers';

class MovieRow extends React.Component {

      state = {
            id: uuid.v1(),
            moviesElements: []
      }

      componentWillMount() {

            var obj = this;

            ajax({ perPage: 8 }, function (response) {

                  if(response.movies)
                  obj.setState({ moviesElements: response.movies });

                  var flkty = new Flickity('#mtl' + obj.state.id, {
                        cellAlign: 'left', contain: true, pageDots: false,
                        arrowShape: {
                              x0: 20,
                              x1: 65, y1: 45,
                              x2: 70, y2: 40,
                              x3: 30
                        }
                  });

            }, "/v1/api/genre/"+this.props.slug, "get");

      }

      componentDidMount() {



            

      }

      render() {



            // if (typeof this.state.movies === "undefined" && this.state.movies.length === 0)
            //       return <Loader height="550" />;

            var moviesElements = [];

            Object.keys(this.state.moviesElements).map(key => {


                  moviesElements.push(<div key={key} className="carousel-cell movie-card-wrap">
                        <MovieCard config={this.state.moviesElements[key]} />
                  </div>);

            });



            return (

                  <div className="movie-row">
                        <div className="section-title">
                              <h2>{this.props.title}</h2>
                        
                        </div>

                        <div className="cards-section">
                              <div className="row">
                                    <div id={"mtl" + this.state.id} className="row-main-carousel">
                                          {moviesElements}
                                    </div>
                              </div>
                        </div>
                  </div>

            );

      }

}

export default MovieRow;


