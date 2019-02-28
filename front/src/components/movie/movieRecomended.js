import React from "react";
import movies from "../../helpers/dummy";
import MovieCard from './card';
import Flickity from "flickity";
import uuid from 'uuid';
import slug from 'slug';
import { rBridge, ajax } from '../../helpers/helpers';

class MovieRecommended extends React.Component {

      state = {
            id: uuid.v1(),
            moviesElements: [],
            loggedIn : false
      }

      componentWillMount() {

         

      }

      componentDidMount() {

           
            

      }

      componentWillReceiveProps(nextProps) {
            
            var obj = this;

        
            ajax({}, function (response) {

                  if (response)
                        obj.setState({ moviesElements: response, loggedIn: true });

                  var flkty = new Flickity('#mtl' + obj.state.id, {
                        cellAlign: 'left', contain: true, pageDots: false,
                        arrowShape: {
                              x0: 20,
                              x1: 65, y1: 45,
                              x2: 70, y2: 40,
                              x3: 30
                        }
                  });

            }, "v1/api/recommended/" + nextProps.userid, "get");

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

            console.log(this.state.loggedIn)

            if (this.state.loggedIn === false ) return null;


            return (

                  <div className="movie-row">
                        <div className="section-title">
                              <h2>Recommended for you</h2>
                        
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

export default rBridge(MovieRecommended);


