import React from "react";
import { rBridge, ajax } from '../../helpers/helpers';

import Moment from 'react-moment';
import MovieCard from '../../components/movie/card';
import Loader from '../../components/loader';

import movies from '../../helpers/dummy';

class Subscription extends React.Component {

      state = {



      }

      componentDidMount() {



      }


      render() {

            if (this.props.user.status === "unverified") {
                  return (<div>Please verify your email !</div>);
            }

            return (

                

                  <div className="home-page">

                        <div className="bookticket-banner-area"></div>

                        <div className="page-title">
                              <h2>Select Plan</h2>


                        </div>

                        <div className="page-content">

                              <div className="container">
                                    <div className="row home-row-1">

                                          <div className="col-12 col-lg-12">

                                                <div className="cards-section genre-section">

                                                      <div className="row">

                                                            <div className="col-12">
                                                                  <div className="pricing-table-wrap clearfix">
                                                                        <ul className="pricing-table">
                                                                              <li className="price">$ 10</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li className="sign-up">
                                                                                    <a href="/transaction/payment?type=subscription">Subscription</a>
                                                                              </li>
                                                                        </ul>

                                                                        <ul className="pricing-table">
                                                                              <li className="price">$ 10</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li className="sign-up">
                                                                                    <a href="/transaction/payment?type=subscription">Subscription</a>
                                                                              </li>
                                                                        </ul>

                                                                        <ul className="pricing-table">
                                                                              <li className="price">$ 10</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li>Unlimited Movies</li>
                                                                              <li className="sign-up">
                                                                                    <a href="/transaction/payment?type=subscription">Subscription</a>
                                                                              </li>
                                                                        </ul>

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

export default rBridge(Subscription);

