import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import {ajax,rBridge} from '../../helpers/helpers';
import Loader from '../../components/loader';



import moment from 'moment';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Payment from 'payment';

class PaymentElement extends React.Component {
  
    state = {
     
      bg: '',
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      issuer: '',
      focused: '',
      total : 0,
      duration : 0,
      type : "",
      movieid : false

    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
          this.setState({ issuer });
        }
      }

      handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
        });
      };

      handleInputChange = ({ target }) => {
        if (target.name === 'number') {
          this.setState({
            [target.name]: target.value.replace(/ /g, ''),
          });
        }
        else if (target.name === 'expiry') {
          this.setState({
            [target.name]: target.value.replace(/ |\//g, ''),
          });
        }
        else {
          this.setState({
            [target.name]: target.value,
          });
        }
      };


     

  initCards() {

       Payment.formatCardNumber(document.querySelector('[name="number"]'));
      Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
      Payment.formatCardCVC(document.querySelector('[name="cvc"]'));  

  }

   componentDidMount() {

     var params = this.props.location.search.split("?") , total = 0 ;
    var refined = {};
     for (let param of params[1].split("&")) {
    
          let temp = param.split("=");

       refined[temp[0]] = temp[1];
     }

     if (typeof refined["mslug"]!=="undefined") {
       window.localStorage.setItem("mslug", refined["mslug"]);
     }
  
     let movieid = false;

     if (typeof refined["type"]!=="undefined") {

       if (refined["type"] === "subscription") {
         total = 10;
       }

       if (refined["type"] === "pay") {
         total = refined["price"];
         movieid = refined["movieid"];
       }

       this.setState({ type: refined["type"], total: total, movieid: movieid });
     }
           

       

   }


    addMoney = (e) => {
      e.preventDefault();

     
      var obj = this;

      var transaction = {
        "quantity": 0,
        "subName": this.state.type,
        "userId": this.props.user.id,
        "cost": this.state.total
      }

      if(this.state.type==="pay") {
         transaction["quantity"] = this.state.movieid;
      }

      ajax(transaction,function(response){
          
        let user = {
           id : obj.props.user.id,
          subscriptionId : response.id,
          expiry : obj.state.expiry,
          credit_card_num: obj.state.number,
          status : "subscribed"
        }

        if (obj.state.type == "pay" ) {
          if (typeof response.id !== "undefined") {
                obj.props.history.push('/transaction/success/' + response.id);
                return;
              }
        } 
            
        ajax(user, function (r) {

          if (typeof r.id !== "undefined") {

            obj.props.history.push('/transaction/success/' + response.id);

          }


        }, "/v1/api/users/subscribe", "put");


      },"/v1/api/subscriptions","post");



    }

  updateDuration = (e) => {

    let duration = parseInt(e.target.value);

    this.setState({ total: 10 * duration , duration : duration});

  }
   


  render() {
    
    if(typeof this.props.booking.hall =="undefined" && typeof this.props.user.id =="undefined") {
           return <Loader height="550px" />;
      }

      console.log(this.state)
  
    const { name, number, expiry, cvc, focused, issuer } = this.state;

    let subs_field = "", subs_field1 = "";

    if(this.state.type === "subscription") {
      subs_field = (<li className="list-group-item">$10 per month</li>  );
      subs_field1 = (<li className="list-group-item">Select Months - <select onChange={this.updateDuration} id="duration">
        <option value="1">1 month</option>
        <option value="3">3 month</option>
        <option value="6">6 month</option>
        <option value="12">12 month</option>
      </select></li> );
    }

    return (
       <div className="page">


          <div className="payment-banner-area" style={{ backgroundImage:this.state.bg }} ></div>

        <div className="page-title">
          <h2>Checkout</h2>
          </div>
 

          <div className="page-content">

              <div className="container">
                  <div className="row home-row-1 padding-50">


                         <div className="col-12 col-lg-7">
           

                               <div className="cards-section">
                                  
                                   <div className="row">
                                        
                                    <div className="fr-widget">
                                          <div className="fr-widget-body">

                                             <form ref={ (f) => { this.form = f;} } onSubmit={this.addMoney} action="">


                                          <Cards
                                                number={number}
                                                name={name}
                                                expiry={expiry}
                                                cvc={cvc}
                                                focused={focused}
                                                callback={this.handleCallback}
                                              />


                                                                                 <div className="mt-4 form-group">
                                                  <input
                                                    type="tel"
                                                    name="number"
                                                    className="form-control"
                                                    placeholder="Card Number"
                                                    pattern="[\d| ]{16,22}"
                                                    required
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                  />
                                                  <small>E.g.: 49..., 51..., 36..., 37...</small>
                                                </div>
                                                <div className="form-group">
                                                  <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    required
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                  />
                                                </div>
                                                <div className="row">
                                                  <div className="col-6">
                                                    <input
                                                      type="tel"
                                                      name="expiry"
                                                      className="form-control"
                                                      placeholder="Valid Thru"
                                                      onChange={this.handleInputChange}
                                                      onFocus={this.handleInputFocus}
                                                    />
                                                  </div>
                                                  <div className="col-6">
                                                    <input
                                                      type="tel"
                                                      name="cvc"
                                                      className="form-control"
                                                      placeholder="CVC"
                                                      onChange={this.handleInputChange}
                                                      onFocus={this.handleInputFocus}
                                                    />
                                                  </div>
                                                </div>
                                                <input type="hidden" name="issuer" value={issuer} />


                                                 <div className="row mt-3">    
                                                <div className="col">    
                                                <button className='btn btn-primary'>Make Payment <i className="fas fa-angle-right"></i></button>
                                                </div>
                                                </div>
                                          </form>

                                          </div>   
                                    </div>

               
                                    </div>
                              </div>

                        </div>

                        <div className="col-12 col-lg-5">
           
                          
                <div className="fr-widget">
                  <div className="fr-widget-body">

                                <div className="card">
                                  <div className="card-header py-4">
                        <h4 className="heading h5 font-weight-500 mb-0">{this.state.type === "subscription" ? "Subscription" : "Order"  } details</h4>
                                  </div>
                                  <div className="list-group">
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item"><strong>Name</strong>: {this.props.user.name}</li>
                                    <li className="list-group-item"><strong>Email</strong>: {this.props.user.email}</li>
                                  <li className="list-group-item"><strong>Phone</strong>: {this.props.user.phone}</li>
                                     {subs_field}
                                     {subs_field1}

                                    <li className="list-group-item"><h4>Total : ${this.state.total}</h4></li>
                                     
                                    </ul>
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

export default rBridge(PaymentElement);

