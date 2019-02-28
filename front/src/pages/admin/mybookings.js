import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import {rBridge} from '../../helpers/helpers';
import MovieCard from '../../components/movie/card';
import Loader from '../../components/loader';
import CustomerWidget from './customer';

class CustomerDash extends React.Component {
  
  state = {  } 
   

  componentDidMount() {
    
      let obj = this;
      setTimeout(function(){

         if(obj.props.guest){

              obj.props.history.push('/notallowed');    
          }
    
      },3400);


  }

  
  
	render() {
    
    if(typeof this.props.user.id === "undefined" )
      return <Loader />;

   

		return (
                
               <DashboardLayout>

                          <div className="padding-75">

                              <CustomerWidget />

                          </div> 
                      
                  </DashboardLayout>    
  

		);

	}

}

export default rBridge(CustomerDash);

