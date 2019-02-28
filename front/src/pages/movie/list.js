import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudList from '../../commons/crudList';
import {rBridge} from '../../helpers/helpers';

class MovieList extends React.Component {
  
  	state = {

  		config : {   

	  	 	post_type : 'movie',
	  	 	title : 'Movies',
	  	 	index_route : '/v1/api/movies',
	  	 	delete_route : '/v1/api/movies/',
				  fields: ['thumbnail', 'id', 'name', 'rating', 'release_date','movie_type','action','movie_stats']
	  	 	
	  	 	}

	  }



    componentDidMount() {
  	 
  	 let obj = this;

    }
  

	render() {
		
		

		return (<div>
		<DashboardLayout push={this.props.history.push}>
				
				<div className="padding-50 ">
					<CrudList config={this.state.config} params={this.props.match.params} />
				</div>

			</DashboardLayout>		 	
			</div>);

	}

	

}

export default rBridge(MovieList);

