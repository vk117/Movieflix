import React from "react";
import {ajax,rBridge} from '../../helpers/helpers';
import Loader from '../../components/loader';

import moment from 'moment';


class Success extends React.Component {
  
    state = {

        transaction : {},
        mlink : ""

    }

    componentDidMount() {
      var obj = this;

       ajax({},function(response){
          
          obj.setState({ transaction : response })

        },"/v1/api/subscription/"+this.props.match.params.id,"get");

        if (window.localStorage.getItem("mslug") ) {
           let mlink = (<a href={"/movie/" + window.localStorage.getItem("mslug")}>Access Movie</a>);
            this.setState({  mlink : mlink });
        }
    }   


  render() {
    
      if(typeof this.state.transaction.id=== "undefined")
        return <Loader height="550px" />;
    
   
     

    return (
       <div className="page">


          <div className="bookticket-banner-area"></div>
 
          <div className="page-content">

              <div className="container">
                  <div className="row home-row-1 padding-50">


                         <div className="col-12 col-lg-12">
           

                               <div className="cards-section">
                                  
                                   <div className="row">
                                        
                                    <div className="fr-widget">
                 
                                          <div className="title">
                                              <h3>Order Confirmed <strong> ID# {this.state.transaction.id}</strong></h3>
                                          </div>

                                          <div className="fr-widget-body">

                                            <p>Your order has been confirmed ! , {this.state.mlink}</p>    

                                          </div>   
                                    </div>

               
                                    </div>
                              </div>

                        </div>

                        


                  </div>
              </div>
          </div>
                    
       </div>   );

  }

  

}

export default rBridge(Success);

