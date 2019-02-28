import React from "react";
import {rBridge,ajax} from '../../helpers/helpers';

import moment from 'moment';

class MovieHistory extends React.Component {
  
  state = { 
    movies:[],
    max :0 , 
    page : 1,
       } 
   

  componentDidMount() {
    
      let obj = this;
      setTimeout(function(){

         if(obj.props.guest){

              obj.props.history.push('/notallowed');    
          }
    
      },3400);

      console.log(this.props.match.params)


       ajax({ },function(response){
            
             console.log(response)
             obj.setState({ movies : response })

       }, "/v1/api/user/" + this.props.match.params.slug +"/history","get");


  }

 
  
  
	render() {
    
    var movies = [];

    Object.keys(this.state.movies).map(k => {
        var t = this.state.movies[k];



         movies.push(<tr>
                <td>#{t.id}</td>  
             <td>{t.name}</td>  
             <td>{t.created_at }</td>
               </tr>  );

    });

    if(movies.length === 0)
        movies = (<div className="alert alert-info alert-dismissible fade show" role="alert">
    <span className="alert-inner--icon"><i className="fas fa-info"></i></span>
    <span className="alert-inner--text">User has not played a movie yet !</span>
  </div>);

		return (
                

                        <div className="home-page">

                              <div className="bookticket-banner-area"></div>

                              <div className="page-title">
                              <h2>Movie Play History  <a href="/dashboard" className="btn btn-secondary">Back</a> </h2>
                              </div>

                
                        <div className="page-content">

                              <div className="container-fluid">
                                    <div className="row home-row-1 padding-75">
                    <div className="col-12">


                        
                        <table className="table table-hover align-items-center">
                            <thead>
                                <tr>
                                    <th>Movie ID</th>
                                    <th>Name</th>
                                    <th>Played At</th>
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

export default rBridge(MovieHistory);

