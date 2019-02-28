import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudForm from '../../commons/crudForm';

class UserCreate extends React.Component {
  
  state = {

  config : {   

      post_type : 'genre',
      title : 'Genre',
      create_route : '/v1/api/genres',
      get_route : '/v1/api/genre/',
      edit_route : '/v1/api/genres/',
      sidebar_title : '',
      form_elements: {

        'main' : [

          { "label" : "Name" , "name" : "name" , "type" : "text" , required : true }, 

        ],

        'sidebar':[]

      }

     } 

  }

  componentWillMount() {

  }

	render() {

		return (
                
               <DashboardLayout>

						<CrudForm config={this.state.config} history={this.props.history} params={this.props.match.params} />	
                      
               </DashboardLayout>    
  

		);


	}
}

export default UserCreate;

