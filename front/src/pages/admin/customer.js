import React from "react";
import {rBridge,ajax} from '../../helpers/helpers';

import moment from 'moment';

class CustomWidge extends React.Component {
  
  state = { 
    transactions:[],
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


       ajax({ },function(response){
          
          obj.setState({ transactions : response })

       },"/v1/api/subscriptions/users/"+this.props.user.id,"get");


  }

    cancelSubscription = (e) => {
        e.preventDefault();
       
        ajax({ id: this.props.user.id }, function (response) {

           alert("Your subscription has been cancelled !");

        }, "/v1/api/users/cancel", "put");

    }

  
  
	render() {
    
    var transactions = [];
    var trialEnds = "";
        var notice = "";
        var testFlag = false;
    

    Object.keys(this.state.transactions).map(k => {
        var t = this.state.transactions[k];

        console.log(t, this.props.user.subscriptionId, this.props.user )

        if (t.subName === "subscription" && testFlag === false)  {
            testFlag = true;
            trialEnds = (<div className="fr-widget"> <div className="title"><h3>Trial Ends on</h3> </div><div className="fr-widget-body">{moment(t.trailEndAt).format("dddd, MMMM Do YYYY")}</div> </div> );
        }

         transactions.push(<tr>
                <td>#{t.id}</td>  
             <td>{t.subName}</td>  
             <td>{t.cost}</td>  
             <td>{moment(t.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
               </tr>  );

    });

    if(transactions.length === 0) {
        notice = (<h2 className="movie-notice">There are no active subscription ! </h2>);
        transactions = "";

    }

		return (
                
        <div>
                
                <div className="row">
                    <div className="col-8">


                        <h2>Order History</h2>
                        {notice}
                        <table className="table table-hover align-items-center">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Type</th>
                                    <th>Cost</th>
                                    <th>Placed At</th>
                                </tr>
                            </thead>
                            {transactions}
                        </table>
                        <br />
                        <h2>Cancel Subscription</h2>

                        <a onClick={this.cancelSubscription} className="btn btn-danger btn-large">Cancel Subscription</a>

                    </div>
                    <div className="col-4">
                        {trialEnds}
                    </div>
                </div>

        </div>
		);

	}

}

export default rBridge(CustomWidge);

