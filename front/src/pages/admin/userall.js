import React from "react";
import { rBridge, ajax } from '../../helpers/helpers';

import moment from 'moment';
import Select from 'react-select';
import Loader from '../../components/loader';

class ActiveUsers extends React.Component {

      state = {
            users: []

      }




      componentDidMount() {

            let obj = this;
            setTimeout(function () {

                  if (obj.props.guest) {

                        obj.props.history.push('/notallowed');
                  }

            }, 3400);



            this.getUsers();

      }

      getUsers = () => {
            let obj = this;
            ajax({}, function (response) {

                  obj.setState({ users: response })

            }, "/v1/api/analytics/user_year", "get");

      }

      render() {

            if (typeof this.state.users === "undefined" || this.state.users.length === 0)
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
                        <td>{moment(t.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                  </tr>);

            });

            if (users.length === 0)
                  users = (<div className="alert alert-info alert-dismissible fade show" role="alert">
                        <span className="alert-inner--icon"><i className="fas fa-info"></i></span>
                        <span className="alert-inner--text">Cannot find users !</span>
                  </div>);

            return (


                  <div className="home-page">

                        <div className="bookticket-banner-area"></div>

                        <div className="page-title">
                              <h2>All Users for past 12 months <a href="/dashboard" className="btn btn-secondary">Back</a> </h2>

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

export default rBridge(ActiveUsers);

