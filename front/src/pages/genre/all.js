import React from "react";
import { rBridge, ajax } from '../../helpers/helpers';

import Moment from 'react-moment';
import MovieCard from '../../components/movie/card';
import Loader from '../../components/loader';

import movies from '../../helpers/dummy';
import genre from '../../helpers/genre';

class Genre extends React.Component {

  state = {

    movies: [],
    genre: [],
    max: 0,
    page: 1,
    genre_slug: '',
    searching: false,
    label: ''

  }


  componentDidMount() {

    var obj = this, filter = {};



     ajax({ perPage : 100 },function(response){

       console.log(response.content);
        obj.setState({ genre : response.content });

        if( typeof obj.props.match.params!=="undefined" && "slug" in obj.props.match.params ) {


            for(var i=0;i<response.content.length;i++) {

                if(response.content[i].slug == obj.props.match.params.slug) {
                   filter = { genre : response.content[i].id };
                   obj.setState({ genre_slug : response.content[i].slug });
                   break;
                }

            } 
        }


              obj.makeRequest({ filter });

     },"/v1/api/genres","get");

    
  }

  makeRequest = (params,path = "") => {

    let obj = this;

    if (this.state.genre_slug !== '') {
      if (typeof params.filter === "undefined")
        params['filter'] = {};

      params.filter['genre'] = this.state.genre_slug;
    }
  
    if (this.state.genre_slug === "" ) {

    
    ajax({ perPage : 10  },function(response){

        window.scrollTo(0,100);

      obj.setState({ movies: response.content, page: response.number, max: response.totalPages, searching:false });

    }, "/v1/api/movies" + path,"get");

    } else {

      ajax({}, function (response) {

        if (response.movies)
          obj.setState({ movies: response.movies });

      }, "/v1/api/genre/"+this.state.genre_slug, "get");

    }




  }


  paginate = (e) => {

    e.preventDefault();
    this.makeRequest({}, "/" + (parseInt(e.target.dataset.paginate) - 1) );

  }

  search = (e) => {

    e.preventDefault();

    var filter = { s: this.searchform.querySelector('.s').value };

    this.setState({ searching: true });
    this.clearButton.style.display = "block";
    this.makeRequest({ filter: filter });

  }

  resetPagination = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.searchform.reset(0);
    this.makeRequest({});
  }

  genre = () => {

    var g = [], cl = '', obj = this;

    if (typeof obj.props.match.params.slug === "undefined")
      cl = 'active';

    g.push(<li key='g-all' className={cl}><a href="/genre">All</a></li>);

    Object.keys(this.state.genre).map(s => {

      cl = '';

      if (typeof obj.props.match.params !== "undefined" && "slug" in obj.props.match.params && this.state.genre[s].slug === obj.props.match.params.slug) {

        cl = 'active';
      }

      g.push(<li className={cl} key={'g-' + this.state.genre[s].slug}><a href={'/genre/' + this.state.genre[s].slug}>{this.state.genre[s].name}</a></li>);

    });

    return g;
  }



  render() {
  

    if (typeof this.state.movies === "undefined" || this.state.movies.length === 0)
      return <Loader height="550px" />;

    var movies = [];

    Object.keys(this.state.movies).filter(key => {


      movies.push(<div key={'moviecard-' + key} className="col-lg-4">
        <MovieCard config={this.state.movies[key]} />
      </div>);

    });

    if (movies.length === 0) {
      movies = (<div class="emtpy-entity-set"> There no movies matching in this genre.</div>);
    }

    var pagination = [], cl = '';

    for (var i = 1; i <= this.state.max; i++) {

      cl = ' page-item ';

      if (this.state.page+1 == i)
        cl += ' active ';

      pagination.push(<li key={'p' + i} className={cl}><a onClick={this.paginate} className="page-link" data-paginate={i} href={i}>{i}</a></li>);

    }

    if (this.state.searching === true) {
      movies = <Loader height="300px" />;
    }

    return (

      <div className="home-page">

        <div className="bookticket-banner-area"></div>

        <div className="page-title">
          <h2> {this.state.label === "" ? "Showing All Movies" : "Movies under " + this.state.label}</h2>
        </div>

        <div className="page-content">

          <div className="container-fluid">
            <div className="row home-row-1 padding-75">


              <div className="col-12 col-lg-2">


                <div className="sidebar-wrap">
                  <div className="sidebar-title">
                    <h3>All Categories</h3>
                  </div>

                  <div className="sidebar-body">
                    <ul>
                      {this.genre()}
                    </ul>
                  </div>

                </div>

              </div>


              <div className="col-12 col-lg-10">


                <div className="cards-section genre-section">

                  <div className="row">

                    {movies}


                  </div>
                </div>

                <nav aria-label="Page navigation">
                  <ul className="pagination">

                    {pagination}

                  </ul>
                </nav>

              </div>


            </div>
          </div>
        </div>



      </div>

    );

  }

}

export default rBridge(Genre);

