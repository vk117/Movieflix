import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import {ajax} from '../../helpers/helpers';


class MovieStats extends React.Component {
  
  state = {

    count : 0
  }

  componentWillMount() {

    this.makeRequest();

  }  

  makeRequest = () => {

    var obj = this;

    ajax({
      movieId: obj.props.match.params.slug ,
      duration : 30
    },function(response){

      obj.setState({ count : response });
        
    }, "/v1/api/movies/plays", "post");
  


  }

  render() {



    return (
                
               <DashboardLayout>

              
                <div className="row padding-50">
                   <div className="container">
                      <div className="col-12">
                       <div className="fr-widget">
                 <div className="title"><h3>Showing Stats for movie</h3></div>
                  <div className="fr-widget-body">
                        Total count is {this.state.count}
                  </div>
              </div>
              </div>
                    </div> 
                </div>

                      
               </DashboardLayout>    
  

    );


  }
}

export default MovieStats;

