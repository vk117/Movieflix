import React from "react";
import {rBridge,ajax} from '../../helpers/helpers';

import moment from 'moment';
import Select from 'react-select';
import Loader from '../../components/loader';

class Finance extends React.Component {
  
  state = { 
       orders:[],
        select: {},
        options: {},
        searching: false
       } 
   

      handleSelectChange = (name, value) => {


            var select = this.state.select;

            console.log(value)

            select[name] = value;

            console.log(select)
            
            let type ="total";
            let duration = 30;

            if (typeof select.type !== "undefined" )
                  type = select.type.value;

            if (typeof select.duration !== "undefined")
                  duration = select.duration.value;

            this.setState({ select, searching: true });
            this.getFinance(duration ,type );

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
              ],
              "type" : [
                    { value: 'subscription', label: 'Subscription Only' },
                    { value: 'pay', label: 'PayPerView Only' },
                    { value: 'all', label: 'All Order' },
              ]
        };

        this.setState({ options: options, searching: false });

    
        this.getFinance();

  }

  getFinance = (duration = 30 , type =  "total" ) => {
      let obj = this;
        ajax({ duration: parseInt(duration) , type : type }, function (response) {

              obj.setState({ orders: response, searching: false  })

        }, "/v1/api/finance/subscription", "post");

  }
  
	render() {
    
            if (typeof this.state.orders === "undefined" || this.state.orders.length === 0 || this.state.searching === true)
                  return <Loader height="550px" />;

    var orders = [];

    Object.keys(this.state.orders).map(k => {
        var t = this.state.orders[k];

         orders.push(<tr>
              
                <td>#{t.id}</td>  
                <td>#{t.cost}</td>  
               <td>{t.userId}</td>  
               <td>{t.subName}</td>  
               <td>{moment(t.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a") }</td>
               </tr>  );

    });

    if(orders.length === 0)
        orders = (<div className="alert alert-info alert-dismissible fade show" role="alert">
    <span className="alert-inner--icon"><i className="fas fa-info"></i></span>
    <span className="alert-inner--text">Cannot find orders !</span>
  </div>);

		return (
                

                        <div className="home-page">

                              <div className="bookticket-banner-area"></div>

                              <div className="page-title">
                              <h2>Finance  <a href="/dashboard" className="btn btn-secondary">Back</a> </h2>

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

                                          <Select
                                                className="select-selector"
                                                isMulti={false}
                                                onChange={this.handleSelectChange.bind(this, "type")}
                                                options={this.state.options["type"]}
                                                placeholder={"Select type"}
                                                simpleValue
                                                value={this.state.select["type"]}
                                                name={"type"}
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
                                    <th>ORDER / SUBSCRIPTION ID</th>
                                    <th>Cost</th>
                                    <th>User ID</th>
                                    <th>Type</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            {orders}
                        </table>
                       

                    </div>
                    </div>
                    </div>
                  
                </div>

        </div>
		);

	}

}

export default rBridge(Finance);

