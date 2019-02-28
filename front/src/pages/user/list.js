import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudList from '../../commons/crudList';

class UserList extends React.Component {
  
  	state = {

  		config : {   

	  	 	post_type : 'user',
	  	 	title : 'Users',
	  	 	index_route : '/v1/api/users',
	  	 	delete_route : '/v1/api/user/',
				  fields: ['id', 'name', 'status', 'email', 'phone', 'role', 'action','userHistory'],
	  	 	useid : true
	  	 	}

	  }



    componentDidMount() {
  	 
  	 let obj = this;

    }
  

	render() {
		

		return (<div>
			<DashboardLayout>
				
				<div className="padding-50 ">
					<CrudList config={this.state.config} params={this.props.match.params} />
				</div>

			</DashboardLayout>		 	
			</div>);

	}

	

}

export default UserList;

