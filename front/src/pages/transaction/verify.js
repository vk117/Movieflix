import React from "react";
import { rBridge, ajax } from '../../helpers/helpers';

import Moment from 'react-moment';
import Loader from '../../components/loader';
import { ToastContainer, toast } from 'react-toastify';

class Verify extends React.Component {

      state = {

            verifying : "Verifying..."

      }

      componentDidMount() {

            var params = this.props.location.search.split("?"), total = 0;
            var refined = {};
            var obj = this;
            for (let param of params[1].split("&")) {

                  let temp = param.split("=");

                  refined[temp[0]] = temp[1];
            }

            ajax({}, function (r) {

                  if (typeof r.id !== "undefined") {
                        toast.success("Your account has been verified successfully ! .. redirecting to login page", {
                              position: toast.POSITION.TOP_CENTER
                        });


                       setTimeout(() => {
                             obj.props.history.push('/login');
                       }, 2000);

                  }


            }, "/v1/api/verify/"+refined["user"], "get");
           

      }


      render() {



            return (

                  <div className="home-page">

                        <div className="bookticket-banner-area"></div>

                       

                        <div className="page-content">

                              <div className="container">
                                    <div className="row home-row-1">

                                          <div className="col-12 col-lg-12">

                                                <div className="cards-section genre-section">

                                                      <div className="row">

                                                            <div className="col-12">
                                                                  <div className="pricing-table-wrap clearfix">
                                                                      {this.state.verifying}
                                                                  </div>

                                                            </div>


                                                      </div>
                                                </div>


                                          </div>


                                    </div>
                              </div>
                        </div>



                  </div>

            );

      }

}

export default rBridge(Verify);

