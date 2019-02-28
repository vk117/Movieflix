import React from "react";
import {rBridge,ajax} from '../../helpers/helpers';

import moment from 'moment';
import Select from 'react-select';
import Loader from '../../components/loader';

class TopUsers extends React.Component {
  
  state = { 
    users:[],
        select: { duration: { value: '30', label: 'Last 30 days' } },
        options: {},
        searching: false
       } 
   

      handleSelectChange = (name, value) => {


            var select = this.state.select;

            console.log(value)

            select[name] = value;

            this.setState({ select, searching: true });
            this.getUsers( value.value );

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
              ]
        };

        this.setState({ options: options, searching: false });

    
        this.getUsers();

  }

  getUsers = (duration = 30) => {
      let obj = this;
        ajax({}, function (response) {

              obj.setState({ users: response, searching: false  })

        }, "/v1/api/users/plays/"+duration, "get");

  }
  
	render() {
    
            if (typeof this.state.users === "undefined" || this.state.users.length === 0 || this.state.searching === true)
                  return <Loader height="550px" />;

    var users = [];

    Object.keys(this.state.users).map(k => {
        var t = this.state.users[k];

         users.push(<tr>
                <td>#{t.id}</td>  
             <td>{t.name}</td>  
               <td>{t.screenName}</td>  
               <td>{t.status}</td>  
               <td>{t.address}</td>  
               <td>{moment(t.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
               </tr>  );

    });

    if(users.length === 0)
        users = (<div className="alert alert-info alert-dismissible fade show" role="alert">
    <span className="alert-inner--icon"><i className="fas fa-info"></i></span>
    <span className="alert-inner--text">Cannot find users !</span>
  </div>);

		return (
                

                        <div className="home-page">

                              <div className="bookticket-banner-area"></div>

                              <div className="page-title">
                              <h2>Top 10 users by Movie Plays  <a href="/dashboard" className="btn btn-secondary">Back</a> </h2>

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
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Screen Name</th>
                                    <th>Status</th>
                                    <th>Address</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            {users}
                        </table>
                       

                    </div>
                    </div>
                    </div>
                  
                </div>

        </div>
		);

	}

}

export default rBridge(TopUsers);

