import React from "react";
import {rBridge,ajax} from '../../helpers/helpers';

import Select from 'react-select';
import Loader from '../../components/loader';
import moment from "moment";

class Dashboard extends React.Component {
  
  state = {  
    movies: [],
    select: { duration: { value: '30', label: 'Last 30 days' } },
    options: {},
    searching: false
    } 
   

  componentDidMount() {
    
      let obj = this;
      setTimeout(function(){

         if(obj.props.guest){

              obj.props.history.push('/notallowed');    
          }
    
      },3400);

    var options = {
      "duration": [
        { value: '1', label: 'Last 24 hours' },
        { value: '30', label: 'Last 30 days' },
        { value: '60', label: 'Last 60 days' },
        { value: '90', label: 'Last 90 days' }
      ]
    };

    this.setState({ options: options, searching: false });


    this.getMovies();

  }

  handleSelectChange = (name, value) => {


    var select = this.state.select;

    console.log(value)

    select[name] = value;

    this.setState({ select, searching: true });
    this.getMovies(value.value);

  }

  getMovies = (duration = 30) => {
    let obj = this;
    ajax({}, function (response) {

      obj.setState({ movies: response, searching: false })

    }, "/v1/analytics/between/" + duration, "get");

  }


  render() {

    if (typeof this.state.movies === "undefined" || this.state.movies.length === 0 || this.state.searching === true)
      return <Loader height="550px" />;

    var movies = [];

    Object.keys(this.state.movies).map(k => {
      var t = this.state.movies[k];

      movies.push(<tr>
        <td><img src={t.cover} className="avatar avatar-lg mr-3" /></td>
        <td>#{t.id}</td>
        <td>{t.name}</td>
        <td>{moment(t.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
      </tr>);

    });

    if (movies.length === 0)
      movies = (<div className="alert alert-info alert-dismissible fade show" role="alert">
        <span className="alert-inner--icon"><i className="fas fa-info"></i></span>
        <span className="alert-inner--text">Cannot find movies !</span>
      </div>);

    return (


      <div className="home-page">

        <div className="bookticket-banner-area"></div>

        <div className="page-title">
          <h2>Top 10 movies by Movie   </h2>

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
              <div className="col-12">



                <table className="table table-hover align-items-center">
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th>Movie ID</th>
                      <th>Name</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  {movies}
                </table>


              </div>
            </div>
          </div>

        </div>

      </div>
    );

  }


}

export default rBridge(Dashboard);

