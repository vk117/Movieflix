import React from "react";
import { rBridge, ajax } from '../../helpers/helpers';

import Moment from 'react-moment';
import MovieCard from '../../components/movie/card';
import Loader from '../../components/loader';
import Slider from '../../components/slider';

import Select from 'react-select';


class Genre extends React.Component {

  state = {

    movies: [],
    genre: [],
    max: 0,
    page: 1,
    searching: false,
    select: {},
    options: {}

  }

  handleSelectChange = (name, value) => {


    var select = this.state.select;

    select[name] = value;

    this.setState({ select });
  }

  componentDidMount() {

    var obj = this;

    this.makeRequest({ perPage : 10 });

    ajax({ perPage : 100 }, function (response) {

      if (response) {

        
        var o = [];
        for (let genre of response.content) {
           console.log(genre)
          o.push({ label : genre.name , value : genre.id  });
        }
        var options = { "genres": o, "available_in": [
          { label: '720', value:'720'}, 
          { label: '1080P', value: '1080P'}, 
          { label: '1440', value: '1440'}, 
          { label: '2K', value: '2K'}, 
          {
            label: '4K', value: '4K' 
        }] };
        
        obj.setState({ genre: response.content, options: options });

      }

    }, "/v1/api/genres", "get");

  }


logActivity = (type = "view" , keyword = 0 ) => {

  let activity = {
    userId: this.props.user.id,
    movie_id: keyword,
    activity: type
  }

  ajax(activity, function (response) {

  }, "/v1/analytics", "post");


}
  makeRequest = (params, paginate = "") => {

    let obj = this;

    if (paginate !=="") {
      paginate = "/" + paginate;
    }

    ajax(params,function(response){
         window.scrollTo(0,100);
      obj.setState({ movies: response.content, page: response.number, max: response.totalPages , searching:false });

    },"/v1/api/movies"+paginate,"get");


  }


  paginate = (e) => {
    this.setState({ searching: true });
    e.preventDefault();
    this.makeRequest({}, parseInt(e.target.dataset.paginate) - 1 );

  }

  sortMovies = (e) => {

    e.preventDefault();
    this.makeRequest({ filter: { sort: e.target.value } });

  }

  search = (e) => {

    e.preventDefault();

    this.setState({ searching: true });

    var obj = this, filter = { str: this.searchform.querySelector('.s').value };

    this.logActivity("search:" + filter.str  );

    this.clearButton.style.display = "block";
    var genres = [];
    var available_in = [];

    console.log(this.state.select)

    if (this.state.select["genres"])
    for (let g of this.state.select["genres"]) {
        genres.push({ id : g.value })
    }

    if(genres.length > 0)
      filter["genres"] = genres;

    if (this.state.select["available_in"])
    for (let g of this.state.select["available_in"]) {
      available_in.push(g.value)
    }

    if (available_in.length > 0)
      filter["available_in"] = available_in.join(",");

    ajax(filter, function (response) {
      window.scrollTo(0, 100);
       
     obj.setState({ movies: response, page: 0, max: 0, searching: false });

    }, "v1/api/movies/search", "post");

  }

  resetPagination = (e) => {
    this.setState({ searching: true });
    e.preventDefault();
    e.stopPropagation();
    this.searchform.reset(0);
    this.makeRequest({} , 0 );
  }



  render() {

    if (typeof this.state.movies === "undefined" && this.state.movies.length === 0)
      return <Loader height="550" />;

    var movies = [];

    Object.keys(this.state.movies).map(key => {


      movies.push(<div className="col-lg-4">
        <MovieCard config={this.state.movies[key]} />
      </div>);

    });


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
          <h2>Movies</h2>

          <form className='search-form' ref={(f) => { this.searchform = f; }} onSubmit={this.search} action="">
            <div className="input-group">
              <input type="text" className="form-control s" placeholder="Search..." aria-label="Search by name or skills" aria-describedby="basic-addon2" />

              <Select
                className="select-selector"
                isMulti={true}
                onChange={this.handleSelectChange.bind(this, "genres")}
                options={this.state.options["genres"]}
                placeholder={"Select Genres"}
                simpleValue
                value={this.state.select["genres"]}
                name={"genres"}
              />

              <Select
                className="select-selector"
                isMulti={true}
                onChange={this.handleSelectChange.bind(this, "available_in")}
                options={this.state.options["available_in"]}
                placeholder={"Select available_in"}
                simpleValue
                value={this.state.select["available_in"]}
                name={"available_in"}
              />

              <button className="btn btn-primary" type="submit"><svg x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#ffffff"><path fill="#ffffff" d="M7,14c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7S10.86,14,7,14z M7,2C4.243,2,2,4.243,2,7s2.243,5,5,5 s5-2.243,5-5S9.757,2,7,2z"></path> <path data-color="color-2" fill="#ffffff" d="M15.707,14.293L13.314,11.9c-0.411,0.529-0.885,1.003-1.414,1.414l2.393,2.393 C14.488,15.902,14.744,16,15,16s0.512-0.098,0.707-0.293C16.098,15.316,16.098,14.684,15.707,14.293z"></path> </g></svg></button>

              <button className="filter-search"><svg height="32px" width="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title>search 2</title>
                <g fill="#ffffff" stroke="#ffffff" strokeLinecap="square" strokeWidth="2">
                  <line fill="none" stroke="#ffffff" x1="11" x2="2" y1="12" y2="12" />
                  <line fill="none" stroke="#ffffff" x1="11" x2="2" y1="20" y2="20" />
                  <line fill="none" stroke="#ffffff" x1="21" x2="2" y1="28" y2="28" />
                  <line fill="none" stroke="#ffffff" x1="21" x2="2" y1="4" y2="4" />
                  <circle cx="21" cy="16" fill="none" r="6" />
                  <line fill="none" x1="30" x2="25.243" y1="25" y2="20.243" />
                </g>
              </svg></button>

              <button ref={(b) => { this.clearButton = b; }} style={{ display: "none" }} className=" reset-results btn btn-sm btn-outline-secondary" onClick={this.resetPagination} >Clear Results</button>
            </div>
          </form>
        </div>

        <div className="page-content">


          <div className="container-fluid">
            <div className="row home-row-1">

              <div className="col-12 col-lg-12">

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

