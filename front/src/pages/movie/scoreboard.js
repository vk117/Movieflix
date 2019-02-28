import React from "react";
import { rBridge, ajax } from '../../helpers/helpers';
import MovieCard from '../../components/movie/card';
import Loader from '../../components/loader';
import Select from 'react-select';

class Scoreboard extends React.Component {

  state = {

    top_rated: [],
    popular_movies : [],
    select: { duration: { value: '30', label: 'Last 30 days' }  },
    options: {  },
    searching: false
   

  }


  handleSelectChange = (name, value) => {

    var select = this.state.select;

    select[name] = value;

    this.setState({ select, searching: true });
    this.getMovies( value.value );

  }



  componentDidMount() {

    this.getMovies();

    var options = {
       "duration": [
        { value: '1', label: 'Last 24 hours' },
        { value: '30', label: 'Last 30 days' },
         { value: '60', label: 'Last 60 days' },
         { value: '90', label: 'Last 90 days' }
     ]
    };

    this.setState({ options: options, searching : false });

  }


  getMovies = (duration= "30") => {

    var obj = this;

    ajax({}, function (response) {

      obj.setState({ top_rated: response, searching: false });

      ajax({}, function (r) {

        obj.setState({ popular_movies: r })

      }, "/v1/analytics/between/" + duration, "get");


    }, "/v1/api/movie/rating/toprated/"+duration, "get");

    

  }



  render() {

    if (typeof this.state.top_rated === "undefined" || this.state.top_rated.length === 0 || this.state.searching === true )
      return <Loader height="550px" />;

    var movies = [];
    var popular_movies = [];

    Object.keys(this.state.top_rated).map(key => {

      movies.push(<div key={'moviecard-' + key} className="col-lg-4">
        <MovieCard config={this.state.top_rated[key]} />
      </div>);

    });

    Object.keys(this.state.popular_movies).map(key => {

      popular_movies.push(<div key={'moviecard-' + key} className="col-lg-4">
        <MovieCard config={this.state.popular_movies[key]} />
      </div>);

    });

    if (movies.length === 0) {
      movies = (<div className="emtpy-entity-set"> There no movies matching in this genre.</div>);
    }

    if (popular_movies.length === 0) {
      popular_movies = (<div className="emtpy-entity-set"> There no movies matching in this genre.</div>);
    }


    return (

      <div className="home-page">

        <div className="bookticket-banner-area"></div>

        <div className="page-title">
          <h2>Scoreboard</h2>

          <form className='search-form' ref={(f) => { this.searchform = f; }} onSubmit={this.search} action="">
            <div className="input-group">
              <Select
                className="select-selector"
                isMulti={false}
                onChange={this.handleSelectChange.bind(this, "duration")}
                options={this.state.options["duration"]}
                placeholder={"Select duration"}
                simpleValue
                value={this.state.select["duration"]}
                name={"duration"}
              />
            </div>
          </form>
        </div>

        <div className="page-content">

          <div className="container-fluid">
            <div className="row home-row-1 padding-75">

              <div className="col-12 col-lg-12">


                <div className="cards-section genre-section">

                  <div className="row">
                      <div className="col-12">
                      <div className="section-title">
                        <h2>Top Rated Movies</h2>
                      </div>
                      </div>
                    {movies}


                  </div>
                  <div className="row">
                      <div className="col-12">
                      <div className="section-title">
                        <h2>Popular movies by plays</h2>
                      </div>
                      </div>
                    {popular_movies}


                  </div>
                </div>

        

              </div>


            </div>
          </div>
        </div>



      </div>

    );

  }

}

export default rBridge(Scoreboard);

